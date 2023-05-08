<script setup lang="ts">
  import { useNamespace } from '@vben/hooks';
  import type { MenuRecordRaw } from '@vben/types';
  import { Menu } from 'ant-design-vue';
  import type { MenuMode, MenuTheme } from 'ant-design-vue/es/menu';
  import { ref } from 'vue';

  import SubMenu from './SubMenu.vue';

  defineOptions({
    name: 'Menu',
  });

  interface Props {
    /**
     * 菜单列表
     */
    menus: MenuRecordRaw[];
    /**
     * 菜单主题
     * @default light
     */
    theme?: MenuTheme;
    /**
     * 菜单模式
     * @default inline
     */
    mode?: MenuMode;
    /**
     * 菜单折叠状态
     * @default false
     */
    collapsed?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    theme: 'light',
    mode: 'inline',
    collapsed: false,
  });

  const emit = defineEmits(['itemClick']);

  const openKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>([]);

  const { b } = useNamespace('menu');

  async function handleClick(item) {
    emit('itemClick', item as MenuRecordRaw);
  }

  function handleOpenChange(keys: string[]) {
    console.log(111, keys);
  }
</script>

<template>
  <Menu
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    :class="b()"
    :sub-menu-open-delay="0.2"
    :mode="mode"
    :theme="theme"
    :inline-collapsed="collapsed"
    @click="handleClick"
    @open-change="handleOpenChange"
  >
    <template v-for="menuItem in menus" :key="menuItem.path">
      <SubMenu :menu-item="menuItem" />
    </template>
  </Menu>
</template>

<style module scoped lang="scss">
  @include b('menu') {
    // position: relative;
  }
</style>
