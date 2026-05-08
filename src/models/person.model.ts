import type { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { Type } from "@sinclair/typebox";
import { TypeboxIsoDate } from "../validation/typebox-extensions.js";

export interface IPersonModel extends IEntity, IAuditable {
    externalId?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    isAgent: boolean;
    isClient: boolean;
    isEmployee: boolean;
    dateOfBirth?: Date;
    // Social Security Number
    // Note: this is a string because a ssn can begin with a zero
    ssn?: string;
    extendedTypes?: number;
}

export const privatePersonSchema = Type.Object({
    externalId: Type.Optional(Type.String()),
    firstName: Type.String(),
    middleName: Type.Optional(Type.String()),
    lastName: Type.String(),
    isAgent: Type.Boolean(),
    isClient: Type.Boolean(),
    isEmployee: Type.Boolean(),
    dateOfBirth: Type.Optional(TypeboxIsoDate({ title: 'Date of Birth' })),
    ssn: Type.Optional(Type.String()),
    extendedTypes: Type.Optional(Type.Number()),
});

export const personSchema = Type.Intersect([
    Type.Omit(privatePersonSchema, ['ssn']),
    Type.Object({
        last4ssn: Type.Optional(Type.String()),
    }),
]);

export const personModelSpec = entityUtils.getModelSpec(personSchema, { isAuditable: true });

export const privatePersonModelSpec = entityUtils.getModelSpec(privatePersonSchema, { isAuditable: true });