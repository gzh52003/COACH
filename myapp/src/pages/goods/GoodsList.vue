<template>
  <div>
    Goods
    <el-table ref="multipleTable" :data="GoodsList" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="商品图片" prop="pic">
        <template v-slot:default="scope">
          <div class="pic">
            <img :src="scope.row.pic" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" prop="title">
        <template v-slot:default="{row}">
          <div :info="row" class="info">
            <h4>{{row.title}}</h4>
            <h5>{{row.price}}</h5>
          </div>
        </template>
      </el-table-column>
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
            @click="deleteGoods(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="50"
      @current-change="changePage"
      @prev-click="prevPage"
      @next-click="nextPage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  data() {
    return {
      GoodsList: [],
      page:1,
      size:5,
      total:0,
    };
  },
  methods: {
    async deleteGoods(id) {
      console.log(id);
      this.$confirm("你确认要删除这条信息嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/goods/" + id);
        console.log(data);
        if (data.code === 1) {
          this.GoodsList = this.GoodsList.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      });
    },
    async goto(id) {
      this.$router.push("/goods/edit/" + id);
      console.log(id);
    },
    async getData() {
    const { page, size } = this;
    const { data } = await this.$request.get("/goods", {
      params: {
        page,
        size,
      },
    });
    this.total = data.data.total;
    this.GoodsList = data.data.data;
  },

  changePage(page) {this.page=page;this.getData();},
  prevPage(page) {console.log(page)},
  nextPage(page) {console.log(page)},
  },

    async created() {
      console.log(this+" "+ " 来来来")
      this.getData();
  },
};
</script>
<style lang="scss" scoped>
.pic img {
  width: 100px;
  height: 100px;
}
</style>