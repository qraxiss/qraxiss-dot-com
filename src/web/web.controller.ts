import { Controller, Get, Req } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Page } from './page';
import { FastifyRequest } from 'fastify';

@Controller('web')
export class WebController {
    @ApiExcludeEndpoint()
    @Get()
    serveApp() {
        return new Page();
    }

    // Home routes
    @ApiExcludeEndpoint()
    @Get('home/jobs')
    homeJobs() {
        return new Page({ data: 31 });
    }

    // Dashboard routes
    @ApiExcludeEndpoint()
    @Get('dashboards/sales')
    dashboardsSales() {
        return new Page({ data: { salesAmount: 15000 } });
    }

    @ApiExcludeEndpoint()
    @Get('dashboards/orders')
    dashboardsOrders() {
        return new Page({ data: { ordersCount: 245 } });
    }

    // Apps routes
    @ApiExcludeEndpoint()
    @Get('apps/chat')
    appsChat() {
        return new Page();
    }

    @ApiExcludeEndpoint()
    @Get('apps/kanban')
    appsKanban() {
        return new Page();
    }

    // Forms routes
    @ApiExcludeEndpoint()
    @Get('forms/new-post-form')
    formsNewPost() {
        return new Page();
    }

    // Components routes
    @ApiExcludeEndpoint()
    @Get('components/:component')
    components() {
        return new Page();
    }

    // Tables routes
    @ApiExcludeEndpoint()
    @Get('tables/:table')
    tables() {
        return new Page();
    }

    // Prototypes routes
    @ApiExcludeEndpoint()
    @Get('prototypes/:prototype')
    prototypes() {
        return new Page();
    }

    // Docs routes
    @ApiExcludeEndpoint()
    @Get('docs')
    docsRoot() {
        return new Page();
    }

    @ApiExcludeEndpoint()
    @Get('docs/*')
    docs() {
        return new Page();
    }

    // Logs routes
    @ApiExcludeEndpoint()
    @Get('logs/:type')
    logs() {
        return new Page();
    }

    // Settings routes
    @ApiExcludeEndpoint()
    @Get('settings')
    settingsRoot() {
        return new Page();
    }

    @ApiExcludeEndpoint()
    @Get('settings/*')
    settings() {
        return new Page();
    }

    // Auth route
    @ApiExcludeEndpoint()
    @Get('Auth')
    auth() {
        return new Page();
    }

    // Catch-all route - en sonda olmalı
    @ApiExcludeEndpoint()
    @Get('*')
    catchAll(@Req() req: FastifyRequest) {
        console.log(`[WebController] Serving page for: ${req.url}`);
        return new Page();
    }
}
