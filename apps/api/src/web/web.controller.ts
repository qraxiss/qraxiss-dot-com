import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('web')
export class WebController {
    @Get('*')
    serveApp(@Res() res: Response) {
        res.sendFile(join(process.cwd(), '../web/dist'));
    }
}
