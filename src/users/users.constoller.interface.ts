import { NextFunction, Response, Request } from 'express';

export interface IUserConstoller {
	router(arg0: string, router: any): unknown;
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
}
