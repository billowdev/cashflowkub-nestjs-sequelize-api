import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('personal financial management system restfulapi')
.setDescription('personal financial management system restfulapi')
.setVersion('1.0')
.addBearerAuth()
.setContact('Akkarapon Phikulsri (BillowDev)', 'billowdev.com', 'lacakira@gmail.com')
.build();