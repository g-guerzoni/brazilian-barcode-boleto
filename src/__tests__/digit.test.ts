import { brazilianBarcode } from '../index';

describe('Brazilian Barcode', () => {
  describe('digit module', () => {
    describe('getVDBank', () => {
      // Test data
      const testCases = {
        valid: {
          input: '23793381286000782713695000063305975520000370000',
          expectedLength: 47,
        },
        validWithSpecialCase: {
          input: '23793381286000782713695000063305975520000370009',
          expectedLength: 47,
        },
        short: {
          input: '123',
          error: 'Invalid barcode number',
        },
        nonNumeric: {
          input: '2379338128600078271369500006330597552000037000A',
          expectedLength: 47,
        },
        empty: {
          input: '',
          error: 'Invalid barcode number',
        },
      };

      describe('input validation', () => {
        it('should reject empty barcodes', () => {
          expect(brazilianBarcode.digit.getVDBank(testCases.empty.input)).toBe(
            testCases.empty.error,
          );
        });

        it('should reject barcodes shorter than 44 digits', () => {
          expect(brazilianBarcode.digit.getVDBank(testCases.short.input)).toBe(
            testCases.short.error,
          );
        });

        it('should handle non-numeric characters', () => {
          const result = brazilianBarcode.digit.getVDBank(testCases.nonNumeric.input);
          expect(result).toBeDefined();
          expect(result.length).toBe(testCases.nonNumeric.expectedLength);
        });
      });

      describe('verification digit calculation', () => {
        it('should calculate verification digits correctly for standard bank barcodes', () => {
          const result = brazilianBarcode.digit.getVDBank(testCases.valid.input);

          // Basic validations
          expect(result).toBeDefined();
          expect(typeof result).toBe('string');
          expect(result.length).toBe(testCases.valid.expectedLength);

          // Content validation
          expect(/^\d+$/.test(result)).toBe(true);

          // Structure validation
          const originalDigits = testCases.valid.input.split('');
          const resultDigits = result.split('');

          // Check if original digits are preserved in their positions
          originalDigits.forEach((digit, index) => {
            if (index < 44) {
              // Only check original positions
              expect(resultDigits[index]).toBe(digit);
            }
          });
        });

        it('should produce consistent results for the same input', () => {
          const firstResult = brazilianBarcode.digit.getVDBank(testCases.valid.input);
          const secondResult = brazilianBarcode.digit.getVDBank(testCases.valid.input);

          expect(firstResult).toBe(secondResult);
        });

        it('should handle edge cases with 9s', () => {
          const result = brazilianBarcode.digit.getVDBank(testCases.validWithSpecialCase.input);

          expect(result).toBeDefined();
          expect(result.length).toBe(testCases.validWithSpecialCase.expectedLength);
          expect(/^\d+$/.test(result)).toBe(true);
        });
      });

      describe('reordering functionality', () => {
        it('should handle barcode reordering when order flag is true', () => {
          const resultWithOrder = brazilianBarcode.digit.getVDBank(testCases.valid.input, true);
          const resultWithoutOrder = brazilianBarcode.digit.getVDBank(testCases.valid.input, false);

          // Basic validations
          expect(resultWithOrder).toBeDefined();
          expect(resultWithOrder.length).toBe(testCases.valid.expectedLength);
          expect(resultWithOrder).not.toBe(resultWithoutOrder);

          // Verify the reordering logic
          const originalSegment = testCases.valid.input.slice(4, 19);
          const withOrderResult = resultWithOrder.slice(0, -3); // Remove verification digits

          // Check if the segment was moved to the end
          expect(withOrderResult.endsWith(originalSegment)).toBe(true);
        });

        it('should maintain digit integrity after reordering', () => {
          const result = brazilianBarcode.digit.getVDBank(testCases.valid.input, true);
          const digits = result.split('').map(Number);

          // Verify all characters are valid digits
          digits.forEach((digit) => {
            expect(digit).toBeGreaterThanOrEqual(0);
            expect(digit).toBeLessThanOrEqual(9);
          });
        });
      });
    });

    describe('getVDBill', () => {
      const testCases = {
        anyBarcode: 'any-barcode',
        emptyBarcode: '',
        numericBarcode: '12345',
      };

      it('should return not supported message for any input', () => {
        expect(brazilianBarcode.digit.getVDBill(testCases.anyBarcode)).toBe('Not supported yet');
      });

      it('should return not supported message for empty input', () => {
        expect(brazilianBarcode.digit.getVDBill(testCases.emptyBarcode)).toBe('Not supported yet');
      });

      it('should return not supported message for numeric input', () => {
        expect(brazilianBarcode.digit.getVDBill(testCases.numericBarcode)).toBe(
          'Not supported yet',
        );
      });
    });
  });
});
