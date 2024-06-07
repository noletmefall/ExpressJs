import { ConfigService } from './config/config.service';
import { ILogger } from './logger/logger.interface';
import { UserService } from './users/user.service';
import { UserController } from './users/users.controller';

export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
};
