import { Type } from '@sinclair/typebox';
import { initializeTypeBox, setIdSchema } from '../../validation/index.js';
import {
  initializeTypeBox as initializeTypeBoxPkg,
  setIdSchema as setIdSchemaPkg,
} from '@loomcore/common/validation';

const idSchema = Type.String({ title: 'ID' });

// Source modules (relative imports) and package imports (@loomcore/common/* → dist)
// are separate module graphs in vitest; initialize both.
initializeTypeBox();
setIdSchema(idSchema);
initializeTypeBoxPkg();
setIdSchemaPkg(idSchema);
