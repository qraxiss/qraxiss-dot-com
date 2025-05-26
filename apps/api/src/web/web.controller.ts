import { Controller, Get } from '@nestjs/common';
import { Page } from './page';
import { Res } from '@nestjs/common';

@Controller('web')
export class WebController {
    constructor() { }
    @Get()
    serveApp(@Res() res: Response) {
        return new Page();
    }


    @Get("/home/jobs")
    homeJobs(@Res() res: Response) {
        return new Page();
    }

    @Get("/dashboards/sales")
    dashboardsSales() {
        return new Page();
    }
}
