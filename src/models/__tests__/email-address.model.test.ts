import { describe, it, expect } from 'vitest';
import { entityUtils } from '../../utils/entity.utils.js';
import { emailAddressModelSpec } from '../email-address.model.js';

describe('emailAddressModelSpec create validation', () => {
  it('should pass validation when creating an email address without _id', () => {
    const errors = entityUtils.validate(emailAddressModelSpec, {
      personId: '507f1f77bcf86cd799439011',
      emailAddress: 'user@example.com',
      emailAddressType: 'work',
      isDefault: true,
    });

    expect(errors).toBeNull();
  });
});
