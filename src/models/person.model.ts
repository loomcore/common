import type { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { Type } from "@sinclair/typebox";
import { emailAddressSchema, IEmailAddressModel } from "./email-address.model.js";
import { IPhoneNumberModel, phoneNumberSchema } from "./phone-number.model.js";

export interface IPersonModel extends IEntity, IAuditable {
    externalId: string | null;
    firstName: string;
    middleName: string | null;
    lastName: string;
    emailAddresses: IEmailAddressModel[];
    phoneNumbers: IPhoneNumberModel[];
    isAgent: boolean;
    isClient: boolean;
    isEmployee: boolean;
    dateOfBirth: Date | null;
    extendedTypes: number;
}

export const personSchema = Type.Object({
    externalId: Type.Optional(Type.String()),
    firstName: Type.String(),
    middleName: Type.Optional(Type.String()),
    lastName: Type.String(),
    emailAddresses: Type.Array(emailAddressSchema),
    phoneNumbers: Type.Array(phoneNumberSchema),
    isAgent: Type.Boolean(),
    isClient: Type.Boolean(),
    isEmployee: Type.Boolean(),
    dateOfBirth: Type.Optional(Type.String()),
    extendedTypes: Type.Number(),
});

export const personModelSpec = entityUtils.getModelSpec(personSchema);
