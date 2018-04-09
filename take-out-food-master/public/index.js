// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释

// function loadAllItems() {
//   return [{
//     id: 'ITEM0001',
//     name: '黄焖鸡',
//     price: 18.00
//   }, {
//     id: 'ITEM0013',
//     name: '肉夹馍',
//     price: 6.00
//   }, {
//     id: 'ITEM0022',
//     name: '凉皮',
//     price: 8.00
//   }, {
//     id: 'ITEM0030',
//     name: '冰锋',
//     price: 2.00
//   }];
// }
window.onload = function() {
  let table = document.createElement("table");
  let items = document.getElementById("items");
  let menu = items.appendChild(table);
  let i = 0;
  for (i; i < loadAllItems().length; i++) {
    let tr = menu.appendChild(document.createElement("tr"));
    for (let j = 0; j < 4; j++) {
      tr.appendChild(document.createElement("td"));
    }
    let tdlist = tr.getElementsByTagName("td");
    tdlist[3].setAttribute("contenteditable", "true");
    tdlist[3].setAttribute("class", "number");

    tdlist[0].innerHTML = loadAllItems()[i].id;
    tdlist[1].innerHTML = loadAllItems()[i].name;
    tdlist[2].innerHTML = loadAllItems()[i].price + "元";
    tdlist[3].innerHTML = "数量:0 ";

    let promotions = document.getElementById("promotions");
    promotions.innerHTML = "优惠信息："+"</br>"+loadPromotions()[0].type +"\n"+"或者"+"\n" + loadPromotions()[1].type;

  }
};

function calculatePrice() {
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
  function getClass(clazz){
    let classList = [];
    let nameList = document.getElementsByTagName("td");
    nameList.forEach(item =>{
      if(item.class === clazz){
        classList.push(item);
      }
    });
    return classList;
  }
  alert(getClass(number)[0]);
  // let number = getClass(number);
  // number.forEach(item =>{
  //   alert(item);
  // })
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能

}

