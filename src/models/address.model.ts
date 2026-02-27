import { Type } from "@sinclair/typebox";
import { getIdSchema } from "../validation/index.js";
import { IAuditable, IEntity } from "./index.js";
import { entityUtils } from "../utils/entity.utils.js";

export interface IAddressModel extends IEntity, IAuditable {
	address1?: string;
	address2?: string;
	address3?: string;
	city?: string;
	state?: string;
	postalCode?: string;
	countryCode?: string;
	description?: string;
	formattedAddress?: string;
}

export const addressSchema = Type.Object({
	address1: Type.Optional(Type.String()),
	address2: Type.Optional(Type.String()),
	address3: Type.Optional(Type.String()),
	city: Type.Optional(Type.String()),
	state: Type.Optional(Type.String()),
	postalCode: Type.Optional(Type.String()),
	countryCode: Type.Optional(Type.String()),
	description: Type.Optional(Type.String()),
	formattedAddress: Type.Optional(Type.String()),
});


export const addressModelSpec = entityUtils.getModelSpec(addressSchema, { isAuditable: true });