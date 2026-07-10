import { Type } from "@sinclair/typebox";
import type { AppIdType } from "../types/app.types.js";
import { entityUtils } from "../utils/index.js";
import { getIdSchema } from "../validation/index.js";
import type { IAuditable } from "./auditable.model.js";

export interface IOrganization extends IAuditable {
	_id: AppIdType;
	name: string;
	code?: string;
	description?: string;
	status: number;
	isMetaOrg: boolean;
	authToken?: string;
}

const idSchema = getIdSchema();

// Organization-specific properties schema
export const OrganizationSchema = Type.Object({
	_id: idSchema,
	name: Type.String({
		title: "Name",
	}),
	code: Type.Optional(
		Type.String({
			title: "Code",
		}),
	),
	description: Type.Optional(
		Type.String({
			title: "Description",
		}),
	),
	status: Type.Number({
		title: "Status",
	}),
	isMetaOrg: Type.Boolean({
		title: "Is Meta Organization",
		default: false,
	}),
	authToken: Type.Optional(
		Type.String({
			title: "Authentication Token",
		}),
	),
});

// Create the model spec with auditable properties
export const OrganizationSpec = entityUtils.getModelSpec(OrganizationSchema, {
	isAuditable: true,
	isEntity: false,
});
