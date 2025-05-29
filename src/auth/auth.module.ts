import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ConstantModule } from 'src/constant/constant.module';
import { ConstantService } from 'src/constant/constant.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtService, JwtStrategy, ConstantService],
    imports: [ConstantModule],
})
export class AuthModule {}
