import { Type } from "@sinclair/typebox";
import type { AppIdType } from "../types/app.types.js";
import { entityUtils } from "../utils/index.js";
import { getIdSchema } from "../validation/index.js";
import type { IAuditable } from "./auditable.model.js";

export interface IOrganizationDomain extends IAuditable {
	_id: AppIdType;
	domain: string;
	organizationId: AppIdType;
}

const idSchema = getIdSchema();

export const OrganizationDomainSchema = Type.Object({
	_id: idSchema,
	domain: Type.String({
		title: "Domain",
	}),
	organizationId: idSchema,
});

export const OrganizationDomainSpec = entityUtils.getModelSpec(
	OrganizationDomainSchema,
	{
		isEntity: false,
		isAuditable: true,
	},
);
