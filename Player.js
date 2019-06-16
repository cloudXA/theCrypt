//定义玩家构造函数
( function () {

    var  Player = function (name, health) {

    var newLine = spacer.newLine();
    
    var items = [];
    //创建并赋值给place属性前，先将空值null分配给place
    var place = null;

    //从get函数返回玩家名称信息的字符串
    var getNameInfo = function() {
        return name;
    };
    var getHealthInfo = function () {
        return " ( " + health + " ) ";
    };
    
    var getItemsInfo = function () {
        var itemsString = "Items:" + newLine;
        items.forEach(function (item,i) {
            itemsString += " - " + item + newLine;
        });
        
        return itemsString;
    };
    //函数私有化，共内部函数使用
    var getTitleInfo = function () {
        return getNameInfo() + " " + getHealthInfo();
    };

    var getInfo = function () {
        var info = spacer.box(getTitleInfo(),40, "*");
        info += " " + getItemsInfo();
        info += spacer.line(40, "*");
        info += newLine;
        return info;
    };
    
    //此处为接口吗？
    //定义一个方法为物品数组添加元素
    this.addItem = function (item) {
        items.push(item);
    };
    this.setPlace = function (destination) {
        place = destination;
    };
    this.getPlace = function () {
        return place;
    };
    //定义一个方法获取玩家信息字符串并显示
    this.showInfo = function(character) {
        console.log(getInfo(character));
    };
  };
    
    //确保有一个名为theCrypt的全局命名空间
    if(window.theCrypt === undefined) {
        window.theCrypt = {};
    }
    //将Player构造函数分配给theCrypt命名空间
    theCrypt.Player = Player;
    
}) ();
