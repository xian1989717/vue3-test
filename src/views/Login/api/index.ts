import qs from 'qs';
import request from '@/utils/request';

interface DynamicRoutesObj { 
  tenantId:number
}

const loginApi={
  userLogin: '/api/auth/oauth/token',
  userRegister:'/api/auth/user/register',
  sendCaptcha:'/api/auth/email/sendCaptcha',
  forgetPassword:'/api/auth/email/forgot-password',
  resetPassword:`/api/auth/user/reset-password`,
  permissionRoutes:'/api/auth/permission/routes',
  userInfo:'/api/user/employee/current',
  dynamicRoutes:'/api/user/permission/dynamicRoutes'
}

class Service{
  /**
   * @description POST 用户登录接口
  */
  static postLogin(data: any) {
    return request({
      url: loginApi.userLogin,
      method: 'POST',
      json: true,
      data:qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic d2ViX2Zyb250OndlYl9mcm9udA=='
      }
    }).then((res) => {
      if (res) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @descript POST  用户注册
  */
  static postRegister(data: any) {
    return request({
      url: loginApi.userRegister,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

 /**
   * @description   POST 发送验证码 /auth/email/sendCaptcha
  */
  static postCaptcha(data: any) {
    return request({
      url: loginApi.sendCaptcha,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 0) {
      return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @description POST 忘记密码接口
  */
  static postForgetPwd(data: any) {
    return request({
      url: loginApi.forgetPassword,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 0) {
      return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @description /auth/user/reset-password/{token}
  */
  static postResetPwd(data: any) {
    return request({
      url: loginApi.resetPassword,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 0) {
      return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
  * @description POST 保存授权菜单权限
  */
  static postAuthPermission(data: any) {
    return request({
      url: loginApi.permissionRoutes,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 0) {
      return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

    /**
     * @description POST 查询用户信息
    */

  static postAuthUserInfo(data: any) {
    return request({
      url: loginApi.userInfo,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 0) {
      return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * 
   */
  static getUserInfo(){
    return request({
      url:loginApi.userInfo,
      method:'GET',
      json: true,
    }).then(res=>{
      if(res.code === '0'){
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  static getDynamicRoutes(data: DynamicRoutesObj){
    return request({
      url:loginApi.dynamicRoutes,
      method:'GET',
      json:true,
      data
    }).then(res => {
      if(res.code === '0'){
        return Promise.resolve(res.data)
      }
      return Promise.reject(res.data)

    })
  }
}
export default Service


