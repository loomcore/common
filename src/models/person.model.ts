import type { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { Type } from "@sinclair/typebox";
import { getIdSchema, TypeboxIsoDate } from "../validation/typebox-extensions.js";

export interface IPersonModel extends IEntity, IAuditable {
    externalId?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    isAgent: boolean;
    isClient: boolean;
    isEmployee: boolean;
    dateOfBirth?: Date;
    socialSecurityNumber?: number;
    extendedTypes?: number;
}

export const personSchema = Type.Object({
    externalId: Type.Optional(Type.String()),
    firstName: Type.String(),
    middleName: Type.Optional(Type.String()),
    lastName: Type.String(),
    isAgent: Type.Boolean(),
    isClient: Type.Boolean(),
    isEmployee: Type.Boolean(),
    dateOfBirth: Type.Optional(TypeboxIsoDate({ title: 'Date of Birth' })),
    socialSecurityNumber: Type.Optional(Type.Number()),
    extendedTypes: Type.Optional(Type.Number()),
});

export const personPublicSchema = Type.Intersect([
    Type.Omit(personSchema, ['socialSecurityNumber']),
    Type.Object({
        last4ssn: Type.Optional(Type.String()),
    }),
]);

export const personModelSpec = entityUtils.getModelSpec(personPublicSchema, { isAuditable: true });