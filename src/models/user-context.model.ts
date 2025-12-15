import { IUserOut, PublicUserSpec, UserSpec } from './user.model.js';
import { Type } from '@sinclair/typebox';
import { entityUtils } from '../utils/entity.utils.js';

export interface IUserContext {
  user: IUserOut;
  _orgId?: string;
}

export const EmptyUserContext: IUserContext = {
  user: {} as IUserOut,
  _orgId: undefined
}

let _systemUserContext: IUserContext | null = null;

export const UserContextSchema = Type.Object({
  user: UserSpec.fullSchema,
  _orgId: Type.Optional(Type.String())
});

export const UserContextSpec = entityUtils.getModelSpec(UserContextSchema);

export const PublicUserContextSchema = Type.Object({
  user: PublicUserSpec.fullSchema,
  _orgId: Type.Optional(Type.String())
});

export const PublicUserContextSpec = entityUtils.getModelSpec(PublicUserContextSchema);

// ******************************************************
// functions to handle initializing the system user context - we need config and the metaOrgId to properly initialize
// Factory function to create and cache the SystemUserContext
export function initializeSystemUserContext(systemEmail: string, metaOrgId: string | undefined): IUserContext {
  _systemUserContext = {
    user: {
      _id: 'system',
      _orgId: metaOrgId,
      firstName: 'System',
      lastName: 'User',
      displayName: 'System User',
      email: systemEmail,
      authorizations: [{
        _id: 'system-authorization',
        _orgId: metaOrgId,
        role: 'system',
        feature: 'system',
      }],
      _created: new Date(),
      _createdBy: 'system',
      _updated: new Date(),
      _updatedBy: 'system',
    },
    _orgId: metaOrgId,
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