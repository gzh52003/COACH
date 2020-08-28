<template>
 <div>
    <!-- 表格组件 -->
    <el-table
    :data="goodsData"
    @sort-change='sortChange'
    height='600px'
    border
    style="width: 100%">
        <el-table-column
        fixed
        type="index"
        label="序号"
        width="50">
        </el-table-column>
        <el-table-column
        prop="gid"
        label="商品序号"
        nim-width="120">
        </el-table-column>
        <el-table-column
        prop="goodName"
        label="商品名称"
        nim-width="120">
        </el-table-column>
        <el-table-column
        prop="goodPic"
        label="商品图片"
        width="120">
        <template v-slot:default="scope">
            <span class="demonstration" ><el-image style="width: 100px; height: 100px" :src="scope.row.goodPic"></el-image>
            </span>
      </template>
        </el-table-column>
        <el-table-column
        sortable='custom'
        prop="salePrice"
        label="销售价"
        width="120">
        </el-table-column>
        <el-table-column
        sortable='custom'
        prop="oldPrice"
        label="原价"
        width="120">
        </el-table-column>
        <el-table-column
        sortable='custom'
        prop="storageNum"
        label="库存"
        width="120">
        </el-table-column>
        <el-table-column
        prop="supplierName"
        label="供应商"
        width="120">
        </el-table-column>
        <el-table-column
        prop="addTime"
        sortable='custom'
        label="入库时间"
        width="120">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </template>
        </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
 </div>
</template>
<script>
export default {
    data(){
        return {
            goodsData:[],       // 表格数据
            total:0,            // 总页数
            pageSize:10,        // 每页条数
            currentPage:1,      // 当前页
            sort:'addTime',            // 排序方式，默认入库时间,降序
        }
    },
    methods:{
        /* 1.获取商品信息 */
        async getSearch(){
            let {data} = await this.$request.get('/goods',{
                params:{
                    page:this.currentPage,
                    size:this.pageSize,
                    sort:this.sort
                }
            });
            console.log();
            if(data.code===1){
                this.goodsData = data.data.data;
                this.total = data.data.amount;
            }else{
                this.$message.error(`${data.msg}`);
            }
        },
        /* 2. 获取每页数据条数*/
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.currentPage = 1;
            this.getSearch()
        },
        /* 3. 获取当前页 */
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getSearch()
        },
        /* 4. 排序 */
        sortChange(data){
            switch(data.order){
                case 'descending':
                    this.sort = data.prop+',-1';
                    console.log(this.sort);
                    break
                case 'ascending':
                    this.sort = data.prop+',1';
                    console.log(this.sort);
                    break
                case null:
                    this.sort = ''
                    console.log(this.sort);
                    break
            }
            console.log(this.sort);
            this.getSearch()
        }
    },
    created(){
        this.getSearch()
    }
}
</script>