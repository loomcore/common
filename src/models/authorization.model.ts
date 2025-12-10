import { Type } from "@sinclair/typebox";
import { IAuditable, IEntity } from "./index.js";
import { entityUtils } from "../utils/index.js";

export interface IAuthorization extends IEntity, IAuditable {
    feature: string;
    config?: object;
}

export const authorizationSchema = Type.Object({
    feature: Type.String({ minLength: 1 }),
    config: Type.Optional(Type.Object({}))
});

export const authorizationModelSpec = entityUtils.getModelSpec(authorizationSchema, { isAuditable: true });

export const publicAuthorizationSchema = Type.Omit(
    authorizationModelSpec.fullSchema,
    ['_id', '_orgId', '_created', '_createdBy', '_updated', '_updatedBy']);
