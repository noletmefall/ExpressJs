import { NextFunction, Request, Response } from 'express';
import { BaseConstoller } from '../commom/base.controller';
import { HTTPError } from '../../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserConstoller } from './users.constoller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from './user.service';
import { IUserService } from './users.service.inerface';
import { ValidateMiddleware } from '../commom/validate.middleware';

@injectable()
export class UserController extends BaseConstoller implements IUserConstoller {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: '/login', method: 'post', func: this.login },
		]);
	}
	login(req: Request<{}, {}, UserLoginDto>, _res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'ошибка авторизации', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		_next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return _next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, { email: result.email });
	}
}
