import { Type } from "@sinclair/typebox";
import { IAuditable, IEntity } from "@loomcore/common/models";
import { entityUtils } from "@loomcore/common/utils";
import { getIdSchema, TypeboxIsoDate } from "@loomcore/common/validation";
import { AppIdType } from "../types/app.types.js";

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