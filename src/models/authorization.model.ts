import { Type } from "@sinclair/typebox";
import { IAuditable, IEntity } from "./index.js";
import { entityUtils } from "../utils/index.js";
import { TypeboxIsoDate } from "../validation/index.js";

export interface IAuthorizationIn extends IEntity, IAuditable {
    roleId: string;
    featureId: string;
    startDate?: Date;
    endDate?: Date;
    config?: any;
}

export const AuthorizationSchema = Type.Object({
    roleId: Type.String({ minLength: 1, title: 'Role ID' }),
    featureId: Type.String({ minLength: 1, title: 'Feature ID' }),
    startDate: Type.Optional(TypeboxIsoDate({ title: 'Start Date' })),
    endDate: Type.Optional(TypeboxIsoDate({ title: 'End Date' })),
    config: Type.Optional(Type.Any({ title: 'Config' }))
});

export const AuthorizationModelSpec = entityUtils.getModelSpec(AuthorizationSchema, { isAuditable: true });

export interface IAuthorizationOut extends IEntity {
    role: string;
    feature: string;
    config?: any;
}

export const PublicAuthorizationSchema = Type.Object({
    role: Type.String({ minLength: 1, title: 'Role Name' }),
    feature: Type.String({ minLength: 1, title: 'Feature Name' }),
    config: Type.Optional(Type.Any({ title: 'Config' }))
});

export const PublicAuthorizationModelSpec = entityUtils.getModelSpec(PublicAuthorizationSchema);