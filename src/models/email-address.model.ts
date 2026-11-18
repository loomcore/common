import { Type } from "@sinclair/typebox";
import type { AppIdType } from "../types/app.types.js";
import { entityUtils } from "../utils/entity.utils.js";
import { getIdSchema } from "../validation/index.js";
import type { IAuditable } from "./auditable.model.js";
import type { IEntity } from "./entity.model.js";

export interface IEmailAddress extends IEntity, IAuditable {
    personId: AppIdType;
    emailAddress: string;
    emailAddressType: string;
    isDefault: boolean;
}
const idSchema = getIdSchema();
export const emailAddressSchema = Type.Object({
    _id: Type.Optional(idSchema),
    personId: idSchema,
    emailAddress: Type.String(),
    emailAddressType: Type.String(),
    isDefault: Type.Boolean(),
});

export const emailAddressModelSpec = entityUtils.getModelSpec(
    emailAddressSchema,
    { isAuditable: true },
);
