# ANSWERS

## What was your approach (thought process) to tackling this project?

I started by understanding the requirements, then designed a clean layered architecture (types, services, controllers, routes). I built the core logic first—order splitting and market day calculations—then wrapped it with an Express API. Everything was developed incrementally to keep things organized.

## What assumptions did you make?

- Portfolio allocations must total 100%
- Weekend orders execute on the next Monday
- Default stock price is $100 when not provided
- Share quantities support fractional shares (3 decimal places)
- API validates all inputs and returns proper error codes

## What challenges did you face when creating your solution?

- **Floating-point precision** - Used tolerance thresholds and proper rounding
- **Date calculations** - Handled weekends and edge cases carefully
- **TypeScript strict mode** - Required proper typing throughout
- **API design** - Balanced simplicity with flexibility for future needs

## If you were to migrate your code from its current standalone format to a fully functional production environment, what are some changes and controls you would put in place?

**Security:**
- Add authentication (JWT/OAuth2) and rate limiting
- Use HTTPS with proper security headers
- Implement input validation with libraries like Joi

**Infrastructure:**
- Replace in-memory storage with PostgreSQL/MongoDB
- Add Redis for caching stock prices
- Containerize with Docker and deploy with Kubernetes

**Monitoring:**
- Set up structured logging (Winston/Pino)
- Add APM tools (Datadog, Prometheus)
- Implement error tracking (Sentry)

**Code Quality:**
- Add comprehensive tests (Jest for unit, integration, E2E)
- Set up CI/CD pipeline with automated testing
- Integrate real-time market data APIs

**API Management:**
- Version the API (/api/v1/orders)
- Create OpenAPI/Swagger documentation
- Implement feature flags for gradual rollouts

## If you've used LLMs to solve the challenge, describe how and where you've used it and how did it help you in tackling the challenge?

Yes, I used LLMs as a development tool throughout the project:

**Code Generation:**
- Generated TypeScript boilerplate and type definitions
- Created Express middleware setup
- Saved significant time on repetitive setup tasks

**Algorithm Design:**
- Helped design the order splitting logic
- Suggested approaches for weekend date calculations
- Reduced bugs by covering edge cases early

**Best Practices:**
- Recommended project structure patterns
- Provided TypeScript strict mode guidance
- Suggested the singleton pattern for memory store

**Documentation:**
- Generated comprehensive README with examples
- Formatted markdown properly
- Created clear API usage examples

**Debugging:**
- Quickly resolved TypeScript compilation errors
- Helped with async/await typing issues

I always reviewed and tested LLM-generated code to ensure correctness. The LLM acted like a pair-programming partner—handling boilerplate and suggestions while I made the architectural decisions and business logic choices.
