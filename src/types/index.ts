/**
 * Represents the result of barcode verification operations
 */
export type BarcodeVerificationResult = string;

/**
 * Interface for digit verification operations
 */
export interface DigitOperations {
  /**
   * Calculates the verification digit for bank barcodes
   * @param barcode - The barcode string to verify
   * @param order - Whether to reorder the barcode digits
   */
  getVDBank: (barcode: string, order?: boolean) => BarcodeVerificationResult;

  /**
   * Calculates the verification digit for bill barcodes
   * @param barcode - The barcode string to verify
   */
  getVDBill: (barcode: string) => BarcodeVerificationResult;
}

/**
 * Main library interface
 */
export interface BrazilianBarcode {
  digit: DigitOperations;
  formatter: Record<string, unknown>;
}

/**
 * Extends the Array prototype with additional functionality
 */
declare global {
  interface Array<T> {
    /**
     * Inserts an item at a specific index in the array
     * @param index - The position to insert the item
     * @param item - The item to insert
     */
    insertInArray(index: number, item: T): void;
  }
}
