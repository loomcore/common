import { Type } from '@sinclair/typebox';
import { AppId } from '../types/app.types.js';
import { getIdSchema, TypeboxIsoDate } from '../validation/index.js';

export interface IAuditable {
  _created: Date;
  _createdBy: AppId;
  _updated: Date;
  _updatedBy: AppId;
  _deleted?: Date;
  _deletedBy?: AppId;
}

/**
 * Schema definition for the IAuditable interface to be used in validation and cleaning
 */
const idSchema = getIdSchema();
export const AuditableSchema = Type.Object({
  _created: TypeboxIsoDate(),
  _createdBy: idSchema,
  _updated: TypeboxIsoDate(),
  _updatedBy: idSchema,
  _deleted: Type.Optional(TypeboxIsoDate()),
  _deletedBy: Type.Optional(idSchema),
});
