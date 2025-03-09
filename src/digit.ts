import { BarcodeVerificationResult } from './types';

// Constants
const REQUIRED_BARCODE_LENGTH = 44;
const WEIGHT_ARRAY = [
  2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
] as const;

const VERIFICATION_POINTS = [9, 10, 10] as const;
const REORDER_START_INDEX = 4;
const REORDER_END_INDEX = 18;

// Array prototype extension
Array.prototype.insertInArray = function <T>(index: number, item: T): void {
  this.splice(index, 0, item);
};

/**
 * Calculates a single digit sum for numbers greater than 9
 * @param num - Number to process
 */
const calculateSingleDigitSum = (num: number): number => {
  if (num <= 9) return num;
  const digits = num.toString().split('');
  return parseInt(digits[0]) + parseInt(digits[1]);
};

/**
 * Calculates verification digit for bank barcodes
 * @param barcode - The barcode to verify
 * @param order - Whether to reorder the barcode digits
 */
export const getVDBank = (barcode: string, order: boolean = false): BarcodeVerificationResult => {
  if (barcode.length < REQUIRED_BARCODE_LENGTH) {
    return 'Invalid barcode number';
  }

  const barcodeArray = barcode.split('');

  if (order) {
    const reorderedDigits = barcodeArray.slice(REORDER_START_INDEX, REORDER_END_INDEX + 1);
    barcodeArray.splice(REORDER_START_INDEX, reorderedDigits.length);
    barcodeArray.push(...reorderedDigits);
  }

  VERIFICATION_POINTS.forEach((verificationDigit, vdIndex) => {
    let lastIndex = vdIndex > 0 ? vdIndex : 0;

    // Calculate lastIndex based on previous verification points
    VERIFICATION_POINTS.forEach((point, i) => {
      if (i <= vdIndex) lastIndex += point;
    });

    const sums: number[] = [];
    for (let i = lastIndex - verificationDigit; i < lastIndex; i++) {
      if (i > WEIGHT_ARRAY.length - 1) return;

      const weight = WEIGHT_ARRAY[vdIndex > 0 ? i - vdIndex : i];
      const digit = parseInt(barcodeArray[i]);
      const product = calculateSingleDigitSum(weight * digit);

      sums[i] = product;

      if (i === lastIndex - 1) {
        const total = sums.reduce((acc, curr) => (acc || 0) + (curr || 0), 0);
        const checkDigit = 10 - (total % 10);
        barcodeArray.insertInArray(lastIndex, checkDigit.toString());
        sums.length = 0; // Clear array
      }
    }
  });

  return barcodeArray.join('');
};

/**
 * Calculates verification digit for bill barcodes
 * @param barcode - The barcode to verify
 */
export const getVDBill = (barcode: string): BarcodeVerificationResult => {
  return 'Not supported yet';
};
