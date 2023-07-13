import request from '@/utils/request';

interface FormItem {
  userName: string
  name: string
  mobile: string
  isDriver: string
  enterpriseName: string
  deptName: string
  status: string
}

const accountApi = {
  getPopulation: 'user/employee/front/page',
}

class Service{
  /**
   * @description POST 获取词云数据
  */
  static getList(params:FormItem) {
    return request({
      url: accountApi.getPopulation,
      method: 'get',
      json: true,
      params
    }).then((res) => {
      if (res.code === '0') {
        return Promise.resolve(res.data)
      }
        return Promise.reject(res)
    })
  }

}
export default Service