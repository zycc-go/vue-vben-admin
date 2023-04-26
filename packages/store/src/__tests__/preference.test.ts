import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

import { usePreferenceStore } from '../modules/preference';

describe('usePreferenceStore', () => {
  test('App Name with test', () => {
    setActivePinia(createPinia());
    let referenceStore = usePreferenceStore();

    beforeEach(() => {
      referenceStore = usePreferenceStore();
    });

    expect(referenceStore.appName).toBe('vben-admin');
    referenceStore.setAppName('vbenAdmin');
    expect(referenceStore.getAppName).toBe('vbenAdmin');
  });
});
