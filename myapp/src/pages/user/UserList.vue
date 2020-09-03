<template>
    <div>
        UserList
           <el-table
      ref="multipleTable"
      :data="userlist"
      tooltip-effect="dark"
      style="width: 100%"
      
    >
      <el-table-column type="selection"  ></el-table-column>
      <el-table-column type="index" label="#"  ></el-table-column>
      <el-table-column label="头像" prop="pic">
        <template v-slot:default="scope">
    <span class="demonstration" >  {{scope.pic}}  <el-image
      style="width: 100px; height: 100px"
      :src="scope.pic"
      ></el-image></span>

      </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username"  ></el-table-column>
      <el-table-column prop="age" label="年龄"  ></el-table-column>
      <el-table-column prop="gender" label="性别"   show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="地址"  ></el-table-column>
      <el-table-column prop="date" label="日期"  ></el-table-column>
      <el-table-column label="操作" width="120">
        <!-- 需要获取数据id -->
        <!-- <slot name="title"></slot>
        <slot :row="item"/>-->
        <template v-slot:default="scope">
          <el-button
            size="small"
            plain
            type="success"
            icon="el-icon-edit"
            circle
            @click="goto(scope.row._id)"
          ></el-button>
          <el-button
            size="small"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteUser(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
<el-pagination
  background
  layout="prev, pager, next"
  @current-change="changePage"
  :page-size="size"
  :total="total">
</el-pagination>
    </div>
</template>

<script>
export default {
    name:'userlist',
    data(){
        return{
            userlist:[],
            page:1,
            size:10,
            total:0
        }
    },
    methods:{
     async deleteUser(id){
       this.$confirm("你确认要删除这条信息嘛？","提示",{
         confirmButtonText:"确定",
         cancelButtonText:"取消",
         type:"warning"
       }).then(async ()=>{
         const {data} = await this.$request.delete("/user/"+id);
         if(data.code === 1){
           this.userlist = this.userlist.filter(item=> item._id !== id);
           this.$message({
             type: "success",
             message: "删除成功"
           });
         }
       })
     },
     async goto(id){
       this.$router.push({
         name:'userEdit',
         params:{id},
         query:{
           a:10,
           b:20
         }
       });
       console.log(id)
     },
     async getData(){
       const {page,size} = this;
         const {data} = await this.$request.get('/user',{
           params:{
             page,
             size
           }
         });
         console.log(data.data.total);
         this.total = data.data.total;
         this.userlist = data.data.data;
     },
     changePage(page){
       this.page = page;
       this.getData();
     }
    },
   async created(){
         this.getData();

    }
}
</script>