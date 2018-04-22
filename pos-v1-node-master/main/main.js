
const loadAllItems = require('./datbase');
const loadPromotions = require('./discount');

module.exports = function main(inputs) {

    //定义一个对象保存数据
    function  Menu(id,count,name,price,unit) {
        this.id = id;
        this.name = name;
        this.count = count;
        this.price = price;//单位
        this.unit = unit;//小计
        this.sum = null;//优惠数量
        this.discountsNum = null;//优惠总价
        this.discountsPrice = null;
    }
//取出商品名称和数量
    let menu = [];

    inputs.forEach(item=>{
        let id = /^\w{10}/.exec(item);
        id = id[0];
        let num = /[-](\d)+$/.exec(item);
        let count = 1;
        num === null ?count = 1:count = num[1];
        menu.some(value =>value.id ===id)?menu.find(value => value.id ===id).count++:menu.push(new Menu(id,count));

    });

    // //与loadAllItems()中对比并取出价格,名字，单位,小计与优惠
    menu.forEach(value =>{
        if(loadAllItems().some(item => item.barcode === value.id)){
            value.price = loadAllItems().find(item => item.barcode === value.id).price;
            value.name = loadAllItems().find(item => item.barcode === value.id).name;
            value.unit = loadAllItems().find(item => item.barcode === value.id).unit;
            let a = loadPromotions()[0].barcodes;

            if((value.id === a[0]||a[1]||a[2])&&value.count%2>0){
                value.discountsNum = value.count%2;
                value.discountsPrice = value.count%2 * parseFloat(value.price,10);
            }
            value.discountsPrice?
                value.sum = parseFloat(value.price,10) * parseFloat(value.count,10) - parseFloat(value.discountsPrice,10):
                value.sum = parseFloat(value.price,10) * parseFloat(value.count,10) - 0

        }
    });
    //输出字符串
    let headlist = '***<没钱赚商店>购物清单***\n';
    let bodylist = '';
    let discountList ='挥泪赠送商品：\n';
    let summary = 0;
    let discountSummary = 0;
    for(let i = 0; i<menu.length;i++) {
        bodylist += '名称：'+menu[i].name+'，数量：'+menu[i].count+menu[i].unit+'，单价：'+(menu[i].price).toFixed(2)+'(元)，小计：'+(menu[i].sum).toFixed(2)+'(元)\n';
        if(menu[i].discountsNum){
            discountList += '名称：'+menu[i].name+'，数量：'+menu[i].count%2+menu[i].unit+'\n' ;
        }
        summary += menu[i].sum;
        if(menu[i].discountsNum){
            discountSummary += parseFloat(menu[i].discountsNum) * parseFloat(menu[i].discountsPrice);
        }
    }
    let list = '----------------------\n';
    let end = '总计：'+summary.toFixed(2)+'(元)\n'+'节省：'+discountSummary.toFixed(2)+'(元)\n';
    let result = headlist+bodylist+list+discountList+list+end+'**********************';

    console.log(result);
    // return result;
};

