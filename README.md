# Robo-Advisor Order Splitter API

A RESTful API for splitting investment orders across model portfolios. Built with Node.js, TypeScript, and Express.

## Features

- **Order Splitting**: Automatically divides investment amounts across portfolio stocks based on allocation percentages
- **Market Day Execution**: Orders scheduled only on weekdays (Monday-Friday)
- **Configurable Precision**: Adjustable decimal places for share quantities
- **Performance Monitoring**: Response time logging in milliseconds
- **Historic Orders**: In-memory storage of all processed orders
- **Flexible Pricing**: Support for custom stock prices or default $100 pricing

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Storage**: In-memory (non-persistent)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. Create Order

**Endpoint**: `POST /api/orders`

**Description**: Split an order across a model portfolio

**Request Body**:
```json
{
  "portfolio": {
    "stocks": [
      {
        "symbol": "AAPL",
        "allocation": 60,
        "price": 150
      },
      {
        "symbol": "TSLA",
        "allocation": 40
      }
    ]
  },
  "totalAmount": 1000,
  "orderType": "BUY"
}
```

**Field Descriptions**:
- `portfolio.stocks`: Array of stock allocations
  - `symbol`: Stock ticker symbol (string)
  - `allocation`: Percentage of portfolio (number, 0-100)
  - `price`: Optional custom price (number). Defaults to $100 if not provided
- `totalAmount`: Total investment amount (number)
- `orderType`: Either "BUY" or "SELL" (string)

**Response** (201 Created):
```json
{
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "orderType": "BUY",
  "totalAmount": 1000,
  "orders": [
    {
      "symbol": "AAPL",
      "amount": 600,
      "quantity": 4.0,
      "price": 150
    },
    {
      "symbol": "TSLA",
      "amount": 400,
      "quantity": 4.0,
      "price": 100
    }
  ],
  "executionDate": "2025-12-30",
  "timestamp": "2025-12-29T09:35:33.000Z"
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": "Portfolio allocations must sum to 100%. Current total: 95%"
}
```

### 2. Get Historic Orders

**Endpoint**: `GET /api/orders`

**Description**: Retrieve all historic orders

**Response** (200 OK):
```json
{
  "total": 2,
  "orders": [
    {
      "orderId": "550e8400-e29b-41d4-a716-446655440000",
      "orderType": "BUY",
      "totalAmount": 1000,
      "orders": [...],
      "executionDate": "2025-12-30",
      "timestamp": "2025-12-29T09:35:33.000Z"
    },
    ...
  ]
}
```

### 3. Health Check

**Endpoint**: `GET /health`

**Response** (200 OK):
```json
{
  "status": "OK",
  "timestamp": "2025-12-29T09:35:33.000Z"
}
```

## Configuration

Edit `src/config/constants.ts` to modify:

- `DEFAULT_STOCK_PRICE`: Default price when no custom price provided (default: 100)
- `SHARE_DECIMAL_PRECISION`: Decimal places for share quantities (default: 3)
- `PORT`: Server port (default: 3000)

## Example Usage

### Example 1: Basic Order with Default Pricing

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio": {
      "stocks": [
        {"symbol": "AAPL", "allocation": 60},
        {"symbol": "TSLA", "allocation": 40}
      ]
    },
    "totalAmount": 100,
    "orderType": "BUY"
  }'
```

### Example 2: Order with Custom Stock Prices

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio": {
      "stocks": [
        {"symbol": "AAPL", "allocation": 50, "price": 175.50},
        {"symbol": "GOOGL", "allocation": 30, "price": 140.20},
        {"symbol": "MSFT", "allocation": 20, "price": 380.00}
      ]
    },
    "totalAmount": 5000,
    "orderType": "BUY"
  }'
```

### Example 3: SELL Order

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio": {
      "stocks": [
        {"symbol": "AAPL", "allocation": 100}
      ]
    },
    "totalAmount": 250,
    "orderType": "SELL"
  }'
```

### Example 4: Get All Orders

```bash
curl http://localhost:3000/api/orders
```

## Project Structure

```
src/
├── config/
│   └── constants.ts        # Configuration constants
├── controllers/
│   └── orderController.ts  # Request handlers
├── middleware/
│   └── performance.ts      # Performance logging
├── routes/
│   └── orderRoutes.ts      # API routes
├── services/
│   ├── dateService.ts      # Market day calculations
│   └── orderService.ts     # Order splitting logic
├── storage/
│   └── memoryStore.ts      # In-memory data storage
├── types/
│   └── index.ts            # TypeScript type definitions
└── index.ts                # Application entry point
```

## Notes

- **Data Persistence**: All data is stored in memory and will be lost on application restart
- **Market Days**: Orders are only executed Monday through Friday
- **Allocation Validation**: Portfolio allocations must sum to exactly 100%
- **Performance Logging**: All API requests log response time to console

## Dependencies

### Production
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `uuid`: Unique ID generation

### Development
- `typescript`: TypeScript compiler
- `ts-node`: TypeScript execution
- `nodemon`: Auto-restart on file changes
- `@types/*`: Type definitions

## License

MIT