import { Type } from '@sinclair/typebox';
import { SortDirection } from '../types/sort-direction.type.js';
import { entityUtils } from '../utils/entity.utils.js';

/**
 * Allows reading the filters object in the query options.
 * 
 * @example in query string:
 * filters[name][contains]=burk
 */
export type Filter = {
	eq?: string | number | boolean | Date;	// e.g. filters[uniqEntity][eq]=70308
	ne?: string | number | boolean | Date;
	any?: string[] | number[];
	all?: string[] | number[];
	lt?: number | Date;
	lte?: number | Date;
	gt?: number | Date;
	gte?: number | Date;
	startsWith?: string;
	endsWith?: string;
	contains?: string;
	in?: string[] | number[] | Date[]; 			// e.g. filters[clientId][in]=101,102,104
};

/**
 * TypeBox schema for Filter
 */
export const FilterSchema = Type.Object({
	eq: Type.Optional(Type.Union([Type.String(), Type.Number(), Type.Boolean(), Type.Date()])),
	ne: Type.Optional(Type.Union([Type.String(), Type.Number(), Type.Boolean(), Type.Date()])),
	any: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Array(Type.Number())])),
	all: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Array(Type.Number())])),
	lt: Type.Optional(Type.Union([Type.Number(), Type.Date()])),
	lte: Type.Optional(Type.Union([Type.Number(), Type.Date()])),
	gt: Type.Optional(Type.Union([Type.Number(), Type.Date()])),
	gte: Type.Optional(Type.Union([Type.Number(), Type.Date()])),
	startsWith: Type.Optional(Type.String()),
	endsWith: Type.Optional(Type.String()),
	contains: Type.Optional(Type.String()),
	in: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Array(Type.Number()), Type.Array(Type.Date())])),
});

export interface IQueryOptions {
	orderBy?: string;
	sortDirection?: SortDirection;
	page?: number;
	pageSize?: number;
	/** This is an index signature that indicates the keys of the filters object are strings, and the values
	 * are of type Filter */
	filters?: { [key: string]: Filter };
}

/**
 * TypeBox schema for QueryOptions
 */
export const QueryOptionsSchema = Type.Object({
	orderBy: Type.Optional(Type.String({ title: 'Order By' })),
	sortDirection: Type.Optional(Type.Union([
		Type.Literal(1),
		Type.Literal(-1),
		Type.Literal('asc'),
		Type.Literal('desc'),
		Type.Literal('ascending'),
		Type.Literal('descending'),
		Type.Object({ $meta: Type.String() })
	], { title: 'Sort Direction' })),
	page: Type.Optional(Type.Number({ title: 'Page', minimum: 1 })),
	pageSize: Type.Optional(Type.Number({ title: 'Page Size', minimum: 1, maximum: 1000 })),
	filters: Type.Optional(Type.Record(Type.String(), FilterSchema, { title: 'Filters' })),
});

/**
 * Model spec for QueryOptions
 */
export const QueryOptionsSpec = entityUtils.getModelSpec(QueryOptionsSchema);

/**
 * Default query options that match the old QueryOptions class defaults
 */
export const DefaultQueryOptions: IQueryOptions = {
	sortDirection: 'asc',
	page: 1,
	pageSize: 10,
}

