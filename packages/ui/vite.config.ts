import { mergeConfig } from 'vite';

import react from '@orbitkit/vite/react';

export default mergeConfig(react, {
  // your custom config & overrides on top here
});
