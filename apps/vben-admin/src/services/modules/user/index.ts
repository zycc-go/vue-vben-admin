import type { UserInfo } from '@vben/types';

import { request } from '@/services/request';

import type { UserService } from './typing';

/**
 * 登录
 */
async function userLogin(data: UserService.LoginParams) {
  return request<UserService.LoginResult>('/login', { data, method: 'POST' });
}

/**
 * 获取用户信息
 */
async function getUserInfo() {
  return request<UserInfo>('/getUserInfo', { method: 'GET' });
}

export { getUserInfo, userLogin };

export type { UserService } from './typing';
