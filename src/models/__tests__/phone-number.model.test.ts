import { describe, it, expect } from 'vitest';
import { entityUtils } from '../../utils/entity.utils.js';
import { phoneNumberModelSpec } from '../phone-number.model.js';

describe('phoneNumberModelSpec create validation', () => {
  it('should pass validation when creating a phone number without _id', () => {
    const errors = entityUtils.validate(phoneNumberModelSpec, {
      phoneNumber: '+15551234567',
      phoneNumberType: 'mobile',
      isDefault: true,
    });

    expect(errors).toBeNull();
  });
});
