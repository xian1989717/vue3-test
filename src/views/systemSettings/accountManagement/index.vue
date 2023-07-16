<template>
  <div class="home-container">
    <div class="search">
      <el-form :inline="true" :model="formInline" :label-width="80" class="demo-form-inline">
        <el-row>
          <el-form-item label="账号">
            <el-input v-model="formInline.userName" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input v-model="formInline.name" placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formInline.mobile" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="formInline.mobile" placeholder="请输入手机号码" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否司机">
            <el-select v-model="formInline.isDriver" placeholder="请选择是否司机">
              <el-option label="是" value="1" />
              <el-option label="否" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="单位">
            <el-select v-model="formInline.isDriver" placeholder="请选择是否司机">
              <el-option label="是" value="1" />
              <el-option label="否" value="2" />
            </el-select>
          </el-form-item>

          <el-form-item label="单位">
            <el-select v-model="formInline.isDriver" placeholder="请选择是否司机">
              <el-option label="是" value="1" />
              <el-option label="否" value="2" />
            </el-select>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 16px">
      <el-table :data="tableData.list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="userName" label="账号" width="180" />
        <el-table-column prop="name" label="用户姓名" width="180" />
        <el-table-column prop="mobile" label="手机号码" />
        <el-table-column prop="enterpriseName" label="所在单位" />
        <el-table-column prop="deptName" label="部门" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <div>{{ scope.row.status === 2 ? '停用' : '启用' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="isDriver" label="是否司机">
          <template #default="scope">
            <div>{{ scope.row.isDriver === 1 ? '是' : '否' }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

import Service from './api'

import { FormItem, TableData } from './type'

let formInline: FormItem = reactive({
  userName: '',
  name: '',
  mobile: '',
  isDriver: '',
  enterpriseName: '',
  deptName: '',
  status: ''
})

const tableData: TableData = reactive({
  list: []
})

const getList = async (data: FormItem) => {
  const res = await Service.getList(data)
  tableData.list = []
  tableData.list.push(...res.list)
}

onMounted(() => {
  const data: FormItem = {
    ...formInline
  }
  getList(data)
})

const onSubmit = () => {
  const data: FormItem = {
    ...formInline
  }
  getList(data)
}

const resetForm = () => {
  formInline = {
    userName: '',
    name: '',
    mobile: '',
    isDriver: '',
    enterpriseName: '',
    deptName: '',
    status: ''
  }
}
const handleSelectionChange = (data: any) => {
  console.log(data)
}
</script>

<style scoped lang="stylus">
.home-container {
  padding: 16px;

  .search {
    background-color: #FFFFFF;
    padding: 16px;
  }
}
</style>
