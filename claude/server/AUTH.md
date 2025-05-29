# Auth Module Documentation

This document provides comprehensive documentation for the authentication module in the NestJS backend.

## Module Overview

The Auth module implements JWT-based authentication with:
- User login endpoint
- JWT token generation and validation
- Protected route handling via guards
- Passport.js integration

## Directory Structure
```
src/auth/
├── auth.module.ts       # Module definition
├── auth.controller.ts   # API endpoints
├── auth.service.ts      # Business logic
├── auth.dto.ts         # Data transfer objects
├── auth.decorator.ts    # Custom decorators
├── guards/
│   └── jwt.guard.ts    # JWT authentication guard
└── strategies/
    └── jwt.strategy.ts # Passport JWT strategy
```

## Components

### AuthModule (`auth.module.ts`)
```typescript
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConstantModule],
      useFactory: async (constantService: ConstantService) => ({
        secret: constantService.security.jwtSecret,
        signOptions: { expiresIn: constantService.security.jwtExpiresIn },
      }),
      inject: [ConstantService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

**Key Features**:
- Async JWT configuration from ConstantService
- Exports AuthService for use in other modules
- Registers Passport strategies

### AuthController (`auth.controller.ts`)

#### Login Endpoint
```typescript
@Post('login')
@ApiOperation({ summary: 'User login' })
@ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto })
@ApiResponse({ status: 401, description: 'Invalid credentials', type: ErrorDto })
async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
  return this.authService.login(loginDto);
}
```

#### Check Login Status
```typescript
@Get('is-user-logged')
@JwtAuth()
@ApiOperation({ summary: 'Check if user is logged in' })
async isUserLogged(@CurrentUser() user: UserDto): Promise<IsUserLoggedResponseDto> {
  return this.statusService.execute(async () => {
    return { isLogged: true, user };
  });
}
```

### AuthService (`auth.service.ts`)

#### User Validation
```typescript
async validateUser(email: string, password: string): Promise<UserDto | null> {
  // Get configured users from ConstantService
  const users = this.constantService.app.users;
  
  const user = users.find(u => u.email === email);
  if (!user) return null;
  
  // Check password (plain text comparison - should use bcrypt in production)
  if (user.password !== password) return null;
  
  // Return user without password
  const { password: _, ...result } = user;
  return result;
}
```

#### Login Method
```typescript
async login(loginDto: LoginDto): Promise<LoginResponseDto> {
  const user = await this.validateUser(loginDto.email, loginDto.password);
  
  if (!user) {
    throw UnauthorizedException.USER_NOT_FOUND();
  }
  
  const payload = { email: user.email, sub: user.id };
  const token = this.jwtService.sign(payload);
  
  return { user, token };
}
```

### JWT Strategy (`strategies/jwt.strategy.ts`)
```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private constantService: ConstantService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constantService.security.jwtSecret,
    });
  }

  async validate(payload: any): Promise<UserDto> {
    // Find user by email from payload
    const users = this.constantService.app.users;
    const user = users.find(u => u.email === payload.email);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    const { password, ...result } = user;
    return result;
  }
}
```

### JWT Guard (`guards/jwt.guard.ts`)
```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
```

### Auth Decorator (`auth.decorator.ts`)

#### JwtAuth Decorator
```typescript
export const JwtAuth = () => applyDecorators(
  UseGuards(JwtAuthGuard),
  ApiBearerAuth(),
  ApiUnauthorizedResponse({ description: 'Unauthorized' }),
);
```

#### CurrentUser Decorator
```typescript
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

## Data Transfer Objects (DTOs)

### LoginDto
```typescript
export class LoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}
```

### UserDto
```typescript
export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: string;
}
```

### LoginResponseDto
```typescript
export class LoginResponseDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  token: string;
}
```

### IsUserLoggedResponseDto
```typescript
export class IsUserLoggedResponseDto {
  @ApiProperty()
  isLogged: boolean;

  @ApiProperty({ required: false })
  user?: UserDto;
}
```

## Authentication Flow

```
1. Client Login Request
   POST /auth/login
   Body: { email, password }
   ↓
2. AuthController.login()
   Receives LoginDto
   ↓
3. AuthService.validateUser()
   - Finds user in configured users
   - Verifies password
   - Returns user data (without password)
   ↓
4. AuthService.login()
   - Creates JWT payload
   - Signs token with secret
   - Returns user + token
   ↓
5. Client Stores Token
   - Saves in localStorage/sessionStorage
   - Includes in Authorization header
```

## Usage Examples

### Login Request
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'

# Response:
{
  "user": {
    "id": "1",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Protected Route Access
```bash
curl http://localhost:3000/auth/is-user-logged \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# Response:
{
  "isLogged": true,
  "user": {
    "id": "1",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### Using JwtAuth Decorator
```typescript
@Controller('protected')
export class ProtectedController {
  @Get('data')
  @JwtAuth() // Requires valid JWT token
  async getProtectedData(@CurrentUser() user: UserDto) {
    return {
      message: `Hello ${user.name}`,
      secretData: 'This is protected'
    };
  }
}
```

## Configuration

Users are configured in ConstantService from environment:
```typescript
// src/constant/constant.service.ts
app: {
  users: [
    {
      id: process.env.USER_ID || '1',
      email: process.env.USER_EMAIL || 'admin@example.com',
      password: process.env.USER_PASSWORD || 'password123',
      name: process.env.USER_NAME || 'Admin User',
      role: process.env.USER_ROLE || 'admin',
    },
  ],
}
```

JWT configuration:
```typescript
security: {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
}
```

## Security Considerations

1. **Password Storage**: Currently uses plain text comparison - should use bcrypt in production
2. **JWT Secret**: Must be strong and kept secure
3. **Token Expiration**: Default 24h, adjust based on security requirements
4. **HTTPS**: Always use HTTPS in production to protect tokens
5. **Token Storage**: Consider using httpOnly cookies for better security

## Error Handling

Common errors and responses:
- **401 Unauthorized**: Invalid credentials or missing token
- **400 Bad Request**: Invalid email format or password too short
- **500 Internal Server Error**: Server-side issues

Custom error example:
```typescript
throw UnauthorizedException.USER_NOT_FOUND();
// Returns: { statusCode: 401, message: 'User not found', error: 'Unauthorized' }
```

## Best Practices

1. **Environment Variables**: Store sensitive data in .env file
2. **Token Refresh**: Implement refresh token mechanism for long sessions
3. **Rate Limiting**: Add rate limiting to login endpoint
4. **Audit Logging**: Log authentication attempts
5. **Multi-factor Authentication**: Consider adding MFA for enhanced security