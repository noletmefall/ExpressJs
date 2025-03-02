import { Response, Router } from 'express';
import 'reflect-metadata';
import { ExpressReturnType, IContollerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
export { Router } from 'express';

@injectable()
export abstract class BaseConstoller {
	private readonly _router: Router;
	middleware: any;
	constructor(private logger: ILogger) {
		this._router = Router();
	}
	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(200).json(message);
	}
	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IContollerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middleware = route.middleware?.map((m: { execute: { bind: (arg0: any) => any } }) =>
				m.execute.bind(m),
			);
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
