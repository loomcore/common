import {IError} from './error.interface.js';

export type IApiResponse<T> = {
	success?: boolean;
	status?: number;
	errors?: IError[];
	messages?: string[];
	data?: T | null;
};
