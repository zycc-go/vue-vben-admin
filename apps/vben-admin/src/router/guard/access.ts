import { useUserStore } from '@vben/store';
import type { Router } from 'vue-router';

/**
 * 权限访问守卫配置
 * @param router
 */
function configAccessGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore();
    const accessToken = userStore.getAccessToken;

    // 没有 accessToken 逻辑
    if (!accessToken) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (!to.meta.requiresAuth) {
        next();
        return;
      }
    }
  });

  router.afterEach((_to) => {});
}

export { configAccessGuard };
