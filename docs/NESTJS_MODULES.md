# NestJS Modules Documentation

This document provides comprehensive documentation for the core NestJS modules in this application.

## Table of Contents
- [Auth Module](#auth-module)
- [Constant Module](#constant-module)
- [Logs Module](#logs-module)
- [Status Module](#status-module)

---

## Auth Module

### Purpose and Responsibilities
The Auth Module handles authentication and authorization for the application using JWT (JSON Web Tokens). It provides login functionality, validates user credentials, and protects routes using JWT guards.

### Key Components

#### AuthModule (`src/auth/auth.module.ts`)
- **Purpose**: Configures the authentication module with necessary providers and imports
- **Dependencies**: 
  - `AuthController`: Handles HTTP requests for authentication
  - `AuthService`: Contains business logic for authentication
  - `JwtService`: Manages JWT token creation and validation
  - `JwtStrategy`: Implements Passport JWT strategy
  - `ConstantModule`: Provides environment constants

#### AuthController (`src/auth/auth.controller.ts`)
- **Purpose**: Handles authentication-related HTTP endpoints
- **API Endpoints**:
  
  1. **POST /auth/login**
     - Description: Authenticates a user and returns a JWT token
     - Request Body: `UserDto` (email, password)
     - Response: `LoginResponseDto` containing access token
     - Example:
       ```json
       // Request
       {
         "email": "user@mail.com",
         "password": "password123!"
       }
       
       // Response
       {
         "success": true,
         "data": {
           "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
         }
       }
       ```

  2. **GET /auth/check**
     - Description: Verifies if the user is authenticated
     - Protection: Requires JWT authentication (`@JwtAuth()`)
     - Response: `IsUserLoggedResponseDto` with logged status
     - Example:
       ```json
       {
         "success": true,
         "data": {
           "logged": true
         }
       }
       ```

#### AuthService (`src/auth/auth.service.ts`)
- **Purpose**: Contains authentication business logic
- **Service Methods**:

  1. **`validateUser(email: string, pass: string): Promise<any>`**
     - Validates user credentials against stored users
     - Throws `NotFoundError` if user doesn't exist
     - Throws `WrongPassword` if password is incorrect
     - Returns user object if validation succeeds

  2. **`login(user: UserType): Promise<LoginDto>`**
     - Validates user credentials
     - Creates JWT payload with email and sub (subject)
     - Signs and returns JWT token

#### JWT Strategy (`src/auth/strategies/jwt.strategy.ts`)
- **Purpose**: Implements Passport JWT strategy for token validation
- **Configuration**:
  - Extracts JWT from Authorization header as Bearer token
  - Uses JWT secret from ConstantService
  - Does not ignore token expiration
- **Validation**: Returns user payload with id, email, and isAdmin fields

#### JWT Guard (`src/auth/guards/jwt.guard.ts`)
- **Purpose**: Protects routes requiring authentication
- **Usage**: Applied via `@JwtAuth()` decorator

#### Auth Decorator (`src/auth/auth.decorator.ts`)
- **Purpose**: Provides a convenient decorator for JWT-protected routes
- **Features**:
  - Applies JWT guard
  - Adds Swagger Bearer authentication documentation
  - Usage: `@JwtAuth()` on controller methods

### DTOs and Types

#### UserDto
```typescript
{
  email: string;    // User email (validated)
  password: string; // User password
}
```

#### LoginDto
```typescript
{
  access_token: string; // JWT access token
}
```

#### IsUserLoggedDto
```typescript
{
  logged: boolean; // Authentication status
}
```

### Integration Patterns
1. **Login Flow**:
   ```
   Client → POST /auth/login → AuthController → AuthService.login()
   → validateUser() → Generate JWT → Return token
   ```

2. **Protected Route Access**:
   ```
   Client → Request with Bearer token → JwtAuthGuard → JwtStrategy.validate()
   → Route handler → Response
   ```

### Usage Examples

1. **Protecting a Route**:
   ```typescript
   @Controller('protected')
   export class ProtectedController {
     @JwtAuth()
     @Get('data')
     getProtectedData() {
       return { message: 'This is protected data' };
     }
   }
   ```

2. **Accessing User Info in Protected Routes**:
   ```typescript
   @JwtAuth()
   @Get('profile')
   getProfile(@Request() req) {
     return {
       email: req.user.email,
       id: req.user.id
     };
   }
   ```

---

## Constant Module

### Purpose and Responsibilities
The Constant Module provides centralized configuration management for the application. It manages environment variables, application settings, database configurations, and security keys in a type-safe manner.

### Key Components

#### ConstantModule (`src/constant/constant.module.ts`)
- **Purpose**: Global module that provides configuration service to entire application
- **Features**:
  - Marked as `@Global()` - available everywhere without explicit imports
  - Exports `ConstantService` for dependency injection

#### ConstantService (`src/constant/constant.service.ts`)
- **Purpose**: Manages all application constants and configuration
- **Key Properties**:

  1. **`CONSTANTS: ConstantsType`**
     - Main configuration object containing all settings
     - Initialized in constructor with default values

  2. **Configuration Structure**:
     ```typescript
     {
       NODE_ENV: "development" | "production",
       DATABASE: {
         PORT: 3306,
         HOST: "127.0.0.1",
         USERNAME: "admin",
         PASSWORD: "admin123",
         NAME: "sample-database"
       },
       APP: {
         PORT: 3000,
         HOST: "localhost",
         PATH: "",
         PROTOCOL: "http"
       },
       ADMIN_KEY: "HIGHSECURIRTYADMINKEY",
       JWT_KEY: "HIGHSECURIRTYJWTKEY",
       USERS: [
         {
           email: "user@mail.com",
           password: "password123!"
         }
       ]
     }
     ```

#### Service Methods

1. **`isDevelopment: boolean`**
   - Returns true if NODE_ENV is not 'production'
   - Used for conditional logic based on environment

2. **`isProduction: boolean`**
   - Returns true if NODE_ENV is 'production'
   - Inverse of isDevelopment

3. **`appUrl: string`**
   - Constructs full application URL based on environment
   - Development: includes port number
   - Production: excludes port number
   - Handles optional path prefix

### Type Definitions (`src/constant/constant.type.ts`)

#### ConstantsType
Defines the structure of configuration object with strict typing:
- Environment mode
- Database connection details
- Application server settings
- Security keys
- User credentials array

#### UserType
```typescript
interface UserType {
  email: string;
  password: string;
}
```

### Integration Patterns
1. **Dependency Injection**:
   ```typescript
   constructor(private constantService: ConstantService) {
     const jwtKey = this.constantService.CONSTANTS.JWT_KEY;
   }
   ```

2. **Environment-based Logic**:
   ```typescript
   if (this.constantService.isDevelopment) {
     // Development-only features
   }
   ```

3. **Dynamic URL Construction**:
   ```typescript
   const apiUrl = `${this.constantService.appUrl}/api`;
   ```

### Usage Examples

1. **Accessing Database Config**:
   ```typescript
   const dbConfig = this.constantService.CONSTANTS.DATABASE;
   // Use in TypeORM configuration
   ```

2. **JWT Secret Usage**:
   ```typescript
   this.jwtService.sign(payload, {
     secret: this.constantService.CONSTANTS.JWT_KEY
   });
   ```

3. **Environment Checks**:
   ```typescript
   if (this.constantService.isProduction) {
     // Enable production optimizations
   }
   ```

---

## Logs Module

### Purpose and Responsibilities
The Logs Module provides endpoints to retrieve application logs, allowing authenticated users to view error and output logs. It reads log files from the filesystem and returns the most recent log entries.

### Key Components

#### LogsModule (`src/logs/logs.module.ts`)
- **Purpose**: Simple module configuration for logs functionality
- **Components**: Contains only `LogsController`

#### LogsController (`src/logs/logs.controller.ts`)
- **Purpose**: Provides REST endpoints for log retrieval
- **Authentication**: All endpoints require JWT authentication
- **API Endpoints**:

  1. **GET /logs/error/:lines**
     - Description: Retrieves the last N lines from error log
     - Parameters: `lines` (number) - Number of lines to retrieve
     - File Source: `src/logs/app-err.log`
     - Response: `LogResponseDto` with array of log lines
     - Example:
       ```
       GET /logs/error/50
       Authorization: Bearer <token>
       
       Response:
       {
         "success": true,
         "data": [
           "[2024-01-15 10:30:45] ERROR: Database connection failed",
           "[2024-01-15 10:31:02] ERROR: Invalid user credentials"
         ]
       }
       ```

  2. **GET /logs/output/:lines**
     - Description: Retrieves the last N lines from output log
     - Parameters: `lines` (number) - Number of lines to retrieve
     - File Source: `src/logs/app-out.log`
     - Response: `LogResponseDto` with array of log lines

#### Private Methods

**`readLastLines(filePath: string, lines: number): Promise<string[]>`**
- Reads the last N lines from a log file
- Returns empty array if file doesn't exist
- Uses Node.js readline for efficient line-by-line reading
- Maintains a rolling buffer of the most recent lines

### DTOs

#### LogResponseDto
```typescript
{
  success: boolean;
  data: string[];  // Array of log lines
  error?: ErrorDto;
}
```

### Integration Patterns
1. **Error Handling**: Uses `safeRun` wrapper for consistent error responses
2. **Authentication**: Protected with `@JwtAuth()` decorator
3. **File System Access**: Reads logs from `src/logs/` directory

### Usage Examples

1. **Fetching Recent Errors**:
   ```bash
   curl -H "Authorization: Bearer <token>" \
        http://localhost:3000/logs/error/100
   ```

2. **Monitoring Output Logs**:
   ```bash
   curl -H "Authorization: Bearer <token>" \
        http://localhost:3000/logs/output/200
   ```

### Log File Structure
- **Error Log** (`src/logs/app-err.log`): Contains application errors and exceptions
- **Output Log** (`src/logs/app-out.log`): Contains general application output and info messages

---

## Status Module

### Purpose and Responsibilities
The Status Module provides a robust error handling and response standardization system. It includes custom error types, safe execution wrappers, and standardized response DTOs for consistent API responses.

### Key Components

#### StatusModule (`src/status/status.module.ts`)
- **Purpose**: Module configuration for status-related functionality
- **Note**: Currently only provides `StatusService` (which is empty)

#### StatusService (`src/status/status.service.ts`)
- **Purpose**: Placeholder service for future status-related functionality
- **Current State**: Empty implementation

#### Error System (`src/status/errors.ts`)

##### LocalError Base Class
- **Purpose**: Base class for all custom application errors
- **Features**:
  - Extends native Error class
  - Auto-registers error types to ErrorRegistry
  - Preserves error name from constructor

##### Custom Error Types
1. **NotFoundError**: Resource not found errors
2. **WrongPassword**: Authentication failure errors
3. **TestError**: For testing error handling

##### ErrorRegistry
- **Purpose**: Maintains registry of all custom error types
- **Methods**:
  - `register()`: Automatically called by LocalError constructor
  - `getEnum()`: Returns object with all registered error types

### Safe Execution System (`src/status/safe-run.ts`)

#### `safeRun` Function
- **Purpose**: Wraps promises to provide consistent error handling
- **Parameters**:
  - `promise`: The async operation to execute
  - `resource`: Optional resource name for logging
  - `successMessage`: Optional function to generate success log message
- **Features**:
  - Execution time tracking
  - Distinguishes between known (LocalError) and unknown errors
  - Automatic logging with execution time
  - Returns standardized StatusType response

#### `@SafeRun()` Decorator
- **Purpose**: Method decorator version of safeRun
- **Usage**: Applied to async controller methods
- **Example**:
  ```typescript
  @SafeRun('UserCheck', (result) => 'User check completed')
  async checkUser() {
    // method implementation
  }
  ```

### Response DTOs (`src/status/response.dto.ts`)

#### ErrorDto
```typescript
{
  message?: string;  // Error message
  name?: string;     // Error type name
  stack?: string;    // Stack trace
}
```

#### ResponseDto
```typescript
{
  success: boolean;           // Operation success status
  data?: any | null;         // Response data
  error?: LocalError | null;  // Error details if failed
}
```

### Type Definitions (`src/status/status.type.ts`)

#### StatusType<T>
```typescript
interface StatusType<T> {
  success: boolean;
  data: T | null | undefined;
  error: LocalError | Error | null | undefined;
}
```

### Integration Patterns

1. **Controller Error Handling**:
   ```typescript
   @Post('create')
   async create(@Body() dto: CreateDto) {
     return await safeRun(
       this.service.create(dto),
       'CreateResource',
       (result) => `Resource ${result.id} created`
     );
   }
   ```

2. **Custom Error Usage**:
   ```typescript
   async findUser(email: string) {
     const user = await this.userRepository.findOne({ email });
     if (!user) {
       throw new NotFoundError(`User ${email} not found`);
     }
     return user;
   }
   ```

3. **Decorator Usage**:
   ```typescript
   @SafeRun('GetProfile')
   async getProfile(@Request() req) {
     return this.userService.getProfile(req.user.id);
   }
   ```

### Usage Examples

1. **Throwing Custom Errors**:
   ```typescript
   if (!isValid) {
     throw new WrongPassword('Invalid credentials provided');
   }
   ```

2. **Safe Execution with Logging**:
   ```typescript
   const result = await safeRun(
     this.processPayment(orderId),
     'PaymentProcessor',
     (payment) => `Payment ${payment.id} processed: $${payment.amount}`
   );
   ```

3. **Standardized Response**:
   ```typescript
   // Success response
   {
     "success": true,
     "data": { "id": 1, "name": "Product" }
   }
   
   // Error response
   {
     "success": false,
     "error": {
       "name": "NotFoundError",
       "message": "Product not found",
       "stack": "..."
     }
   }
   ```

### Benefits
1. **Consistent Error Handling**: All errors follow the same pattern
2. **Automatic Logging**: Execution times and errors are logged
3. **Type Safety**: TypeScript interfaces ensure proper response structure
4. **Known vs Unknown Errors**: System differentiates between expected and unexpected errors
5. **Clean Controllers**: Business logic separated from error handling

---

## Module Interactions

### Authentication Flow
1. User credentials → Auth Module → Constant Module (for user validation)
2. JWT creation uses JWT_KEY from Constant Module
3. Protected endpoints use JwtAuth guard from Auth Module

### Error Handling Flow
1. All modules use Status Module's error types and safe execution
2. Controllers wrap service calls with `safeRun` or `@SafeRun()`
3. Errors are logged and returned in standardized format

### Configuration Access
1. All modules can inject ConstantService due to Global module
2. JWT Strategy uses constants for secret key
3. Database connections use constants for connection details

### Logging Integration
1. Logs Module reads from filesystem logs
2. Status Module's safeRun logs execution details
3. Error logs captured in app-err.log, output in app-out.log