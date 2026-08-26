import { describe, it, expect } from 'vitest';
import { Type } from '@sinclair/typebox';
import { entityUtils } from '../entity.utils.js';

const DomainSchema = Type.Object({ name: Type.String() });
const id = '507f1f77bcf86cd799439011';

describe('getModelSpec flags', () => {
  it('defaults isEntity to true and reports that same value on the spec', () => {
    const spec = entityUtils.getModelSpec(DomainSchema);

    expect(spec.isEntity).toBe(true);
    expect(spec.isAuditable).toBe(false);
    expect(spec.encode({ _id: id, name: 'Item' })._id).toBe(id);
  });

  it('still reports isEntity true when only isAuditable is passed', () => {
    const spec = entityUtils.getModelSpec(DomainSchema, { isAuditable: true });

    expect(spec.isEntity).toBe(true);
    expect(spec.isAuditable).toBe(true);
    expect(spec.encode({ _id: id, name: 'Item' })._id).toBe(id);
  });

  it('reports isEntity false only when explicitly opted out', () => {
    const spec = entityUtils.getModelSpec(DomainSchema, { isEntity: false });

    expect(spec.isEntity).toBe(false);
    expect(spec.encode({ _id: id, name: 'Item' })._id).toBeUndefined();
  });
});
