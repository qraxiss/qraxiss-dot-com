import {
    Controller,
    Post,
    UseGuards,
    Request,
    Body,
    Get,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import {
    UserDto,
    IsUserLoggedResponseDto,
    LoginDto,
    LoginResponseDto,
} from './auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from 'src/auth/auth.decorator';
import { safeRun, SafeRun } from 'src/status/safe-run';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiBody({ type: UserDto })
    @ApiResponse({
        status: 200,
        type: LoginResponseDto,
    })
    async login(@Body() user: UserDto) {
        return await safeRun(
            this.authService.login(user),
            'NewLogin',
            (loginDto) => `${user.email} is logged`
        );
    }

    @JwtAuth()
    @Get('check')
    @ApiResponse({
        status: 200,
        type: IsUserLoggedResponseDto,
    })
    @SafeRun()
    async check(@Request() req) {
        return {
            logged: !!req.user,
        };
    }
}
