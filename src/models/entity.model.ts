
import { Type } from '@sinclair/typebox';
import { AppId } from '../types/app.types.js';
import { IdSchema } from '../validation/id-schema.provider.js';

export interface IEntity {
  _id: AppId;
  _orgId?: AppId;
}

/**
 * A TypeBox schema for the IEntity interface.
 * The schema for the _id and _orgId properties is provided by the host application at build time.
 */
export const EntitySchema = Type.Object({
  _id: IdSchema,
  _orgId: Type.Optional(Type.Unsafe({ ...IdSchema, title: 'Organization ID' }))
});
