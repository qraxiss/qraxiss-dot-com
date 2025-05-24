import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { ResponseDto } from 'src/status/response.dto';

export class UserDto {
    @ApiProperty({
        example: 'user@mail.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123!',
    })
    @IsString()
    password: string;
}

export class LoginDto {
    @ApiProperty({ type: String })
    @IsString()
    access_token: string
}

export class IsUserLoggedDto {
    @IsBoolean()
    @ApiProperty({ type: Boolean })
    logged: boolean
}

export class IsUserLoggedResponseDto extends ResponseDto {
    @ApiProperty({ type: IsUserLoggedDto })
    @IsObject()
    @IsOptional()
    data: IsUserLoggedDto | null
}

export class LoginResponseDto extends ResponseDto {
    @ApiProperty({ type: LoginDto })
    @IsObject()
    @IsOptional()
    data: LoginDto | null
}