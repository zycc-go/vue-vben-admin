import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  entries: ['src/index', 'src/global'],
  declaration: true,
});
