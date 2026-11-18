import { describe, it, expect } from 'vitest';
import { Type } from '@sinclair/typebox';
import { entityUtils } from '../entity.utils.js';
import { TypeboxIsoDate } from '../../validation/index.js';

const DomainSchema = Type.Object({
  name: Type.String(),
  startDate: Type.Optional(TypeboxIsoDate({ title: 'Start Date' })),
});

describe('entityUtils.validate with TypeboxIsoDate', () => {
  const spec = entityUtils.getModelSpec(DomainSchema, { isEntity: false });

  it('should pass validation when a date field is a Date object', () => {
    const errors = entityUtils.validate(spec, {
      name: 'Acme',
      startDate: new Date('2024-04-30T08:54:33.666Z'),
    });

    expect(errors).toBeNull();
  });

  it('should pass validation when a date field is an ISO date-time string', () => {
    const errors = entityUtils.validate(spec, {
      name: 'Acme',
      startDate: '2024-04-30T08:54:33.666Z',
    });

    expect(errors).toBeNull();
  });

  it('should fail validation when a date field is an invalid string', () => {
    const errors = entityUtils.validate(spec, {
      name: 'Acme',
      startDate: 'not-a-date',
    });

    expect(errors).not.toBeNull();
    expect(errors!.length).toBeGreaterThan(0);
  });

  it('should fail validation when a date field is an Invalid Date object', () => {
    const errors = entityUtils.validate(spec, {
      name: 'Acme',
      startDate: new Date('not-a-date'),
    });

    expect(errors).not.toBeNull();
    expect(errors!.length).toBeGreaterThan(0);
  });
});
