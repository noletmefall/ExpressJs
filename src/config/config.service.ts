import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IConfigService } from './config.service.interface';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Не удалось прочитать файл .env или он отсутствует');
		} else {
			this.logger.log('Конфигурация .env загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T extends number | string>(key: string): T {
		return this.config[key] as T;
	}
}
