import { Container, ContainerModule, interfaces } from 'inversify';
import { ExeptionFilter } from '../errors/exeption.filter';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExeptionFilter } from '../errors/exeption.filter.interface';
import { UserService } from './users/user.service';
import { IUserConstoller } from './users/users.constoller.interface';
import { IUserService } from './users/users.service.inerface';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

export interface IBootsrapReturn {
	appConteiner: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserConstoller>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootsrapReturn {
	const appConteiner = new Container();
	appConteiner.load(appBindings);
	const app = appConteiner.get<App>(TYPES.Application);
	app.init();
	return { appConteiner, app };
}

export const { app, appConteiner } = bootstrap();
