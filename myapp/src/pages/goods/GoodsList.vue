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
                    <!-- scope指整个数据对象。scope.row指当前行数据 -->
                    <img :src="scope.row.goodPic" alt style="width:100px;height:100px;" />
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
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="/goods"
                        :file-list="fileList"
                        :http-request="httpRequest"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-change="onChange"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        multiple
                        :limit="1"
                        name="photos"
                        :auto-upload="false"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
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
                    <el-date-picker v-model="goodsForm.addTime" type="date" value-format="yyyy-MM-dd">
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
            },
            /* 图片信息 */
            fileList:[]
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
            this.isEdit = id;                   // 设置编辑弹窗开关
            this.dialogFormVisible = true;      // 打开弹窗
            this.fileList = [];                 // 清空图片回显
            let {data} = await this.$request.get(`/goods/${this.isEdit}`);
            console.log(data);
            if(data.code){
                /* 渲染表单 */
                this.goodsForm = data.data.data[0];
                /* 设置图片回显 */
                let picData = {
                    name:this.goodsForm.fileName,
                    url:this.goodsForm.goodPic
                }
                this.fileList.push(picData)
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
            /* 清空图片列表 */
            this.fileList = [];
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
                        /* 手动提交图片的关键 */
                        this.$refs.upload.submit();

                        /* 创建表单对象把表单数据写入其中 */
                        let form = new FormData();
                        form.append("gid", this.goodsForm.gid);
                        form.append("goodName", this.goodsForm.goodName);
                        form.append("salePrice", this.goodsForm.salePrice);
                        form.append("oldPrice", this.goodsForm.oldPrice);
                        form.append("storageNum", this.goodsForm.storageNum);
                        form.append("supplierName", this.goodsForm.supplierName);
                        form.append("addTime", this.goodsForm.addTime);

                        console.log(this.fileList);

                        /* 提取图片信息写入表单对象 */
                        this.fileList.forEach(file=>{
                            // form.append("files", file.raw);
                            // form.append("fileNames", file.name);
                            console.log(file);
                        })

                        let data = await this.$request({
                            url:`/goods/${this.isEdit}`,
                            method:'put',
                            headers: { 'Content-Type': 'multipart/form-data' },
                            data:form
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
                        /* 手动提交图片的关键 */
                        this.$refs.upload.submit();
                        console.log(this.goodsForm.addTime);

                        /* 创建表单对象把表单数据写入其中 */
                        let form = new FormData();
                        form.append("gid", this.goodsForm.gid);
                        form.append("goodName", this.goodsForm.goodName);
                        form.append("salePrice", this.goodsForm.salePrice);
                        form.append("oldPrice", this.goodsForm.oldPrice);
                        form.append("storageNum", this.goodsForm.storageNum);
                        form.append("supplierName", this.goodsForm.supplierName);
                        form.append("addTime", this.goodsForm.addTime);

                        /* 提取图片信息写入表单对象 */
                        this.fileList.forEach(file=>{
                            form.append("files", file.raw);
                            form.append("fileNames", file.name);
                        })

                        let {data} = await this.$request({
                            url:'/goods',
                            method:'post',
                            headers: { 'Content-Type': 'multipart/form-data' },
                            data:form
                        })
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
        async deleteGoods(id){
            console.log(id);
            /* 确定弹窗 */
            try{
                let result = await this.$confirm('此操作将永久删除该商品信息, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' });
                if(result){
                    /* 发送删除请求 */
                    let {data} = await this.$request.delete(`/goods/${id}`);
                    if(data.code===1){
                        this.$message({
                            type: 'success',
                            message: 'delete success!'
                        }); 
                        this.getSearch()
                    }else{
                        this.$message.error('delete fail!');
                    }
                }
            }
            catch(err){
                this.$message({
                    type: 'info',
                    message: 'cancel delete!'
                }); 
            }
        },
        /* 10.图片上传 */
        /* 10.1 手动发送请求 */
        httpRequest(file) {
            console.log('httpRequest=',file);
        },
        /* 10.2 图片发生上传时 */
        onChange(file, fileList) {
            console.log('onChange=',file);
            console.log('onChange=',fileList);
            /* 图片信息赋值给fileList */
            this.fileList = fileList;
        },
        /* 10.3 删除图片 */
        handleRemove(file, fileList){
            console.log('handleRemove=',file.url);
            console.log('handleRemove=',fileList);
        },
        /* 10.4  */
        handlePreview(file) {
            console.log('handlePreview', file);
        },
        /* 10.5 提示信息 */
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        /* 10.6 删除前提示 */
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    },
    created(){
        this.getSearch()
    }
}
</script>
