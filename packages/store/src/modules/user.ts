import type { UserInfo } from '@vben/types';
import { acceptHMRUpdate, defineStore } from 'pinia';

type AccessToken = string | null;

interface UserStage {
  /**
   * 登录 accessToken
   */
  accessToken: AccessToken;
  /**
   * 用户角色
   */
  roles: string[];
  /**
   * 用户信息
   */
  userInfo: UserInfo | null;
}

/**
 * @description 用户相关
 */
const useUserStore = defineStore('shared-user', {
  persist: {
    // 持久化
    // TODO: accessToken 过期时间
    paths: ['accessToken', 'roles', 'userInfo'],
  },
  state: (): UserStage => ({
    accessToken: null,
    roles: [],
    userInfo: null,
  }),
  getters: {
    getAccessToken(): AccessToken {
      return this.accessToken;
    },
    getRoles(): string[] {
      return this.roles;
    },
    getUserInfo(): UserInfo | null {
      return this.userInfo;
    },
  },
  actions: {
    setAccessToken(token: AccessToken) {
      this.accessToken = token;
    },
    setRoles(roles: string[]) {
      this.roles = roles;
    },
    setUserInfo(userInfo: UserInfo) {
      // 设置用户信息
      this.userInfo = userInfo;
      // 设置角色信息
      const roles = userInfo?.roles ?? [];
      const roleValues = roles.map((item) => item.value);
      this.setRoles(roleValues);
    },
    reset() {
      this.accessToken = null;
      this.roles = [];
      this.userInfo = null;
    },
  },
});

// 解决热更新问题
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}

export { useUserStore };
