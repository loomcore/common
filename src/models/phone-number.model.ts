import { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { Type } from "@sinclair/typebox";
import { getIdSchema } from "../validation/index.js";

export interface IPhoneNumberModel extends IEntity, IAuditable {
    phoneNumber: string;
    phoneNumberType: string;
    isDefault: boolean;
}

const idSchema = getIdSchema();
export const phoneNumberSchema = Type.Object({
    _id: idSchema,
    phoneNumber: Type.String(),
    phoneNumberType: Type.String(),
    isDefault: Type.Boolean(),
});

export const phoneNumberModelSpec = entityUtils.getModelSpec(phoneNumberSchema, { isAuditable: true });