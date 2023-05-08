declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    newAttr?: string; // 添加新属性的类型定义
  }
}

export {};
