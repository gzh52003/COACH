<template>
  <nav>
    <el-container>
      <el-header class="header">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-col :span="12" class="logo">
                <i class="el-icon-s-opportunity"></i>后台管理
              </el-col>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light" style="text-align: right">
              <span>{{userInfo.username}} &nbsp;</span>
              <el-button type="text" @click="logout" v-if="userInfo.authorization">退出</el-button>
              <el-button type="text" @click="goto('/login')" v-else>登录</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-main>
            <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- <button @click="go">回退</button> -->
  </nav>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userInfo:{},
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
      currentIndex: "",
    };
  },
   watch:{
    $route(to,from){
      if(from.path === '/login'){
        this.getUserInfo();

      }

      if(to.path === '/login'){
        this.logout();
      }
    }
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    go() {
      this.$router.go(-1);
    },
    handleSelect(path, indexPath) {
      this.activeIndex = path;
      this.openMenu[0] = indexPath[0];
      console.log(path);
    },
    logout(){
      localStorage.removeItem('userInfo');
      this.userInfo = {};
      this.$router.push('/login');
    },
    getUserInfo(){
       const userInfo = localStorage.getItem('userInfo') || {};
      try{
        this.userInfo = JSON.parse(userInfo);
      }catch(err){
        this.userInfo = {}
      }
    }
  },
  created(){
     this.getUserInfo();
    }
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
