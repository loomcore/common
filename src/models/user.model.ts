import { getIdSchema, TypeboxIsoDate } from '../validation/typebox-extensions.js';
import { IAuditable } from './auditable.model.js';
import { IEntity } from './entity.model.js';
import { Type } from '@sinclair/typebox';
import { entityUtils } from '../utils/entity.utils.js';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { AppIdType } from '../types/app.types.js';

export interface IUser extends IEntity, IAuditable {
	externalId?: string;
	email: string;
	displayName?: string;
	password: string;
	personId?: AppIdType;
	_lastLoggedIn?: Date;
	_lastPasswordChange?: Date;
}

export const UserPasswordSchema = Type.Object({
	password: Type.String({
		title: 'Password',
		minLength: 6,
		maxLength: 30
	}),
});

// Create a validator for just the password schema
export const passwordValidator = TypeCompiler.Compile(UserPasswordSchema);

const idSchema = getIdSchema();
export const UserSchema = Type.Object({
	externalId: Type.Optional(Type.String()),
	email: Type.String({
		title: 'Email',
		format: 'email'
	}),
	displayName: Type.Optional(Type.String({
		title: 'Display Name'
	})),
	password: UserPasswordSchema.properties.password,
	personId: Type.Optional(idSchema),
	_lastLoggedIn: Type.Optional(TypeboxIsoDate({ title: 'Last Login Date' })),
	_lastPasswordChange: Type.Optional(TypeboxIsoDate({ title: 'Last Password Change Date' })),
});

export const UserSpec = entityUtils.getModelSpec(UserSchema, { isAuditable: true });

export const PublicUserSchema = Type.Omit(UserSchema, ['password']);

export const PublicUserSpec = entityUtils.getModelSpec(PublicUserSchema);