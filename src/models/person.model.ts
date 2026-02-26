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

const idSchema = getIdSchema();

export const personSchema = Type.Object({
    _id: idSchema,
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

export const publicPersonSchema = Type.Transform(personSchema)
    .Decode((person) => {
        const shortSsn = person.socialSecurityNumber ? person.socialSecurityNumber.toString().slice(-4) : undefined;
        delete person.socialSecurityNumber;
        return {
            ...person,
            last4ssn: shortSsn,
        };
    })
    .Encode((person) => {
        return person;
    });

export const personModelSpec = entityUtils.getModelSpec(publicPersonSchema, { isAuditable: true });