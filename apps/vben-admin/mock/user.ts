import type { MockConfig, MockMethod } from 'vite-plugin-mock';

import { getRequestToken, resultError, resultSuccess } from './_util';

const fakeUserList = [
  {
    userId: '1',
    username: 'vben',
    realName: 'Vben Admin',
    avatar: '',
    desc: 'manager',
    password: '123456',
    accessToken: 'fakeAdminToken',
    homePath: '/dashboard',
    roles: [
      {
        roleName: 'Super Admin',
        value: 'super',
      },
    ],
  },
  {
    userId: '2',
    username: 'test',
    password: '123456',
    realName: 'test user',
    avatar: '',
    desc: 'tester',
    accessToken: 'fakeTestToken',
    homePath: '/dashboard/workbench',
    roles: [
      {
        roleName: 'Tester',
        value: 'test',
      },
    ],
  },
];

export default (_config: MockConfig): MockMethod[] => {
  return [
    {
      url: '/req-api/login',
      timeout: 200,
      method: 'post',
      response: ({ body }) => {
        const { username, password } = body;
        const checkUser = fakeUserList.find(
          (item) => item.username === username && password === item.password,
        );
        if (!checkUser) {
          return resultError('Incorrect account or password！');
        }
        const { userId, username: _username, accessToken, realName, desc, roles } = checkUser;
        return resultSuccess({
          roles,
          userId,
          username: _username,
          accessToken,
          realName,
          desc,
        });
      },
    },
    {
      url: '/req-api/getUserInfo',
      method: 'get',
      response: (request) => {
        const token = getRequestToken(request);
        if (!token) return resultError('Invalid token');
        const checkUser = fakeUserList.find((item) => item.accessToken === token);
        if (!checkUser) {
          return resultError('The corresponding user information was not obtained!');
        }
        const { accessToken: _token, password: _pwd, ...rest } = checkUser;
        return resultSuccess(rest);
      },
    },
    {
      url: '/req-api/logout',
      timeout: 200,
      method: 'get',
      response: (request) => {
        const token = getRequestToken(request);
        if (!token) return resultError('Invalid token');
        const checkUser = fakeUserList.find((item) => item.accessToken === token);
        if (!checkUser) {
          return resultError('Invalid token!');
        }
        return resultSuccess(undefined, { message: 'Token has been destroyed' });
      },
    },
  ];
};
