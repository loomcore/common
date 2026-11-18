import { Type } from "@sinclair/typebox";
import type { AppIdType } from "../types/app.types.js";
import { entityUtils } from "../utils/entity.utils.js";
import { getIdSchema, TypeboxIsoDate } from "../validation/index.js";
import type { IEntity } from "./entity.model.js";

export interface IRefreshToken extends IEntity {
	token: string;
	deviceId: string;
	userId: AppIdType;
	expiresOn: number;
	created: Date;
	createdBy: AppIdType;
}

export const refreshTokenSchema = Type.Object({
	token: Type.String({ minLength: 1 }),
	deviceId: Type.String({ minLength: 1 }),
	userId: getIdSchema(),
	expiresOn: Type.Number(),
	created: TypeboxIsoDate({ title: "Created Date" }),
	createdBy: getIdSchema(),
});

export const refreshTokenModelSpec =
	entityUtils.getModelSpec(refreshTokenSchema);
