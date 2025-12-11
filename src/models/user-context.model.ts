import { IUser, UserSchema } from './user.model.js';
import { Type } from '@sinclair/typebox';
import { PublicUserSchema } from './user.model.js';
import { entityUtils } from '../utils/entity.utils.js';
import { EntitySchema } from './entity.model.js';
import { AuditableSchema } from './auditable.model.js';

export interface IUserContext {
  user: IUser;
  _orgId?: string;
}

export const EmptyUserContext: IUserContext = {
  user: {} as IUser,
  _orgId: undefined
}

let _systemUserContext: IUserContext | null = null;

export const UserContextSchema = Type.Object({
  user: Type.Intersect([EntitySchema, AuditableSchema, UserSchema]),
  _orgId: Type.Optional(Type.String())
});

export const UserContextSpec = entityUtils.getModelSpec(UserContextSchema);

export const PublicUserContextSchema = Type.Object({
  user: Type.Intersect([EntitySchema, AuditableSchema, PublicUserSchema]),
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
      email: systemEmail,
      password: '',
      authorizations: [{
        _id: 'system-authorization',
        _orgId: metaOrgId,
        feature: 'system-authorization',
        _created: new Date(),
        _createdBy: 'system',
        _updated: new Date(),
        _updatedBy: 'system',
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