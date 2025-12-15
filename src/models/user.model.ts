import { TypeboxIsoDate } from '../validation/typebox-extensions.js';
import { IAuditable } from './auditable.model.js';
import { IEntity } from './entity.model.js';
import { Type } from '@sinclair/typebox';
import { entityUtils } from '../utils/entity.utils.js';
import { TypeCompiler } from '@sinclair/typebox/compiler';

export interface IUser extends IEntity, IAuditable {
	email: string;
	firstName?: string;
	lastName?: string;
	displayName?: string;
	password: string;
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

export const UserSchema = Type.Object({
	email: Type.String({
		title: 'Email',
		format: 'email'
	}),
	firstName: Type.Optional(Type.String({
		title: 'First Name'
	})),
	lastName: Type.Optional(Type.String({
		title: 'Last Name'
	})),
	displayName: Type.Optional(Type.String({
		title: 'Display Name'
	})),
	password: UserPasswordSchema.properties.password,
	_lastLoggedIn: Type.Optional(TypeboxIsoDate({ title: 'Last Login Date' })),
	_lastPasswordChange: Type.Optional(TypeboxIsoDate({ title: 'Last Password Change Date' })),
});

export const UserSpec = entityUtils.getModelSpec(UserSchema, { isAuditable: true });

export const PublicUserSchema = Type.Omit(UserSchema, ['password']);

export const PublicUserSpec = entityUtils.getModelSpec(PublicUserSchema, { isAuditable: true });