import { Type } from "@sinclair/typebox";
import type { AppIdType } from "../types/app.types.js";
import { entityUtils } from "../utils/entity.utils.js";
import { getIdSchema, TypeboxIsoDate } from "../validation/index.js";
import type { IAuditable } from "./auditable.model.js";
import type { IEntity } from "./entity.model.js";

export interface IAuthorization extends IEntity, IAuditable {
    roleId: AppIdType;
    featureId: AppIdType;
    startDate?: Date;
    endDate?: Date;
    config?: any;
}
const idSchema = getIdSchema();
export const AuthorizationSchema = Type.Object({
    roleId: idSchema,
    featureId: idSchema,
    startDate: Type.Optional(TypeboxIsoDate({ title: 'Start Date' })),
    endDate: Type.Optional(TypeboxIsoDate({ title: 'End Date' })),
    config: Type.Optional(Type.Any({ title: 'Config' }))
});

export const AuthorizationModelSpec = entityUtils.getModelSpec(AuthorizationSchema, { isAuditable: true });
