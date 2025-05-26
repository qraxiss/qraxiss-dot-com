import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WebController } from './web.controller';

@Module({
  // imports: [
  //   ServeStaticModule.forRoot({
  //     rootPath: join(process.cwd(), '../web/dist'),
  //     exclude: ['/api*'],
  //     serveRoot: '/web',
  //   }),
  // ],
  // controllers: [WebController],
})
export class WebModule { }
