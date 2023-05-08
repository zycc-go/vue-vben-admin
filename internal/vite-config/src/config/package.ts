import { readPackageJSON } from 'pkg-types';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

import { commonConfig } from './common';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    /**
     * 构建分离css
     * @default false
     */
    extraCss: boolean;
  };
}

function definePackageConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {}, options = {} } = defineOptions;
  const root = process.cwd();
  const { extraCss } = options;

  return defineConfig(async () => {
    const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root);
    const packageConfig: UserConfig = {
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
          fileName: () => 'index.mjs',
        },
        rollupOptions: {
          external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
        },
      },
      plugins: [
        dts({
          logLevel: 'error',
        }),
        !extraCss && cssInjectedByJsPlugin(),
      ],
    };
    const mergedConfig = mergeConfig(commonConfig, packageConfig);
    return mergeConfig(mergedConfig, overrides);
  });
}

export { definePackageConfig };
