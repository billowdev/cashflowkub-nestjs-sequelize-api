import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('natural indigo tone server')
.setDescription('The example project nestjs with sequelize swagger')
.setVersion('1.0')
.addTag('natural indigo tone server')
.addBearerAuth()
.setContact('GitHub-Repository', 'https://github.com/billowdev/natural-indigo-tone', '')
.build();