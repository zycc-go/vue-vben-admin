import type { ComputedRef, Ref } from 'vue';
import type { BasicTableProps } from '../types/table';
import { unref, computed, h, nextTick, watchEffect, ref } from 'vue';
import TableFooter from '../components/TableFooter.vue';
import { useEventListener } from '/@/hooks/event/useEventListener';

export function useTableFooter(
  propsRef: ComputedRef<BasicTableProps>,
  scrollRef: ComputedRef<{
    x: string | number | true;
    y: string | number | null;
    scrollToFirstRowOnChange: boolean;
  }>,
  tableElRef: Ref<ComponentRef>,
  getDataSourceRef: ComputedRef<Recordable>,
) {
  const getIsEmptyData = computed(() => {
    return (unref(getDataSourceRef) || []).length === 0;
  });

  const rowWidth = ref<number>(50);

  const getFooterProps = computed((): Recordable | undefined => {
    const { summaryFunc, showSummary, summaryData, bordered } = unref(propsRef);
    return showSummary && !unref(getIsEmptyData)
      ? () =>
          h(TableFooter, {
            summaryFunc,
            summaryData,
            scroll: unref(scrollRef),
            bordered,
            rowWidth: unref(rowWidth),
          })
      : undefined;
  });

  watchEffect(() => {
    handleSummary();
  });

  function handleSummary() {
    const { showSummary } = unref(propsRef);
    if (!showSummary || unref(getIsEmptyData)) return;

    nextTick(() => {
      const tableEl = unref(tableElRef);
      if (!tableEl) return;
      const rowDom = tableEl.$el.querySelector(
        '.ant-table-container .ant-table-thead tr th',
      ) as HTMLDivElement;
      rowWidth.value = rowDom.offsetWidth;
      const bodyDom = tableEl.$el.querySelector('.ant-table-content');
      useEventListener({
        el: bodyDom,
        name: 'scroll',
        listener: () => {
          const footerBodyDom = tableEl.$el.querySelector(
            '.ant-table-footer .ant-table-content',
          ) as HTMLDivElement;
          if (!footerBodyDom || !bodyDom) return;
          footerBodyDom.scrollLeft = bodyDom.scrollLeft;
        },
        wait: 0,
        options: true,
      });
    });
  }
  return { getFooterProps };
}
