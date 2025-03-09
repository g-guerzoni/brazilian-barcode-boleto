import * as digit from './digit';
import type { BrazilianBarcode } from './types';

/**
 * Brazilian Barcode library instance
 * Provides utilities for working with Brazilian bank and bill barcodes
 */
export const brazilianBarcode: BrazilianBarcode = {
  digit,
  formatter: {}, // Reserved for future formatting utilities
};

export default brazilianBarcode;
export type { BrazilianBarcode, BarcodeVerificationResult, DigitOperations } from './types';
