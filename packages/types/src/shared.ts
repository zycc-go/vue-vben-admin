/** 用户信息 */
interface UserInfo {
  /**
   * 用户id
   */
  userId: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * accessToken
   */
  token: string;
  /**
   * 用户昵称
   */
  realName: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 首页地址
   */
  homePath: string;
  /**
   * 用户描述
   */
  desc: string;
  /**
   * 用户角色信息
   */
  roles: {
    /** 角色名 */
    roleName: string;
    /** 角色值 */
    value: string;
  }[];
}

export type { UserInfo };
