import { Type } from "@sinclair/typebox";
import { IEntity } from "./entity.model.js";
import { entityUtils } from "../utils/entity.utils.js";

export interface IUserContextAuthorization extends IEntity {
    role: string;
    feature: string;
    config?: any;
}

export const UserContextAuthorizationSchema = Type.Object({
    role: Type.String(),
    feature: Type.String(),
    config: Type.Optional(Type.Any())
});

export const UserContextAuthorizationSpec = entityUtils.getModelSpec(UserContextAuthorizationSchema);