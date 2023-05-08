import { loggerWarning, traverseTreeValues } from '@vben/shared';
import type { RouteRecordName, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import { staticRoutes } from './routes';

/**
 * @description 获取静态路由所有节点包含子节点的 name，并排除不存在 name 字段的路由
 */
const staticRouteNames = traverseTreeValues<RouteRecordRaw, RouteRecordName | undefined>(
  staticRoutes,
  (route) => {
    // 这些路由需要指定 name，防止在路由重置时，不能删除没有指定 name 的路由
    if (!route.name) {
      loggerWarning(`The route with the path ${route.path} needs to specify the field name.`);
    }
    return route.name;
  },
);

/**
 *  @description 创建vue-router实例
 */
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: staticRoutes,
  scrollBehavior: (_to, _from, savedPosition) => savedPosition || { left: 0, top: 0 },
});

/**
 * @description 重置所有路由，如有指定白名单除外
 */
function resetRoutes() {
  const routes = router.getRoutes();
  const { hasRoute, removeRoute } = router;
  routes.forEach(({ name }) => {
    // 存在于路由表且非白名单才需要删除
    if (name && !staticRouteNames.includes(name) && hasRoute(name)) {
      removeRoute(name);
    }
  });
}

export { resetRoutes, router };
