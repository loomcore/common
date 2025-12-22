import { Type } from '@sinclair/typebox';

export interface IEntity {
  // Postgres uses numbers for ids, MongoDB uses strings
  //  If this becomes problematic, we will need to split the implementation in an intelligent way.
  _id: string | number;
  _orgId?: string | number;
}

/**
 * Schema definition for the IEntity interface to be used in validation and cleaning
 */
export const EntitySchema = Type.Object({
  _id: Type.Union([Type.String({ title: 'ID' }), Type.Number({ title: 'ID' })]),
  _orgId: Type.Optional(Type.Union([Type.String({ title: 'Organization ID' }), Type.Number({ title: 'Organization ID' })]))
});
