const mysql=require('mysql');
const express=require('express');
const cors=require('cors');

const Pool=mysql.createPool({
   host: '127.0.0.1',
   port:'3306',
   user: 'root',
   password: '',
   database: 'yht'
})

const server=express();
server.listen(3000);

server.use(express.static('public'));
server.use(cors({
   origin: 'http://176.122.14.154:8080',
   credentials:true
}))

//轮播图路由
server.get("/swipe",(req,res)=>{
   var sql=`select sid,type,simg_url from yht_swipe`
   Pool.query(sql,(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         res.send({code:1,data:result});
      }else{
         res.send({code:-1,data:[]});
      }
   })
})

// 奶茶列表路由
server.get("/laptop",(req,res)=>{
   var arr=['波霸','冰沙','奶盖','水果','咖啡','小吃'];
   var obj={code:1,data:[]};
   var pagress=0;
   for(var i=0;i<arr.length;i++){
      var sql = `select lid,lname,price,img_url,submit,classification,num from yht_laptop where classification like concat('%',?,'%')`;
      Pool.query(sql,[arr[i]],(err,result)=>{
         if(err)throw err;
         if(result.length>0){
            pagress++;
            switch (pagress) {
               case 1:
                  obj.data[0]=result;
               case 2:
                  obj.data[1]=result;
               case 3:
                  obj.data[2]=result;
               case 4:
                  obj.data[3]=result;
               case 5:
                  obj.data[4]=result;  
               default:
                  obj.data[5]=result;
            }
            if(pagress>=6){res.send(obj)}
         }
      })
   }
})









