<script lang="ts" setup>
  import { Menu } from '@vben/ant-ui';
  import { VbenAdminLayout } from '@vben/layout';
  import { reactive } from 'vue';

  defineOptions({ name: 'Dashboard' });

  const model = reactive({
    sideWidth: 180,
    siderCollapse: false,
    layout: 'side-nav' as const,
    sideMixedExtraVisible: false,
    fixedMixedExtra: false,
    isMobile: false,
  });

  const menus = [
    {
      path: '1',
      name: 'Menu 1',
      children: [
        {
          path: '1.1',
          name: 'Menu 1.1',
          children: [
            {
              path: '1.1.1',
              name: 'Menu 1.1.1',
            },
            {
              path: '1.1.2',
              name: 'Menu 1.1.2',
            },
          ],
        },
        {
          path: '1.2',
          name: 'Menu 1.2',
        },
      ],
    },
    {
      path: '2',
      name: 'Menu 2',
    },
  ];
</script>

<template>
  <VbenAdminLayout
    v-model:side-collapse="model.siderCollapse"
    v-model:mixed-extra-visible="model.sideMixedExtraVisible"
    :sideWidth="model.sideWidth"
    :layout="model.layout"
    :fixed-mixed-extra="model.fixedMixedExtra"
    :isMobile="model.isMobile"
  >
    <template #content>
      <RouterView />
    </template>
    <template #side>
      <Menu :menus="menus" />
    </template>
    <template #side-extra>side-extra</template>
    <template #header>header</template>
    <template #footer>footer</template>
  </VbenAdminLayout>
</template>
