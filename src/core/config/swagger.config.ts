import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Cashflowkub-api')
.setDescription('The personal financial management system restful api cashflowkub')
.setVersion('0.1')
.addBearerAuth()
.setContact('Akkarapon Phikulsri (BillowDev)', 'https://www.billowdev.com', 'lacakira@gmail.com')
.build();