import { ITokenResponse, TokenResponseSchema } from './token-response.model.js';
import { Type } from '@sinclair/typebox';
import { IUserContext, PublicUserContextSchema } from './user-context.model.js';
import { entityUtils } from '../utils/entity.utils.js';

export interface ILoginResponse {
  tokens: ITokenResponse;
  userContext: IUserContext;
}

/**
 * Schema for LoginResponse
 */
export const LoginResponseSchema = Type.Object({
  tokens: TokenResponseSchema,
  userContext: PublicUserContextSchema
});

/**
 * Model spec for LoginResponse
 */
export const LoginResponseSpec = entityUtils.getModelSpec(LoginResponseSchema, { isEntity: false });
