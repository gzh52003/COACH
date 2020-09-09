<template id="inputGroup">
<div v-if="getVcodeShow">
 <label for="vCode">验证码:   
 <input type="text" id="vCode" placeholder="请输入验证码" @change="postVcode" v-bind="codeVal" ref="code">
 <span v-html="vcode" id="vcode_html">axyx</span></label>
 <label for="mdl"> <input type="checkbox" id="mdl" ref="mdl" v-bind="mdl" @click="postMDL" checked>
 <span>免登录</span>
 <span id="freeReg" @click="goto('/reg')">免费注册</span>
 </label>
 </div>
</template>
<script>
import request from '../utils/request';
import throttle from '../utils/throttle';
export default {
    name:'inputGroup',
    methods:{
        goto(path){
            this.$router.replace(path)
        },
    async  getVcode(){
         const {data} =await request.get('/vcode');
         let html = data.data;
         this.vcode = html;
        },
        postVcode(){
            
            this.$emit('getVcodeVal',this.$refs.code.value)
        },
        postMDL(){
            this.$emit('getMdlVal',this.$refs.mdl.checked)
        }
    },
    created(){
     this.getVcode();
    },
    data(){
        return{
            vcode:'',
            codeVal:'',
            mdl:''
        }
    },
    computed:{
    getVcodeShow(){
        return this.$store.getters.getVcodeShow
     }
    }
}
</script>
<style lang="scss" scoped>
 label{
     margin-left: 4%;
     line-height: 40px;
     color: #646566;
     text-align: left;
     font-size: 14px;
     line-height: 40px;
     display: block;
     #vCode{
         border: none;
         outline: none;
         width: 40%;
         height: 30px;
         vertical-align: middle;
         margin-left: 30px;
     }
     span{
         display: inline-block;
         vertical-align: middle;
         height: 32px;
         padding: 0 10px;
         text-align: center;
         line-height: 32px;
         margin-left: -10px;
     }
     #mdl{
         vertical-align: middle;
     }
     #freeReg{
         color: blue;
     }
     ::v-deep #vcode_html{
         svg{
             width: 80px;
             height: 32px;
             rect{
                 height: 80px;
                 width: 200px;
             }
         }
     }
 }
</style>