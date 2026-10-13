/**
 * Formatter untuk Kubikasi Kayu (Plywood Log Procurement)
 * 
 * RUMUS YANG BENAR:
 * V = (π/4) × d² × t
 * 
 * Dimana:
 * - d = diameter dalam METER
 * - t = panjang dalam METER
 * - Hasil = volume dalam m³
 * 
 * KONVERSI SATUAN:
 * - 1 m = 100 cm
 * - 1 m³ = 1,000,000 cm³
 * - 1 m³ = 1,000 dm³ (liter)
 * 
 * CONTOH PERHITUNGAN:
 * Diameter: 21.5 cm = 0.215 m
 * Panjang: 130 cm = 1.3 m
 * 
 * V = (π/4) × (0.215)² × 1.3
 * V = 0.7854 × 0.046225 × 1.3
 * V = 0.04719 m³ ✅
 */

/**
 * Konversi volume dari dm³ ke m³ dengan format 3 desimal
 * @param volumeInDm3 - Volume dalam dm³ (dari database)
 * @returns String format "0.047" atau "1.005"
 */
export function formatVolumeM3(volumeInDm3: number): string {
  if (volumeInDm3 === 0 || volumeInDm3 === null || volumeInDm3 === undefined) {
    return '0.000';
  }
  
  const volumeInM3 = volumeInDm3 / 1000;
  return volumeInM3.toFixed(3);
}

/**
 * Format angka dengan pemisah ribuan (titik untuk Indonesia)
 * @param number - Angka yang akan diformat
 * @returns String format "1.870" atau "18.750.000"
 */
export function formatNumberID(number: number): string {
  if (number === 0 || number === null || number === undefined) {
    return '0';
  }
  
  return new Intl.NumberFormat('id-ID').format(number);
}

/**
 * Hitung volume 1 batang kayu berdasarkan diameter aktual
 * 
 * RUMUS: V = (π/4) × d² × t
 * 
 * PENTING: Semua input harus dalam CM, output dalam m³
 * 
 * @param diameterCm - Diameter aktual batang dalam cm (misal: 21, 22, 23)
 * @param lengthCm - Panjang batang dalam cm (misal: 130, bukan 1.3!)
 * @returns Volume dalam m³
 * 
 * Contoh:
 * - Diameter: 21.5 cm, Panjang: 130 cm
 * - d = 21.5 cm = 0.215 m
 * - t = 130 cm = 1.3 m
 * - V = (π/4) × (0.215)² × 1.3 = 0.04719 m³ ✅
 */
export function calculateLogVolumeM3(diameterCm: number, lengthCm: number): number {
  // Konversi cm ke meter
  const diameterM = diameterCm / 100;
  const lengthM = lengthCm / 100;
  
  // Rumus: V = (π/4) × d² × t
  const volumeM3 = (Math.PI / 4) * (diameterM * diameterM) * lengthM;
  
  return volumeM3;
}

/**
 * Hitung volume 1 batang kayu dalam dm³
 * @param diameterCm - Diameter dalam cm
 * @param lengthCm - Panjang dalam cm
 * @returns Volume dalam dm³
 */
export function calculateLogVolumeDm3(diameterCm: number, lengthCm: number): number {
  const volumeM3 = calculateLogVolumeM3(diameterCm, lengthCm);
  return volumeM3 * 1000; // 1 m³ = 1000 dm³
}

/**
 * Hitung total volume untuk beberapa batang dengan diameter berbeda-beda
 * Ini adalah logika yang BENAR menurut standar SNI/Perhutani
 * 
 * @param logs - Array diameter aktual per batang dalam cm
 * @param lengthCm - Panjang batang dalam cm
 * @returns Total volume dalam m³
 * 
 * Contoh:
 * - Batang 1: diameter 21 cm
 * - Batang 2: diameter 22 cm
 * - Batang 3: diameter 23 cm
 * - Panjang: 130 cm
 * - Total = V(21) + V(22) + V(23) dalam m³
 */
export function calculateTotalVolumeM3(logs: number[], lengthCm: number): number {
  return logs.reduce((total, diameter) => {
    return total + calculateLogVolumeM3(diameter, lengthCm);
  }, 0);
}

/**
 * Hitung total volume dalam dm³
 * @param logs - Array diameter dalam cm
 * @param lengthCm - Panjang dalam cm
 * @returns Total volume dalam dm³
 */
export function calculateTotalVolumeDm3(logs: number[], lengthCm: number): number {
  return logs.reduce((total, diameter) => {
    return total + calculateLogVolumeDm3(diameter, lengthCm);
  }, 0);
}

/**
 * Hitung volume menggunakan nilai tengah (SALAH - hanya untuk perbandingan)
 * Ini adalah cara yang TIDAK AKURAT
 * 
 * @param numberOfLogs - Jumlah batang
 * @param avgDiameterCm - Diameter rata-rata dalam cm
 * @param lengthCm - Panjang dalam cm
 * @returns Volume dalam m³
 */
export function calculateVolumeByAverageM3(
  numberOfLogs: number, 
  avgDiameterCm: number, 
  lengthCm: number
): number {
  const volumePerLog = calculateLogVolumeM3(avgDiameterCm, lengthCm);
  return numberOfLogs * volumePerLog;
}

/**
 * Group logs by diameter class (kelas diameter)
 * 
 * @param logs - Array object dengan diameter aktual
 * @param diameterClasses - Array kelas diameter (misal: ["19-24", "25-30"])
 * @returns Object dengan total volume per kelas
 */
export function groupLogsByDiameterClass(
  logs: Array<{ diameter: number; length: number }>,
  diameterClasses: string[]
): Record<string, { count: number; totalVolumeM3: number }> {
  const result: Record<string, { count: number; totalVolumeM3: number }> = {};
  
  // Initialize semua kelas
  diameterClasses.forEach(cls => {
    result[cls] = { count: 0, totalVolumeM3: 0 };
  });
  
  // Group logs ke kelas yang sesuai
  logs.forEach(log => {
    const matchingClass = diameterClasses.find(cls => {
      const [min, max] = cls.split('-').map(Number);
      return log.diameter >= min && log.diameter <= max;
    });
    
    if (matchingClass) {
      result[matchingClass].count++;
      result[matchingClass].totalVolumeM3 += calculateLogVolumeM3(log.diameter, log.length);
    }
  });
  
  return result;
}

/**
 * Parse diameter class string ke min-max
 * @param classStr - String seperti "19-24" atau "25-30"
 * @returns Object { min: number, max: number }
 */
export function parseDiameterClass(classStr: string): { min: number; max: number } {
  const [min, max] = classStr.split('-').map(Number);
  return { min, max };
}

/**
 * Check apakah diameter masuk dalam kelas tertentu
 * @param diameter - Diameter aktual dalam cm
 * @param classStr - String kelas seperti "19-24"
 * @returns boolean
 */
export function isDiameterInClass(diameter: number, classStr: string): boolean {
  const { min, max } = parseDiameterClass(classStr);
  return diameter >= min && diameter <= max;
}
