import request from '@/utils/request';

interface DynamicRoutesObj { 
  tenantId:number
}

const loginApi={
  dynamicRoutes:'/api/user/permission/dynamicRoutes'
}

class Service{
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