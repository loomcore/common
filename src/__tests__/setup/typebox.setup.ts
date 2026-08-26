import { Type } from '@sinclair/typebox';
import { initializeTypeBox, setIdSchema } from '../../validation/index.js';

initializeTypeBox();
setIdSchema(Type.String({ title: 'ID' }));
