import { Type } from '@sinclair/typebox';

/**
 * This file provides a hook for the host application to provide a concrete TypeBox schema for entity IDs.
 * The host application should use tsconfig path mapping to replace this file with its own implementation.
 */

// The default, flexible schema.
export const IdSchema = Type.Union([
  Type.String({ title: 'ID' }),
  Type.Number({ title: 'ID' })
]);

