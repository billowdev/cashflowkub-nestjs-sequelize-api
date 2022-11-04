import { Request } from 'express';
import { extname } from 'path';

export const updateFileName = (
	req: Request,
	file: Express.Multer.File,
	callback
) => {
	const user: any = req.user
	const userId =  user?.sub
	const name = file.originalname.split('.')[0];
	const fileExtName = extname(file.originalname);
	// const randomName = Array(4)
	// 	.fill(null)
	// 	.map(() => Math.round(Math.random() * 16).toString(16))
	// 	.join('');
	callback(null, `${userId}-${name}${fileExtName}`);
};