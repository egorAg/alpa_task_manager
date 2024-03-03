import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  /*
   * Create application instance by using nestjs factory
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*
   * Get instance of nestjs config service
   */
  const configService = app.get(ConfigService);

  /*
   * Get application port (8080 as default)
   */
  const PORT = configService.get<string>('PORT') || 8080;

  /*
   * Use versioning in application
   * Required at @Controller({ version: 1 })
   */
  const APP_ROUTE_PREFIX = 'api';
  const version = configService.getOrThrow<string>('API_VERSION');

  app
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
    })
    .setGlobalPrefix(APP_ROUTE_PREFIX);

  /*
   * Enable CORS and allow all origins
   */
  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST'],
  });

  /*
   * Set OpenAPI spec, set swagger
   */
  const openApiConfig = new DocumentBuilder()
    .setTitle('Alpa task manager API')
    .setDescription('This API provides basic user and task functionality')
    .setVersion('1.0')
    // add bearer auth for secure endpoints
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup(
    `${APP_ROUTE_PREFIX}/:version/explorer`,
    app,
    swaggerDocument,
    {
      customSiteTitle: 'Task-manager API',
      swaggerOptions: {
        // hide 'Schemas' section at swagger
        defaultModelsExpandDepth: -1,
      },
    },
  );

  /*
   * Use custom logging interceptor
   */
  app.useGlobalInterceptors(new LoggingInterceptor());

  /*
   * Start service
   */
  await app
    .listen(PORT)
    .then(() => {
      logger.debug(`Service running on port ${PORT}`);
    })
    .catch((e) => {
      logger.error('Unexpected error on service bootstrap', e.message);
    });
}
bootstrap();
