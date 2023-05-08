/** uno.css 样式表,需要插件配合 */
import 'uno.css';
import '@vben/design';

import { useStore } from '@vben/store';
import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';

async function bootstrap() {
  const app = createApp(App);

  // 配置 pinia-store
  useStore(app);

  // 配置路由
  app.use(router);

  // 路由守卫
  // setupRouterGuard(router);

  app.mount('#app');
}

bootstrap();
