import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { ConstantService } from 'src/constant/constant.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const constantService = app.get(ConstantService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .addServer(constantService.appUrl)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'AdminKey',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.listen(constantService.CONSTANTS.APP.PORT);
}

bootstrap();