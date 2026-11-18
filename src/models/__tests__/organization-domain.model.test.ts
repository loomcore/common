import { describe, it, expect } from 'vitest';
import { entityUtils } from '../../utils/entity.utils.js';
import { OrganizationDomainSpec } from '../organization-domain.model.js';

describe('OrganizationDomainSpec create validation', () => {
  it('should pass validation when creating an organization domain without _id', () => {
    const errors = entityUtils.validate(OrganizationDomainSpec, {
      domain: 'acme.example.com',
      organizationId: '507f1f77bcf86cd799439011',
    });

    expect(errors).toBeNull();
  });
});
