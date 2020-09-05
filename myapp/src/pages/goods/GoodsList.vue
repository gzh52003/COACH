<template>
  <div>
    商品管理
    <el-table
      ref="multipleTable"
      :data="goodslist"
      tooltip-effect="dark"
      style="width: 100%"
      class="goodslist"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="商品图片" prop="image">
        <template v-slot:default="scope">
          <!-- {{JSON.stringify(scope.row.url)}} -->
          <img :src="scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="title"></el-table-column>
      <el-table-column prop="inv" label="库存"></el-table-column>
      <el-table-column prop="salePrice" label="价格" show-overflow-tooltip></el-table-column>
       <el-table-column prop="tag" label="类型"></el-table-column>
        <el-table-column prop="sales" label="已销售/件"></el-table-column>
        <el-table-column prop="addTime" label="日期"></el-table-column>
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
      :page-size="size"
      :total="total"
      @current-change="changePage"
     
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "goodslist",
  data() {
    return {
      page: 1,
      size: 10,
      total:0,
      goodslist: [],
    };
  },
  methods: {
    async deleteUser(id) {
      this.$confirm("你确认要删除这条信息嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/goods/" + id);
        if (data.code === 1) {
          this.goodslist = this.goodslist.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      });
    },
    async goto(id) {
      this.$router.push("/goods/edit");
      console.log(id);
    },
    changePage(page) {
      
      this.page = page;
      this.getData();
    },
    // prevPage(page) {
    //   console.log("prevPage==", page);
    // },
    // nextPage(page) {
    //   console.log("nextPage===", page);
    // },
    async getData() {
      const { page, size } = this;
      const {data} = await this.$request.get("/goods", {
        params: {
          page,
          size,
        },
      });
      this.total = data.data.total;
      this.goodslist =data.data.data;
    },
  },
  async created() {
    // const result = await this.$request.get("/goods");
    //  console.log(result.data.data);
    this.getData();
  },
};
</script>

<style lang="scss">
.goodslist {
  img {
    width: 80px;
  }
}
</style>
