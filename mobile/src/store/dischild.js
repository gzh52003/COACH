import request from '../utils/request'
const dischild = {
    state:{
      show:'男衣',
      topAdv:'/img/nt.jpg',
      distitleArr:['潮流新品','精品优惠','崭新上架'],
      discoverlist:[

      ],
      discoverareaOne:[

      ],
      discoverareaTwo:[

      ]
    },
    getters:{
      topAdv(state){
          return state.topAdv;
      }
    },
    mutations:{
      async  changeShow(state,payload){
          let {tag} = payload;
          let num  = 0;
        async  function async1(){
            if(tag[0]){
                const res1 = await request.post('/goods/dis',{
                    tag:  tag[0]
                })
    
                let sed1 = res1.data.data.result;
                while(sed1.length % 3 !== 0){
                   sed1.pop();
                  }
                  state.discoverlist = sed1;
                  num++;
        }
        }
        async function async2(){
            if(tag[1]){
                const res2 = await request.post('/goods/dis',{
                  
                    tag:  tag[1]
          
                })
                let sed2 = res2.data.data.result;
                while(sed2.length % 3 !== 0){
                    sed2.pop();
                  }
                  state.discoverareaOne = sed2
                  num ++;
        }
        }
        async function async3(){
            if(tag[2]){
            
                const res3 = await request.post('/goods/dis',{
                  
                    tag:  tag[2]
        
                 })
                 let sed3 = res3.data.data.result;  
                 while(sed3.length % 3 !== 0){
                    sed3.pop();
                  } 
                  state.discoverareaTwo = sed3
                  num++ 
        }
        } 
        async1();
        async2();
        async3();
        let timer = setInterval(() => {
         if(3 === num){
             console.log('已经完成');
             clearInterval(timer);
         }
        }, 0);
      },
      changetitleArr(state,payload){
        let {arr} = payload;
        state.distitleArr = arr;
      },
      async inits(state,payload){
        const {data:{data:recommed}} = await request.get('/goods',{
            params:{
              size:9,
              sort:"praise",
              total:0
            }
          }); 
          const {data:{data:time}} = await request.get('/goods',{
            params:{
              size:9,
              sort:"addTime",
              total:0
            }
          }); 
          const {data:{data:price}} = await request.get('/goods',{
            params:{
              size:9,
              sort:"price",
              total:0
            }
          }); 
          state.discoverlist = recommed;
          state.discoverareaOne = time;
          state.discoverareaTwo = price;
      },
      async cutAdv(state,payload){
      const {img} = payload;
      console.log('img',img)
      state.topAdv = img;
      }
    },
    actions:{
      changeData(context,payload){
         let {tag} = payload;
         context.commit('changeShow',{tag});
      },
      trgInit(context){
        context.commit('inits')
      },
      changeAdv(context,payload){
         context.commit('cutAdv',payload)
         console.log(payload)
      }
    }
}
export default dischild;