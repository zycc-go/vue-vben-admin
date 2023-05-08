<script setup lang="ts">
  import type { MenuRecordRaw } from '@vben/types';
  import { Menu } from 'ant-design-vue';
  import { computed } from 'vue';

  import SubMenu from './SubMenu.vue';

  defineOptions({
    name: 'SubMenu',
  });

  interface Props {
    /**
     * 菜单项
     */
    menuItem: MenuRecordRaw;
  }

  const props = withDefaults(defineProps<Props>(), {});

  /**
   * 判断是否有子节点，动态渲染 menu-item/sub-menu-item
   */
  const hasChildren = computed(() => {
    const { menuItem } = props;
    return Reflect.has(menuItem, 'children') && !!menuItem.children && menuItem.children.length > 0;
  });
</script>

<template>
  <Menu.Item v-if="!hasChildren" :key="menuItem.path" :title="menuItem.name">
    {{ menuItem.name }}
  </Menu.Item>
  <Menu.SubMenu v-else :key="`submenu-${menuItem.path}`" :title="menuItem.name">
    <template v-for="childItem in menuItem.children || []" :key="childItem.path">
      <SubMenu :menu-item="childItem" />
    </template>
  </Menu.SubMenu>
</template>
