/**
 * Formatter untuk Kubikasi Kayu (Plywood Log Procurement)
 * 
 * Standar Industri Indonesia:
 * - Database menyimpan volume dalam dm³ (desimeter kubik) atau liter
 * - 1 m³ = 1000 dm³
 * - Tampilan user dalam m³ dengan 3 angka desimal
 * 
 * Contoh:
 * - Database: 874 (dm³) → Tampilan: 0.874 m³
 * - Database: 1870 (dm³) → Tampilan: 1.870 m³
 */

/**
 * Konversi volume dari dm³ ke m³ dengan format 3 desimal
 * @param volumeInDm3 - Volume dalam dm³ (dari database)
 * @returns String format "0.874" atau "1.870"
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
 * Rumus: V = π/4 × d² × L
 * 
 * @param diameterCm - Diameter aktual batang dalam cm (misal: 21, 22, 23)
 * @param lengthM - Panjang batang dalam meter (misal: 4)
 * @returns Volume dalam dm³ (desimeter kubik)
 * 
 * Contoh:
 * - Diameter: 21 cm, Panjang: 4 m
 * - V = π/4 × 21² × 40 = 13.854 cm³ = 13.854 dm³
 */
export function calculateLogVolumeDm3(diameterCm: number, lengthM: number): number {
  const radiusCm = diameterCm / 2;
  const lengthCm = lengthM * 100; // konversi meter ke cm
  
  // Volume dalam cm³
  const volumeCm3 = Math.PI * radiusCm * radiusCm * lengthCm;
  
  // Konversi ke dm³ (1 dm³ = 1000 cm³)
  const volumeDm3 = volumeCm3 / 1000;
  
  return Math.round(volumeDm3 * 100) / 100; // 2 desimal untuk dm³
}

/**
 * Hitung total volume untuk beberapa batang dengan diameter berbeda-beda
 * Ini adalah logika yang BENAR menurut standar SNI/Perhutani
 * 
 * @param logs - Array diameter aktual per batang dalam cm
 * @param lengthM - Panjang batang dalam meter
 * @returns Total volume dalam dm³
 * 
 * Contoh:
 * - Batang 1: diameter 21 cm
 * - Batang 2: diameter 22 cm
 * - Batang 3: diameter 23 cm
 * - Panjang: 4 m
 * - Total = V(21) + V(22) + V(23)
 */
export function calculateTotalVolumeDm3(logs: number[], lengthM: number): number {
  return logs.reduce((total, diameter) => {
    return total + calculateLogVolumeDm3(diameter, lengthM);
  }, 0);
}

/**
 * Hitung volume menggunakan nilai tengah (SALAH - hanya untuk perbandingan)
 * Ini adalah cara yang TIDAK AKURAT
 * 
 * @param numberOfLogs - Jumlah batang
 * @param avgDiameterCm - Diameter rata-rata dalam cm
 * @param lengthM - Panjang dalam meter
 * @returns Volume dalam dm³
 */
export function calculateVolumeByAverageDm3(
  numberOfLogs: number, 
  avgDiameterCm: number, 
  lengthM: number
): number {
  const volumePerLog = calculateLogVolumeDm3(avgDiameterCm, lengthM);
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
): Record<string, { count: number; totalVolumeDm3: number }> {
  const result: Record<string, { count: number; totalVolumeDm3: number }> = {};
  
  // Initialize semua kelas
  diameterClasses.forEach(cls => {
    result[cls] = { count: 0, totalVolumeDm3: 0 };
  });
  
  // Group logs ke kelas yang sesuai
  logs.forEach(log => {
    const matchingClass = diameterClasses.find(cls => {
      const [min, max] = cls.split('-').map(Number);
      return log.diameter >= min && log.diameter <= max;
    });
    
    if (matchingClass) {
      result[matchingClass].count++;
      result[matchingClass].totalVolumeDm3 += calculateLogVolumeDm3(log.diameter, log.length);
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
