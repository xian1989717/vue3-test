<template>
  <div v-if="!item.meta.hidden" class="menu-wrapper">
    <!--only on child show el-menu -->
    <template v-if="hasOneShowingChild(item.children, item)">
      <el-menu-item :key="onlyOneChild.path" :index="onlyOneChild.path" :route="onlyOneChild.path">
        <i :class="onlyOneChild.meta.icon"></i>
        <template #title>{{ onlyOneChild.meta.title }}</template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template #title>
        <i :data-index="item.path" :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <!--children 进行递归调用自身组件-->
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="child.path" class="nest-menu" />
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useStore } from '@/store/index'

interface childType {
  path: string
  name?: string
  component: Function
  meta: {
    title: Object
    icon: string
    hidden?: boolean
    [key: string]: any
  }
}
export default defineComponent({
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNested: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup() {
    // 是否只有一个孩子
    const onlyOneChild = ref()
    const store = useStore()
    const lang = computed(() => store.getters['settingsModule/getLangState'])
    onMounted(() => {
      // eslint-disable-next-line no-console
    })
    // methods
    /**
     * @description 展示只有一个孩子的情况
     */
    const hasOneShowingChild = (children: childType[] = [], parent: any) => {
      const showingChildren = children.filter((item) => {
        if (item?.meta?.hidden) {
          return false
        }
        onlyOneChild.value = item
        return true
      })

      // 判断当前路由，是否有孩子children，以及孩子个数；
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有孩子，则展示父级路由；
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, noShowingChildren: true }
        return true
      }

      return false
    }

    return {
      onlyOneChild,
      hasOneShowingChild,
      lang
    }
  }
})
</script>
<style lang="stylus" scoped></style>
