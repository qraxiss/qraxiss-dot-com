import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ResponseDto } from 'src/status/response.dto';

export class LogResponseDto extends ResponseDto {
    @ApiProperty({
        type: [String],
    })
    @IsArray()
    data: string[];
}
