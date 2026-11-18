import { Type } from "@sinclair/typebox";
import { TSchema } from "@sinclair/typebox";
import { entityUtils } from "../utils/entity.utils.js";
import type { IEntity } from "./entity.model.js";

export interface IRole extends IEntity {
    name: string;
}

export const RoleSchema: TSchema = Type.Object({
    name: Type.String({ minLength: 1 }),
});

export const RoleModelSpec = entityUtils.getModelSpec(RoleSchema);
