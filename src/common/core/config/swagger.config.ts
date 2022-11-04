import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Cashflowkub restful api')
.setDescription('The personal financial management system restful api cashflowkub')
.setVersion('0.2')
.addBearerAuth()
.setContact('Akkarapon Phikulsri (BillowDev)', 'https://www.billowdev.com', 'lacakira@gmail.com')
.build();