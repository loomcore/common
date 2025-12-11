import { Type } from "@sinclair/typebox";
import { IAuditable, IEntity } from "./index.js";
import { entityUtils } from "../utils/index.js";

export interface IAuthorization extends IEntity, IAuditable {
    feature: string;
    config?: object;
}

export const AuthorizationSchema = Type.Object({
    feature: Type.String({ minLength: 1 }),
    config: Type.Optional(Type.Object({}))
});

export const AuthorizationModelSpec = entityUtils.getModelSpec(AuthorizationSchema, { isAuditable: true });

export const PublicAuthorizationSchema = Type.Object({
    feature: Type.String({ minLength: 1 }),
    config: Type.Optional(Type.Object({}))
});

export const PublicAuthorizationSpec = entityUtils.getModelSpec(PublicAuthorizationSchema);