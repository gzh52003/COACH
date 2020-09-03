<template>


      <el-container style="margin:-20px">
        <el-aside width="200px">
          <el-menu
            :default-active="activeIndex"
            mode="vertical"
            @select="handleSelect"
            :default-openeds="openMenu"
            router
          >
            <template v-for="(item) in menu">
              <el-menu-item :key="item.path" v-if="!item.submenu" :index="item.path">
                <i :class="item.icon"></i>
                {{item.text}}
              </el-menu-item>
              <el-submenu :index="item.path" :key="item.path" v-else>
                <template v-slot:title :index="item.path">
                  <i :class="item.icon"></i>
                  {{item.text}}
                </template>
                <el-menu-item
                  :index="item.path + sub.path"
                  v-for="(sub) in item.submenu"
                  :key="sub.path"
                >
                  <i :class="sub.icon"></i>
                  {{sub.text}}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>

        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="padding:10px">
            <router-view />
          </div>
        </el-main>
      </el-container>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "/home",
      openMenu: [],
      menu: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
      {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            { text: "添加用户", path: "/add", icon: "el-icon-finished" },
            // { text: "编辑用户", path: "/edit", icon: "el-icon-s-tools" },
            { text: "权限管理", path: "/auth", icon: "el-icon-s-platform" },
            { text: "用户列表", path: "/list", icon: "el-icon-s-unfold" },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-s-fold",
          submenu: [
            { text: "商品列表",
              path: "/list",
              icon: "el-icon-grape" },
            {
              text: "商品库存",
              path: "/store",
              icon: "el-icon-shopping-cart-1",
            },
            { text: "商品渠道",
              path: "/channel",
              icon: "el-icon-guide" },
            {
              text:"商品订单",
              path: "/order",
              icon: "el-icon-s-flag"
            }  
          ],
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    handleSelect(path, indexPath) {
      this.activeIndex = path;
      this.openMenu[0] = indexPath[0];
      console.log(path);
    },
    
  },
};
</script>

<style lang='scss'>
.router-link-active {
  color: #58bc58;
}
.header {
  line-height: 60px;
  color: blue;
}
.logo {
  color: blue;
  vertical-align: middle;
  margin-right: 40px;
  font-size: 20px;
}
</style>
