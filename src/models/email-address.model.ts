import type { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { Type } from "@sinclair/typebox";
import { AppIdType } from "../types/app.types.js";
import { getIdSchema } from "../validation/index.js";

export interface IEmailAddressModel extends IEntity, IAuditable {
    personId: AppIdType;
    emailAddress: string;
    emailAddressType: string;
    isDefault: boolean;
}
const idSchema = getIdSchema();
export const emailAddressSchema = Type.Object({
    _id: idSchema,
    personId: idSchema,
    emailAddress: Type.String(),
    emailAddressType: Type.String(),
    isDefault: Type.Boolean(),
});

export const emailAddressModelSpec = entityUtils.getModelSpec(
    emailAddressSchema,
    { isAuditable: true },
);
