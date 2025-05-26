import { Controller, Get } from '@nestjs/common';
import { Page } from './page';

@Controller('web')
export class FrontendController {
    constructor() { }

    @Get()
    index() {
        return new Page({ name: '31' });
    }

    @Get('/about')
    about() {
        return new Page();
    }

    @Get('/api/users')
    api() {
        return {
            id: '123',
        };
    }
}
