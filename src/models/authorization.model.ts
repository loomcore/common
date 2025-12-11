import { Type } from "@sinclair/typebox";
import { IAuditable, IEntity } from "./index.js";
import { entityUtils } from "../utils/index.js";

export interface IAuthorization extends IEntity, IAuditable {
    role: string;
    feature: string;
    config?: any;
}

export const AuthorizationSchema = Type.Object({
    role: Type.String({ minLength: 1 }),
    feature: Type.String({ minLength: 1 }),
    config: Type.Optional(Type.Any())
});

export const AuthorizationModelSpec = entityUtils.getModelSpec(AuthorizationSchema, { isAuditable: true });