
import { Type } from '@sinclair/typebox';
import { AppId } from '../types/app.types.js';
import { getIdSchema } from '../validation/typebox-extensions.js';

export interface IEntity {
  _id: AppId;
  _orgId?: AppId;
}

/**
 * A TypeBox schema for the IEntity interface.
 * The schema for the _id and _orgId properties is provided by the host application at build time.
 */
const idSchema = getIdSchema();
export const EntitySchema = Type.Object({
  _id: idSchema,
  _orgId: Type.Optional(Type.Unsafe({ ...idSchema, title: 'Organization ID' }))
});
