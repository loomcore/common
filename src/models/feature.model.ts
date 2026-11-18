import { TSchema, Type } from "@sinclair/typebox";
import { entityUtils } from "../utils/entity.utils.js";
import type { IEntity } from "./entity.model.js";

export interface IFeature extends IEntity {
    name: string;
}

export const FeatureSchema: TSchema = Type.Object({
    name: Type.String({ minLength: 1 }),
});

export const FeatureModelSpec = entityUtils.getModelSpec(FeatureSchema);
