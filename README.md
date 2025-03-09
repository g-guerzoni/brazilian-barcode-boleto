# Brazilian Barcode Boleto

A TypeScript library for handling Brazilian bank barcodes (boletos) verification digits calculation.

[![npm version](https://badge.fury.io/js/brazilian-barcode-boleto.svg)](https://badge.fury.io/js/brazilian-barcode-boleto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features
- Calculate verification digits for Brazilian bank barcodes (boletos)
- Support for barcode reordering
- TypeScript support with full type definitions
- Zero dependencies
- Comprehensive test coverage

## Installation

Using npm:
```bash
npm install brazilian-barcode-boleto
```

Using yarn:
```bash
yarn add brazilian-barcode-boleto
```

## Usage

### Basic Usage

```typescript
import { brazilianBarcode } from 'brazilian-barcode-boleto';

// Calculate verification digits for a bank barcode
const barcode = '23793381286000782713695000063305975520000370000';
const result = brazilianBarcode.digit.getVDBank(barcode);
console.log(result); // Returns barcode with verification digits

// With reordering option
const resultWithReorder = brazilianBarcode.digit.getVDBank(barcode, true);
```

### TypeScript Support

The library includes TypeScript definitions out of the box:

```typescript
import { BrazilianBarcode, BarcodeVerificationResult } from 'brazilian-barcode-boleto';

// Use types in your code
const processBarcode = (barcode: string): BarcodeVerificationResult => {
  return brazilianBarcode.digit.getVDBank(barcode);
};
```

## API Reference

### digit.getVDBank(barcode: string, order?: boolean): string

Calculates verification digits for bank barcodes.

#### Parameters:

- `barcode` (string): The barcode number to process (must be 44 digits)
- `order` (boolean, optional): Whether to reorder the barcode digits. Defaults to `false`

#### Returns:

- (string): The barcode with calculated verification digits (47 digits) or error message

#### Example:

```typescript
const barcode = '23793381286000782713695000063305975520000370000';

// Without reordering
const result = brazilianBarcode.digit.getVDBank(barcode);

// With reordering
const resultWithReorder = brazilianBarcode.digit.getVDBank(barcode, true);
```

### digit.getVDBill(barcode: string): string

Currently not implemented. Reserved for future bill barcode support.

## Error Handling

The library provides clear error messages for common issues:

- Invalid barcode length (must be 44 digits)
- Non-numeric characters in barcode (will be processed as is)
- Empty barcode

## Development

### Setup

1. Clone the repository:
```bash
git clone https://github.com/g-guerzoni/brazilian-barcode-boleto.git
cd brazilian-barcode-boleto
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

### Building

```bash
npm run build
```

The build output will be in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Guilherme Guerzoni (https://github.com/g-guerzoni)

## Changelog

### 0.2.1
- Added MIT LICENSE
- Renamed project to brazilian-barcode-boleto

### 0.2.0
- Added TypeScript support
- Added comprehensive test suite
- Added proper documentation
- Improved code organization

### 0.0.2
- Minor fix change

### 0.0.1
- Initial release
- Basic barcode verification functionality
