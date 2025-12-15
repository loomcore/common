import { TypeboxIsoDate } from '../validation/typebox-extensions.js';
import { IAuditable } from './auditable.model.js';
import { IEntity } from './entity.model.js';
import { Type } from '@sinclair/typebox';
import { entityUtils } from '../utils/entity.utils.js';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { IAuthorizationOut, PublicAuthorizationSchema } from './authorization.model.js';


export interface IUserBase extends IEntity, IAuditable {
	email: string;
	firstName?: string;
	lastName?: string;
	displayName?: string;
	_lastLoggedIn?: Date;
	_lastPasswordChange?: Date;
}

export interface IUserIn extends IUserBase {
	password?: string;
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

export const UserSchemaBase = Type.Object({
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
	_lastLoggedIn: Type.Optional(TypeboxIsoDate({ title: 'Last Login Date' })),
	_lastPasswordChange: Type.Optional(TypeboxIsoDate({ title: 'Last Password Change Date' })),
});

export const UserSchema = Type.Composite([
	UserSchemaBase,
	Type.Object({
		password: UserPasswordSchema.properties.password,
	})],);

// Create the model spec first
export const UserSpec = entityUtils.getModelSpec(UserSchema, { isAuditable: true });

export interface IUserOut extends IUserBase {
	authorizations?: IAuthorizationOut[];
}

export const PublicUserSchema = Type.Composite([
	UserSchemaBase,
	Type.Object({
		authorizations: Type.Optional(Type.Array(PublicAuthorizationSchema, { title: 'Authorizations' })),
	})],
);

export const PublicUserSpec = entityUtils.getModelSpec(PublicUserSchema, { isAuditable: true });