<script lang="ts" setup>
  import 'dayjs/locale/zh-cn';

  import { ConfigProvider } from 'ant-design-vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';

  defineOptions({ name: 'App' });

  dayjs.locale(zhCN.locale);
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <RouterView />
  </ConfigProvider>
</template>
