export interface FormItem {
  userName: string
  name: string
  mobile: string
  isDriver: string
  enterpriseName: string
  deptName: string
  status: string
}


interface TableItem {
  userName: string
  name: string
  mobile: string
  enterpriseName: string
  deptName: string,
  roleName:string,
  status:number,
  isDriver:number
}

export interface TableData {
  list:TableItem[]
}