import { Type } from "@sinclair/typebox";
import { entityUtils } from "../utils/entity.utils.js";
import { getIdSchema } from "../validation/index.js";
import type { IAuditable } from "./auditable.model.js";
import type { IEntity } from "./entity.model.js";

export interface IPhoneNumber extends IEntity, IAuditable {
    phoneNumber: string;
    phoneNumberType: string;
    isDefault: boolean;
}

const idSchema = getIdSchema();
export const phoneNumberSchema = Type.Object({
    _id: Type.Optional(idSchema),
    phoneNumber: Type.String(),
    phoneNumberType: Type.String(),
    isDefault: Type.Boolean(),
});

export const phoneNumberModelSpec = entityUtils.getModelSpec(phoneNumberSchema, { isAuditable: true });
