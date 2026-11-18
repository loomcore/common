import { describe, it, expect } from 'vitest';
import { entityUtils } from '../../utils/entity.utils.js';
import { OrganizationSpec } from '../organization.model.js';

describe('OrganizationSpec create validation', () => {
  it('should pass validation when creating an organization without _id', () => {
    const errors = entityUtils.validate(OrganizationSpec, {
      name: 'Acme Corp',
      status: 1,
      isMetaOrg: false,
    });

    expect(errors).toBeNull();
  });
});
