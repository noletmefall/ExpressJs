export interface IConfigService {
	get: <T extends string | number>(rey: string) => T;
}
