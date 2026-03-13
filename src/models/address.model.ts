import { Type } from "@sinclair/typebox";
import { getIdSchema } from "../validation/index.js";
import { IAuditable, IEntity } from "./index.js";
import { entityUtils } from "../utils/entity.utils.js";

export interface IAddressModel extends IEntity, IAuditable {
	addressLine1?: string;
	addressLine2?: string;
	addressLine3?: string;
	city?: string;
	state?: string;
	postalCode?: string;
	countryCode?: string;
	description?: string;
	formattedAddress?: string;
}

export const addressSchema = Type.Object({
	addressLine1: Type.Optional(Type.String()),
	addressLine2: Type.Optional(Type.String()),
	addressLine3: Type.Optional(Type.String()),
	city: Type.Optional(Type.String()),
	state: Type.Optional(Type.String()),
	postalCode: Type.Optional(Type.String()),
	countryCode: Type.Optional(Type.String()),
	description: Type.Optional(Type.String()),
	formattedAddress: Type.Optional(Type.String()),
});


export const addressModelSpec = entityUtils.getModelSpec(addressSchema, { isAuditable: true });