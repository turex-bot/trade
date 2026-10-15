package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

// Fix Issue #5: Rate limiting middleware to prevent brute force attacks

type visitor struct {
	lastVisit time.Time
	count     int
}

type rateLimiter struct {
	visitors map[string]*visitor
	mu       sync.Mutex
	limit    int
	window   time.Duration
}

func newRateLimiter(limit int, window time.Duration) *rateLimiter {
	rl := &rateLimiter{
		visitors: make(map[string]*visitor),
		limit:    limit,
		window:   window,
	}

	// Cleanup old visitors every minute
	go func() {
		for {
			time.Sleep(time.Minute)
			rl.cleanup()
		}
	}()

	return rl
}

func (rl *rateLimiter) cleanup() {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	for ip, v := range rl.visitors {
		if time.Since(v.lastVisit) > rl.window {
			delete(rl.visitors, ip)
		}
	}
}

func (rl *rateLimiter) allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	v, exists := rl.visitors[ip]
	if !exists {
		rl.visitors[ip] = &visitor{
			lastVisit: time.Now(),
			count:     1,
		}
		return true
	}

	if time.Since(v.lastVisit) > rl.window {
		v.count = 1
		v.lastVisit = time.Now()
		return true
	}

	if v.count >= rl.limit {
		return false
	}

	v.count++
	v.lastVisit = time.Now()
	return true
}

// RateLimitMiddleware creates a rate limiter
// Example: RateLimitMiddleware(100, time.Minute) = 100 requests per minute
func RateLimitMiddleware(limit int, window time.Duration) gin.HandlerFunc {
	limiter := newRateLimiter(limit, window)

	return func(c *gin.Context) {
		ip := c.ClientIP()

		if !limiter.allow(ip) {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "Rate limit exceeded. Please try again later.",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}

// StrictRateLimitMiddleware for sensitive endpoints like login
// 5 requests per minute
func StrictRateLimitMiddleware() gin.HandlerFunc {
	return RateLimitMiddleware(5, time.Minute)
}

// NormalRateLimitMiddleware for regular endpoints
// 100 requests per minute
func NormalRateLimitMiddleware() gin.HandlerFunc {
	return RateLimitMiddleware(100, time.Minute)
}
