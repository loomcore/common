import { Type } from '@sinclair/typebox';

export interface IEntity {
  _id: string;
  _orgId?: string;
}

/**
 * Schema definition for the IEntity interface to be used in validation and cleaning
 */
export const EntitySchema = Type.Object({
  _id: Type.String({ title: 'ID' }),
  _orgId: Type.Optional(Type.String({ title: 'Organization ID' }))
});



