import { TSchema, Type } from "@sinclair/typebox";
import type { AppIdType } from "../types/app.types.js";
import { entityUtils } from "../utils/entity.utils.js";
import { getIdSchema } from "../validation/typebox-extensions.js";
import type { IAuditable } from "./auditable.model.js";
import type { IEntity } from "./entity.model.js";

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
