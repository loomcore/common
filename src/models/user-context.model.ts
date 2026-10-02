import { Type } from "@sinclair/typebox";
import { entityUtils } from "../utils/entity.utils.js";
import { type IOrganization } from "./organization.model.js";
import { type IUser, PublicUserSpec, UserSpec } from "./user.model.js";

export interface IUserContext {
	user: IUser;
	features: string[];
	impersonatorId?: AppIdType;
}

export const EmptyUserContext: IUserContext = {
	user: {} as IUser,
	features: [],
	impersonatorId: undefined,
};

let _systemUserContext: IUserContext | null = null;

const idSchema = getIdSchema();
export const UserContextSchema = Type.Object({
	user: UserSpec.fullSchema,
	features: Type.Array(Type.String()),
	impersonatorId: Type.Optional(idSchema),
});

export const UserContextSpec = entityUtils.getModelSpec(UserContextSchema, {
	isEntity: false,
});

export const PublicUserContextSchema = Type.Object({
	user: PublicUserSpec.fullSchema,
	features: Type.Array(Type.String()),
	isImpersonating: Type.Optional(Type.Boolean()),
});

export const PublicUserContextSpec = entityUtils.getModelSpec(
	PublicUserContextSchema,
	{ isEntity: false },
);

// ******************************************************
// functions to handle initializing the system user context - we need config and the metaOrgId to properly initialize
import { getIdSchema, getSystemUserId } from "../validation/index.js";
import { AppIdType } from "../types/app.types.js";

// ... (other imports)

// Factory function to create and cache the SystemUserContext
export function initializeSystemUserContext(
	systemEmail: string,
	metaOrg: IOrganization | undefined,
): IUserContext {
	const systemId = getSystemUserId();
	_systemUserContext = {
		user: {
			_id: systemId,
			_orgId: metaOrg?._id,
			externalId: "system",
			email: systemEmail,
			displayName: "System User",
			password: "systemPassword",
			_created: new Date(),
			_createdBy: systemId,
			_updated: new Date(),
			_updatedBy: systemId,
		},
		features: ["system"],
	};
	return _systemUserContext;
}

// Getter function that throws if not initialized
export function getSystemUserContext(): IUserContext {
	if (!_systemUserContext) {
		throw new Error(
			"SystemUserContext has not been initialized. Call initializeSystemUserContext() first.",
		);
	}
	return _systemUserContext;
}

// Optional: Check if initialized
export function isSystemUserContextInitialized(): boolean {
	return _systemUserContext !== null;
}

// Optional: For testing or reinitializing
export function resetSystemUserContext(): void {
	_systemUserContext = null;
}
