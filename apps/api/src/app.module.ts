import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConstantModule } from './constant/constant.module';
import { StatusModule } from './status/status.module';
import { ConstantService } from './constant/constant.service';
import { LogsModule } from './logs/logs.module';
import { WebModule } from './web/web.module';
import { FrontendModule } from './frontend/frontend.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (constantsService: ConstantService) => ({
        type: 'mysql',
        host: constantsService.CONSTANTS.DATABASE.HOST,
        port: constantsService.CONSTANTS.DATABASE.PORT,
        username: constantsService.CONSTANTS.DATABASE.USERNAME,
        password: constantsService.CONSTANTS.DATABASE.PASSWORD,
        database: constantsService.CONSTANTS.DATABASE.NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: constantsService.isDevelopment,
        autoLoadEntities: true,
        migrationsTransactionMode: "each"
      }),
      inject: [ConstantService]
    }),
    JwtModule.registerAsync({
      useFactory: (constantService: ConstantService) => ({
        secret: constantService.CONSTANTS.JWT_KEY,
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConstantService]
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    ConstantModule,
    StatusModule,
    LogsModule,
    WebModule,
    FrontendModule
  ],
  controllers: [],
  providers: [ConstantService],
})
export class AppModule {
  constructor() { }
}