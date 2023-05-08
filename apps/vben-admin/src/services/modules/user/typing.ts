namespace UserService {
  /** 登录接口参数 */
  export interface LoginParams {
    username: string;
    password: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    userId: string;
    username: string;
    accessToken: string;
    realName: string;
    desc: string;
  }
}

export type { UserService };
