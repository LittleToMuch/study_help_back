<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="menu-title">
        <svg t="1584276457088" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4632" width="30" height="30"><path d="M907.618462 383.448615v144.777847a19.692308 19.692308 0 0 0 4.214153 12.20923l17.723077 22.449231a19.692308 19.692308 0 0 1-1.96923 26.466462l-36.667077 34.73723a19.692308 19.692308 0 0 1-27.687385-0.590769l-32.886154-33.870769a19.692308 19.692308 0 0 1-1.063384-26.269539l19.495384-23.630769a19.692308 19.692308 0 0 0 4.489846-12.563692V408.418462c-188.691692 83.889231-240.128 110.473846-281.954461 130.638769-41.826462 20.164923-71.955692 20.164923-113.821539 3.229538-41.117538-16.935385-229.848615-95.153231-328.231384-145.959384-65.378462-33.870769-69.750154-55.650462 1.45723-84.676923 92.553846-37.888 236.425846-99.170462 317.243077-132.214154 47.734154-20.992 73.412923-32.295385 117.484308-8.861539 78.572308 35.446154 248.910769 108.032 338.510769 148.361846 77.863385 37.060923 25.718154 49.191385 3.66277 64.512z" fill="#3CC4C4" p-id="4633"></path><path d="M755.633231 516.489846v249.974154S668.987077 866.461538 515.505231 866.461538c-164.509538 0-253.361231-99.997538-253.361231-99.997538v-233.865846c52.145231 22.606769 110.158769 42.732308 180.657231 68.529231 43.323077 17.762462 98.382769 23.394462 138.043077 0.827077 45.528615-20.164923 107.244308-54.035692 174.788923-85.464616z" fill="#3CC4C4" p-id="4634"></path></svg>
        <span class="font">
          学习互助平台
        </span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped lang="scss">
  .menu-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #333;
    position: relative;
    overflow: hidden;
    .icon {
      position: absolute;
      top: 47%;
      transform: translateY(-50%);
      left: 13px;
    }
    .font {
      color: #fff;
      font-size: 16px;
      min-width: 30px;
      position: absolute;
      left: 60px;
    }
  }
</style>
