package services

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"timberflow-api/internal/dtos"
	"timberflow-api/internal/models"
	"timberflow-api/internal/repositories"
)

type AuthService interface {
	Login(req dtos.LoginRequest) (*dtos.LoginResponse, error)
	Register(req dtos.RegisterRequest) (*dtos.UserResponse, error)
}

type authService struct {
	repo      repositories.UserRepository
	jwtSecret string
}

func NewAuthService(repo repositories.UserRepository, jwtSecret string) AuthService {
	return &authService{repo: repo, jwtSecret: jwtSecret}
}

func (s *authService) Login(req dtos.LoginRequest) (*dtos.LoginResponse, error) {
	user, err := s.repo.FindByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	if !user.IsActive {
		return nil, errors.New("account is inactive")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, errors.New("invalid email or password")
	}

	expiresAt := time.Now().Add(24 * time.Hour)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"role":    user.Role,
		"exp":     expiresAt.Unix(),
	})

	tokenString, err := token.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return nil, errors.New("failed to generate token")
	}

	return &dtos.LoginResponse{
		Token: tokenString,
		User: dtos.UserResponse{
			ID:        user.ID,
			Email:     user.Email,
			FullName:  user.FullName,
			Role:      user.Role,
			IsActive:  user.IsActive,
			CreatedAt: user.CreatedAt,
		},
		ExpiresAt: expiresAt,
	}, nil
}

func (s *authService) Register(req dtos.RegisterRequest) (*dtos.UserResponse, error) {
	existing, _ := s.repo.FindByEmail(req.Email)
	if existing != nil {
		return nil, errors.New("email already registered")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("failed to hash password")
	}

	user := &models.User{
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		FullName:     req.FullName,
		Role:         req.Role,
		IsActive:     true,
	}

	if err := s.repo.Create(user); err != nil {
		return nil, errors.New("failed to create user")
	}

	return &dtos.UserResponse{
		ID:        user.ID,
		Email:     user.Email,
		FullName:  user.FullName,
		Role:      user.Role,
		IsActive:  user.IsActive,
		CreatedAt: user.CreatedAt,
	}, nil
}
