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
    <div></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

interface FormItem {
  userName: string
  name: string
  mobile: string
  isDriver: string
  enterpriseName: string
  deptName: string
  status: string
}
let formInline: FormItem = reactive({
  userName: '',
  name: '',
  mobile: '',
  isDriver: '',
  enterpriseName: '',
  deptName: '',
  status: ''
})

onMounted(() => {})

const getList = (data: FormItem) => {
  console.log(data)
}

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
