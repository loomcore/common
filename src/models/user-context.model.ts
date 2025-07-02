import {IUser} from './user.model.js';
import { Type } from '@sinclair/typebox';
import { PublicUserSchema } from './user.model.js';
import { entityUtils } from '../utils/entity.utils.js';

export interface IUserContext {
  user: IUser;
	_orgId?: string;
}

export const EmptyUserContext: IUserContext = {
  user: {} as IUser,
  _orgId: undefined
}

let _systemUserContext: IUserContext | null = null;

/**
 * Schema for UserContext that uses PublicUserSchema for user property
 * This ensures we don't expose sensitive user data in API responses
 */
export const UserContextSchema = Type.Object({
  user: PublicUserSchema,
  _orgId: Type.Optional(Type.String())
});

/**
 * Model spec for UserContext 
 */
export const UserContextSpec = entityUtils.getModelSpec(UserContextSchema);


// ******************************************************
// functions to handle initializing the system user context - we need config and the metaOrgId to properly initialize
// Factory function to create and cache the SystemUserContext
export function initializeSystemUserContext(systemEmail: string, metaOrgId: string | undefined): IUserContext {
  _systemUserContext = {
    user: {
      _id: 'system',
      email: systemEmail,
      password: '',
      // todo: get rid of these as soon as I get validation working in controllers instead of models - users can't supply these!
      _created: new Date(),
      _createdBy: 'system',
      _updated: new Date(),
      _updatedBy: 'system',
    },
    _orgId: metaOrgId,
  };
  console.log('SystemUserContext initialized successfully');
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