import type { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { Type } from "@sinclair/typebox";

export interface IPersonModel extends IEntity, IAuditable {
    externalId?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    isAgent: boolean;
    isClient: boolean;
    isEmployee: boolean;
    dateOfBirth?: Date;
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
    dateOfBirth: Type.Optional(Type.String()),
    extendedTypes: Type.Optional(Type.Number()),
});

export const personModelSpec = entityUtils.getModelSpec(personSchema, { isAuditable: true });