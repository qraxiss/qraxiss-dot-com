import { Controller, Get, Param } from '@nestjs/common';
import * as fs from 'fs';
import * as readline from 'readline';
import { safeRun } from 'src/status/safe-run';
import { promisify } from 'util';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuth } from 'src/auth/auth.decorator';
import { LogResponseDto } from './log.dto';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
    @JwtAuth()
    @Get('error/:lines')
    @ApiParam({
        name: 'lines',
        type: Number,
        description: 'Number of error log lines to retrieve',
    })
    @ApiResponse({
        status: 200,
        type: LogResponseDto,
    })
    async getErrorLogs(@Param('lines') lines: number) {
        return await safeRun(this.readLastLines('src/logs/app-err.log', lines));
    }

    @JwtAuth()
    @Get('output/:lines')
    @ApiParam({
        name: 'lines',
        type: Number,
        description: 'Number of output log lines to retrieve',
    })
    @ApiResponse({
        status: 200,
        type: LogResponseDto,
    })
    async getOutputLogs(@Param('lines') lines: number) {
        return await safeRun(this.readLastLines('src/logs/app-out.log', lines));
    }

    private async readLastLines(
        filePath: string,
        lines: number
    ): Promise<string[]> {
        const fileExists = promisify(fs.exists);
        if (!(await fileExists(filePath))) {
            return [];
        }

        const logLines = [];
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            logLines.push(line);
            if (logLines.length > lines) {
                logLines.shift();
            }
        }

        return logLines;
    }
}
