import { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { Type } from "@sinclair/typebox";

export interface IPhoneNumberModel extends IEntity, IAuditable {
    phoneNumber: string;
    phoneNumberType: string;
    isDefault: boolean;
}

export const phoneNumberSchema = Type.Object({
    phoneNumber: Type.String(),
    phoneNumberType: Type.String(),
    isDefault: Type.Boolean(),
});

export const phoneNumberModelSpec = entityUtils.getModelSpec(phoneNumberSchema, { isAuditable: true });