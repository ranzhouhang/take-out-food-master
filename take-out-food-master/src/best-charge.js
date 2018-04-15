
// const loadAllItems = require('../src/items.js');
// const loadPromotions = require('../src/promotions.js');

// module.exports =

  function bestCharge(selectedItems) {
  let idname = [];
  let menuname = [];
  let smallresult = [];
  let num = [];
//数量和id号
  selectedItems.forEach(item=> {
    let id = /\w{8}/i.exec(item);
    let nums = /\d$/.exec(item);
    idname.push(id[0]);
    num.push(nums[0]);
  });
//点的东西
  idname.forEach(item =>{
    if(loadAllItems().some(value=>value.id===item)){
      menuname.push(loadAllItems().find(value=>value.id===item));
    }
  });
  let result = 0;
  let headList = "============= 订餐明细 ============="+"\n";
  let line = "-----------------------------------"+"\n";
  let bodyList = "";
  for(let i = 0;i < num.length;i++){
    bodyList += menuname[i].name+" x "+num[i]+" = "+menuname[i].price*num[i]+"元"+"\n";
    smallresult.push(menuname[i].price*num[i]);
  }
//优惠信息
//总计
  let result0 = 0;
  smallresult.forEach(item=>{
    let add = parseInt(item);
    result0 += add;
  });
//第一种优惠
  function youhui1(){
    let result1 = 0;
    if(result0 >= 30){
      result1 = result0 - 6;
    }
    return result1;
  }
//第二种优惠
  function youhui2(){
    let result2 = 0;
    menuname.forEach(item=>{
      if((loadPromotions()[1].items).some(value=>value===item.id)){
        item.price = parseInt(item.price)/2;
      }
    });
    for(let i = 0;i<num.length;i++){
      result2 += menuname[i].price*num[i];
    }
    return result2;
  }
  result2 = youhui2();
  result1 = youhui1();
//总计
  if(result1>=result2){
    result = result2;
  } else{
    result = result1;
  }
//使用优惠
  let youhui = "";
  if(result0>result&&result!==0){
    youhui = "使用优惠:"+"\n";
    if(result1>result2){
      youhui +="指定菜品半价(黄焖鸡，凉皮)，省13元"+"\n"+line;
    }else{
      youhui +="满30减6元，省6元"+"\n"+line;
    }
  }else{
    result = result0;
  }
  let lastline = "===================================";
  resultlist = headList+bodyList+line+youhui+"总计："+result+"元"+"\n"+lastline;
  return  resultlist/*TODO*/;
}
// ;
