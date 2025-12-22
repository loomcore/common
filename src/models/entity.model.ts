import { TSchema, TString, TNumber, Type } from '@sinclair/typebox';

export interface IEntity<TId extends string | number = string> {
  _id: TId;
  _orgId?: TId;
}

/**
 * Schema definition for the IEntity interface to be used in validation and cleaning
 */
export let EntitySchema: TSchema;

export const createEntitySchema = (idType: TString | TNumber) => {
  const orgIdType = idType.kind === 'String'
    ? Type.String({ ...idType, title: 'Organization ID' })
    : Type.Number({ ...idType, title: 'Organization ID' });

  EntitySchema = Type.Object({
    _id: idType,
    _orgId: Type.Optional(orgIdType)
  });

  return EntitySchema;
}
