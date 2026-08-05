import { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { TSchema, Type } from "@sinclair/typebox";
import { AppIdType } from "../types/app.types.js";
import { getIdSchema } from "../validation/typebox-extensions.js";

export interface IUserRole extends IEntity, IAuditable {
    userId: AppIdType;
    roleId: AppIdType;
}
const idSchema = getIdSchema();

export const UserRoleSchema: TSchema = Type.Object({
    userId: idSchema,
    roleId: idSchema,
});

export const UserRoleModelSpec = entityUtils.getModelSpec(UserRoleSchema, { isAuditable: true });