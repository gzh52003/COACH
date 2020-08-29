<template>
    <div>
        <!-- 查询表单组件 -->
        <el-form :inline="true" :model="searchMap" ref="searchMap" class="demo-form-inline">
            <el-form-item prop='goodName'>
                <el-input v-model="searchMap.goodName" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                <el-button icon='el-icon-refresh' @click="$refs.searchMap.resetFields()">重置</el-button>
                <el-button type="info" icon='el-icon-edit-outline' @click='addBefore'>新增</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格组件 -->
        <el-table
        :data="goodsData"
        @sort-change='sortChange'
        height='600px'
        border
        stripe
        style="width: 100%">
            <el-table-column
            fixed
            type="index"
            label="序号"
            width="60">
            </el-table-column>
            <el-table-column
            prop="gid"
            label="商品编号"
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
            width="180">
                <template slot-scope="scope">
                    <!-- scope.row：当前行的商品的所有信息 -->
                    <el-button @click="editBefore(scope.row._id)" type="success" size="small" icon="el-icon-edit">编辑</el-button>
                    <el-button @click="deleteGoods(scope.row._id)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
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

        <!-- 新增|编辑弹窗组件 -->
        <el-dialog :title="isEdit?'编辑商品':'新增商品'" :visible.sync="dialogFormVisible" width='640px'>
            <el-form :model="goodsForm" ref='dialogForm' :rules="rules" status-icon>
                <el-form-item prop='gid' style='width:550px' label="商品编号" :label-width="formLabelWidth" type='number'>
                    <el-input v-model.number="goodsForm.gid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop='goodName' style='width:550px' label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="goodsForm.goodName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop='goodPic' style='width:550px' label="商品图片" :label-width="formLabelWidth">
                    <el-input v-model="goodsForm.goodPic" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop='salePrice' style='width:550px' label="销售价" :label-width="formLabelWidth">
                    <el-input v-model.number="goodsForm.salePrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop='oldPrice' style='width:550px' label="原价" :label-width="formLabelWidth">
                    <el-input v-model.number="goodsForm.oldPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop='storageNum' style='width:550px' label="库存" :label-width="formLabelWidth">
                    <el-input v-model.number="goodsForm.storageNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop='supplierName' style='width:550px' label="供应商" :label-width="formLabelWidth">
                    <el-input v-model="goodsForm.supplierName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop='addTime' style='width:550px' label="入库时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="goodsForm.addTime" type="date">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" @click="formSubmite">确定</el-button>
            </div>
        </el-dialog>
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
            sort:'addTime',     // 排序方式，默认入库时间,降序
            searchMap:{         // 查询条件
                goodName:''
            },
            /* 新增、编辑表单数据 */
            goodsForm:{
                gid:'',
                goodName:'',
                goodPic:'',
                salePrice:'',
                oldPrice:'',
                storageNum:'',
                supplierName:'',
                addTime:'',
            },
            isEdit:null,                // 新增、编辑共用表单开关
            dialogFormVisible:false,    // 新增、编辑弹窗状态
            formLabelWidth:'120px',     // 表单label宽度
            /* 新增表单校验规则 */
            rules:{
                goodName:{ required: true, message: '商品名称不能为空', trigger: 'blur' },
                oldPrice:{ required: true, message: '原价不能为空', trigger: 'blur' },
                storageNum:{ required: true, message: '库存不能为空', trigger: 'blur' },
                supplierName:{ required: true, message: '供应商不能为空', trigger: 'blur' },
                addTime:{ required: true, message: '入库时间不能为空', trigger: 'blur' },
            }
        }
    },
    methods:{
        /* 1.获取商品信息 */
        async getSearch(){
            let {data} = await this.$request.get('/goods',{
                params:{
                    page:this.currentPage,
                    size:this.pageSize,
                    sort:this.sort,
                    goodName:this.searchMap.goodName
                }
            });
            if(data.code===1){
                this.goodsData = data.data.data;
                this.total = data.data.amount;
            }else{
                this.$message.error(`${data.msg}`);
            }
        },
        /* 2. 获取每页数据条数*/
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.getSearch()
        },
        /* 3. 获取当前页 */
        handleCurrentChange(val) {
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
        },
        /* 5.查询 */
        onSubmit(){
            console.log(this.searchMap);
            this.getSearch()
        },
        /* 6.打开编辑弹窗 */
        async editBefore(id){
            console.log('编辑商品',id);
            this.isEdit = id;
            this.dialogFormVisible = true;
            let {data} = await this.$request.get(`/goods/${this.isEdit}`);
            if(data.code){
                this.goodsForm = data.data.data[0];
            }else{
                this.$message.error({
                    message:'get goodsInfo error!'
                })
            }
        },
        /* 7.打开新增弹窗 */
        addBefore(){
            console.log('新增商品');
            this.isEdit = null;
            /* 打开弹窗 */
            this.dialogFormVisible = true;
            /* 清空表单、校验 */
            this.$nextTick(() => {
                this.$refs["dialogForm"].resetFields();
            });
        },
        /* 8.新增|编辑商品 */
        formSubmite(){
            this.$refs['dialogForm'].validate(async(valid)=>{
                /* 校验通过，发送添加请求 */
                if(valid){
                    /* 8.1 编辑 */
                    if(this.isEdit){
                        let {data} = await this.$request.put(`/goods/${this.isEdit}`,{
                            ...this.goodsForm
                        });
                        if(data.code===1){
                            this.$message({
                                type:'success',
                                message:'put success!'
                            });
                            this.$refs['dialogForm'].resetFields();
                            this.dialogFormVisible = false;
                            this.getSearch()
                        }else{
                            this.$message.error({
                                message:'put error!'
                            })
                        }
                    }
                    /* 8.2 新增 */
                    else{
                        let {data} = await this.$request.post('/goods',{
                            ...this.goodsForm
                        })
                        /* 添加成功 */
                        if(data.code===1){
                            this.$message({
                                type:'success',
                                message:'add success!'
                            })
                            this.$refs['dialogForm'].resetFields();
                            this.dialogFormVisible = false;
                            this.getSearch()
                        /* 添加失败 */
                        }else{
                            this.$message.error({
                                message:'add error!'
                            })
                        }   
                    }
                /* 校验不通过 */
                }else{
                    this.$message.error({
                        message:'Check failed!'
                    })
                }
            })
        },
        /* 9.删除 */
        deleteGoods(id){
            console.log('删除商品',id);
        }
    },
    created(){
        this.getSearch()
    }
}
</script>
