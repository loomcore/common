import { IUser, PublicUserSpec, UserSpec } from './user.model.js';
import { Type } from '@sinclair/typebox';
import { entityUtils } from '../utils/entity.utils.js';
import { IOrganization, OrganizationSpec } from './organization.model.js';
import { IUserContextAuthorization, UserContextAuthorizationSpec } from './user-context-authorization.model.js';

export interface IUserContext {
  user: IUser;
  authorizations: IUserContextAuthorization[];
  organization?: IOrganization;
}

export const EmptyUserContext: IUserContext = {
  user: {} as IUser,
  authorizations: [],
  organization: undefined
}

let _systemUserContext: IUserContext | null = null;

export const UserContextSchema = Type.Object({
  user: UserSpec.fullSchema,
  authorizations: Type.Array(UserContextAuthorizationSpec.fullSchema),
  organization: OrganizationSpec.fullSchema
});

export const UserContextSpec = entityUtils.getModelSpec(UserContextSchema);

export const PublicUserContextSchema = Type.Object({
  user: PublicUserSpec.fullSchema,
  authorizations: Type.Array(UserContextAuthorizationSpec.fullSchema),
  organization: OrganizationSpec.fullSchema
});

export const PublicUserContextSpec = entityUtils.getModelSpec(PublicUserContextSchema);

// ******************************************************
// functions to handle initializing the system user context - we need config and the metaOrgId to properly initialize
import { getSystemUserId } from '../validation/index.js';

// ... (other imports)

// Factory function to create and cache the SystemUserContext
export function initializeSystemUserContext(systemEmail: string, metaOrg: IOrganization | undefined): IUserContext {
  const systemId = getSystemUserId();
  _systemUserContext = {
    user: {
      _id: systemId,
      _orgId: metaOrg?._id,
      external_id: 'system',
      email: systemEmail,
      displayName: 'System User',
      password: 'systemPassword',
      person: {
        _id: systemId,
        externalId: 'system',
        firstName: 'System',
        middleName: null,
        lastName: 'User',
        emailAddresses: [],
        phoneNumbers: [],
        isAgent: true,
        isClient: false,
        isEmployee: false,
        dateOfBirth: null,
        extendedTypes: 0,
        _created: new Date(),
        _createdBy: systemId,
        _updated: new Date(),
        _updatedBy: systemId,
      },
      _created: new Date(),
      _createdBy: systemId,
      _updated: new Date(),
      _updatedBy: systemId,
    },
    authorizations: [{
      _id: 'system-authorization', // This is a specific string key, should remain as is.
      _orgId: metaOrg?._id,
      role: 'system',
      feature: 'system'
    }],
    organization: metaOrg
  };
  return _systemUserContext;
}

// Getter function that throws if not initialized
export function getSystemUserContext(): IUserContext {
  if (!_systemUserContext) {
    throw new Error('SystemUserContext has not been initialized. Call initializeSystemUserContext() first.');
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