import { describe, it, expect } from 'vitest';
import { Kind, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { entityUtils } from '../entity.utils.js';

describe('getModelSpec additionalProperties', () => {
  it('should keep extra properties through decode when additionalProperties is Type.Any()', () => {
    const DomainSchema = Type.Object(
      { name: Type.String() },
      { additionalProperties: Type.Any() }
    );
    const spec = entityUtils.getModelSpec(DomainSchema, { isAuditable: true });

    const decoded = spec.decode({
      name: 'Widget',
      extraProperty: 'kept',
      anotherExtra: 42
    }) as any;

    expect(decoded.name).toBe('Widget');
    expect(decoded.extraProperty).toBe('kept');
    expect(decoded.anotherExtra).toBe(42);
  });

  it('should keep extra properties through encode when additionalProperties is Type.Any()', () => {
    const DomainSchema = Type.Object(
      { name: Type.String() },
      { additionalProperties: Type.Any() }
    );
    const spec = entityUtils.getModelSpec(DomainSchema, { isAuditable: true });

    const encoded = spec.encode({
      name: 'Widget',
      extraProperty: 'kept',
      anotherExtra: 42
    });

    expect(encoded.name).toBe('Widget');
    expect((encoded as any).extraProperty).toBe('kept');
    expect((encoded as any).anotherExtra).toBe(42);
  });

  it('should keep extra properties on the partial schema when additionalProperties is Type.Any()', () => {
    const DomainSchema = Type.Object(
      { name: Type.String() },
      { additionalProperties: Type.Any() }
    );
    const spec = entityUtils.getModelSpec(DomainSchema, { isAuditable: true });

    expect(spec.partialSchema.additionalProperties).toBeDefined();
    expect(Kind in (spec.partialSchema.additionalProperties as object)).toBe(true);
    expect((spec.partialSchema.additionalProperties as any)[Kind]).toBe('Any');

    const cleaned = Value.Clean(spec.partialSchema, {
      extraProperty: 'kept',
      anotherExtra: 42
    }) as any;

    expect(cleaned.extraProperty).toBe('kept');
    expect(cleaned.anotherExtra).toBe(42);
  });

  it('should still encode and decode known and system properties when additionalProperties is Type.Any()', () => {
    const DomainSchema = Type.Object(
      { name: Type.String() },
      { additionalProperties: Type.Any() }
    );
    const spec = entityUtils.getModelSpec(DomainSchema, { isAuditable: true });
    const id = '507f1f77bcf86cd799439011';
    const now = new Date();

    const encoded = spec.encode({
      _id: id,
      name: 'Widget',
      _created: now,
      _createdBy: 'test-user',
      extraProperty: 'kept'
    });

    expect(encoded._id).toBe(id);
    expect(encoded.name).toBe('Widget');
    expect(typeof encoded._created).toBe('string');
    expect(encoded._created).toBe(now.toISOString());
    expect(encoded._createdBy).toBe('test-user');
    expect((encoded as any).extraProperty).toBe('kept');

    const nowIsoString = now.toISOString();
    const decoded = spec.decode({
      _id: id,
      name: 'Widget',
      _created: nowIsoString,
      _createdBy: 'test-user',
      extraProperty: 'kept'
    }) as any;

    expect(decoded._id).toBe(id);
    expect(decoded.name).toBe('Widget');
    expect(decoded._created instanceof Date).toBe(true);
    expect(decoded._created.toISOString()).toBe(nowIsoString);
    expect(decoded._createdBy).toBe('test-user');
    expect(decoded.extraProperty).toBe('kept');
  });

  it('should still strip extra properties when the domain schema does not set additionalProperties', () => {
    const DomainSchema = Type.Object({ name: Type.String() });
    const spec = entityUtils.getModelSpec(DomainSchema, { isAuditable: true });

    const decoded = spec.decode({
      name: 'Widget',
      extraProperty: 'should be removed'
    }) as any;
    const encoded = spec.encode({
      name: 'Widget',
      extraProperty: 'should be removed'
    });

    expect(decoded.name).toBe('Widget');
    expect(decoded.extraProperty).toBeUndefined();
    expect(encoded.name).toBe('Widget');
    expect((encoded as any).extraProperty).toBeUndefined();
  });
});
