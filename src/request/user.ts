import myAxios from "../../request";

/**
 * 用户登录请求
 * @param value
 */
export const userLogin = async (value: any) => {
  return await myAxios.request({
    url: "api/user/login",
    method: "POST",
    data: value,
  });
};

/**
 * 用户注册请求
 * @param value
 */
export const userRegister = async (value: any) => {
  return await myAxios.request({
    url: "api/user/register",
    method: "POST",
    data: value,
  });
};

/**
 * 管理员查询用户信息
 * @param value
 */
export const searchUsers = async (value: any) => {
  return await myAxios.request({
    url: "api/user/search",
    method: "GET",
    params: value,
  });
};
