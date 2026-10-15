package utils

import (
	"math"
)

func CalculateLogVolumeM3(diameterCm, lengthCm float64) float64 {
	diameterM := diameterCm / 100
	lengthM := lengthCm / 100
	return (math.Pi / 4) * (diameterM * diameterM) * lengthM
}

func CalculateTotalVolumeM3(diameters []float64, lengthCm float64) float64 {
	total := 0.0
	for _, diameter := range diameters {
		total += CalculateLogVolumeM3(diameter, lengthCm)
	}
	return total
}

func CalculateVolumePerLog(diameters []float64, lengthCm float64) float64 {
	if len(diameters) == 0 {
		return 0
	}
	totalVolume := CalculateTotalVolumeM3(diameters, lengthCm)
	return totalVolume / float64(len(diameters))
}

func CalculatePricePerLog(pricePerM3, volumePerLogM3 float64) float64 {
	return pricePerM3 * volumePerLogM3
}

func CalculateMargin(volumeM3, marginPerM3 float64) float64 {
	return volumeM3 * marginPerM3
}

func CalculatePayableToSupplier(totalPrice, margin float64) float64 {
	return totalPrice - margin
}

func CalculateReceivableFromCompany(totalPrice float64) float64 {
	return totalPrice
}

func CalculateProfit(volumeM3, marginPerM3 float64) float64 {
	return volumeM3 * marginPerM3
}
