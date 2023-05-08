import type { Router } from 'vue-router';

import { configAccessGuard } from './access';

/**
 * 通用守卫配置
 * @param router
 */
function configCommonGuard(router: Router) {
  const loadedRouteMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedRouteMap.get(to.path);

    return true;
  });

  router.afterEach((to) => {
    // 记录页面是否加载
    loadedRouteMap.set(to.path, true);
  });
}

/**
 * 项目守卫配置
 * @param router
 */
function setupRouteGuard(router: Router) {
  /** 通用 */
  configCommonGuard(router);
  /** 权限访问 */
  configAccessGuard(router);
}

export { setupRouteGuard };
