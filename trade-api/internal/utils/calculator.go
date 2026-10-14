package utils

import "math"

// CalculateLogVolumeM3 calculates volume of a single log in m³
// Formula: V = (π/4) × d² × L
// diameterCm: diameter in cm
// lengthCm: length in cm
func CalculateLogVolumeM3(diameterCm, lengthCm float64) float64 {
	diameterM := diameterCm / 100
	lengthM := lengthCm / 100
	return (math.Pi / 4) * (diameterM * diameterM) * lengthM
}

// CalculateTotalVolumeM3 calculates total volume for multiple logs
func CalculateTotalVolumeM3(diameters []float64, lengthCm float64) float64 {
	total := 0.0
	for _, diameter := range diameters {
		total += CalculateLogVolumeM3(diameter, lengthCm)
	}
	return total
}

// CalculateVolumePerLog calculates average volume per log
func CalculateVolumePerLog(diameters []float64, lengthCm float64) float64 {
	if len(diameters) == 0 {
		return 0
	}
	totalVolume := CalculateTotalVolumeM3(diameters, lengthCm)
	return totalVolume / float64(len(diameters))
}

// CalculatePricePerLog calculates price per log based on price per m³
func CalculatePricePerLog(pricePerM3, volumePerLogM3 float64) float64 {
	return pricePerM3 * volumePerLogM3
}

// CalculateMargin calculates trader margin
func CalculateMargin(volumeM3, marginPerM3 float64) float64 {
	return volumeM3 * marginPerM3
}

// CalculatePayableToSupplier calculates amount to pay to supplier
// Formula: Total Price - Margin
func CalculatePayableToSupplier(totalPrice, margin float64) float64 {
	return totalPrice - margin
}

// CalculateReceivableFromCompany calculates amount to receive from company
// Company pays full price (margin already included)
func CalculateReceivableFromCompany(totalPrice float64) float64 {
	return totalPrice
}

// CalculateProfit calculates trader profit
func CalculateProfit(volumeM3, marginPerM3 float64) float64 {
	return volumeM3 * marginPerM3
}
