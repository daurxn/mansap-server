"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'https://mansap.vercel.app',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mansap')
        .setDescription('Mansap API description')
        .setVersion('1.0')
        .addTag('mansap')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((error) => {
    console.error('Error during bootstrap:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map