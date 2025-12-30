# 🚀 Robo-Advisor Order Splitter API

**Status**: ✅ Complete and Ready for Submission

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Test the API
./test-api.ps1

# Build for production
npm run build
npm start
```

Server runs on: `http://localhost:3000`

## What's Included

### Core Application (src/)
- ✅ **Type Definitions** - Complete TypeScript interfaces
- ✅ **Order Splitting Service** - Business logic with configurable precision
- ✅ **Date Service** - Market day calculations (Monday-Friday)
- ✅ **In-Memory Storage** - Non-persistent data storage
- ✅ **Performance Middleware** - Response time logging
- ✅ **RESTful Controllers** - Request handlers with error handling
- ✅ **Express Routes** - API endpoint definitions

### Documentation
- ✅ **README.md** - Complete API documentation with examples
- ✅ **ANSWERS.md** - Detailed responses to all challenge questions
- ✅ **test-api.ps1** - PowerShell test script

### Configuration
- ✅ **package.json** - All dependencies listed
- ✅ **tsconfig.json** - TypeScript strict mode enabled
- ✅ **.gitignore** - Proper exclusions

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/orders` | POST | Create new order |
| `/api/orders` | GET | Get historic orders |
| `/health` | GET | Health check |

## Features

1. **Order Splitting**
   - Splits investment across portfolio stocks by allocation %
   - Supports custom stock prices or defaults to $100
   - Configurable share quantity precision (default: 3 decimals)

2. **Market Days**
   - Automatically calculates next trading day
   - Skips weekends (Saturday/Sunday)

3. **Performance Monitoring**
   - Logs response time for every request
   - Console output: `[METHOD /path] Response time: Xms`

4. **Historic Orders**
   - Stores all orders in memory
   - Unique UUID for each order
   - Clears on application restart

## Example Request

```json
POST /api/orders
{
  "portfolio": {
    "stocks": [
      { "symbol": "AAPL", "allocation": 60, "price": 175.50 },
      { "symbol": "TSLA", "allocation": 40 }
    ]
  },
  "totalAmount": 1000,
  "orderType": "BUY"
}
```

## Example Response

```json
{
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "orderType": "BUY",
  "totalAmount": 1000,
  "orders": [
    {
      "symbol": "AAPL",
      "amount": 600,
      "quantity": 3.419,
      "price": 175.50
    },
    {
      "symbol": "TSLA",
      "amount": 400,
      "quantity": 4.0,
      "price": 100
    }
  ],
  "executionDate": "2025-12-30",
  "timestamp": "2025-12-29T09:48:13.123Z"
}
```

## Requirements Met ✅

### Functional
- ✅ Order splitting endpoint
- ✅ Historic orders endpoint
- ✅ Configurable decimal precision
- ✅ Fixed price with custom override support
- ✅ Non-persistent storage

### Technical
- ✅ RESTful API design
- ✅ Well-defined data formats
- ✅ Performance monitoring (milliseconds)
- ✅ Flexible for different portfolios and order types
- ✅ TypeScript strict mode
- ✅ Complete compilation without errors

### Submission
- ✅ Code compiles successfully
- ✅ README with instructions and examples
- ✅ Dependencies documented
- ✅ ANSWERS file with all required responses

## Code Quality

- **TypeScript Strict Mode**: All type checking enabled
- **Clean Architecture**: Separated concerns (types, services, controllers, routes)
- **Error Handling**: Proper validation and error messages
- **Performance**: Sub-millisecond response times
- **Documentation**: Comprehensive inline comments

## Technologies

- Node.js
- TypeScript (strict mode)
- Express.js
- UUID
- Nodemon (dev)

## Next Steps for Production

See [ANSWERS.md](file:///c:/Users/ACER/Documents/GitHub/node-ropo-api/ANSWERS.md) for detailed production migration plan including:
- Security controls (auth, rate limiting, HTTPS)
- Database integration (PostgreSQL)
- Monitoring & logging (APM tools)
- CI/CD pipeline
- Load balancing & scaling
- Real-time stock price integration

---

**Ready to submit!** 🎉

All requirements have been met. The code compiles, tests pass, and comprehensive documentation is included.
