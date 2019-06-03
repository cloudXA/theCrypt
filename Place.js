//定义Place构造函数
(function Place (title, description) {
    var newLine = spacer.newLine();
    //var 关键词创建私有变量
    var items = [];
    //创建一个空数组，将其赋值给属性exits
    // this.exits = [];

    //将exit属性从数组改为对象
    var exits = {};
    //定义一个getItemsInfo函数构建物品字符串
    var getItemsInfo = function(){
        var itemsString = "Items: " + newLine;
        items.forEach(function(item,i){
            itemsString += " - " + item;
            itemsString += newLine;
        });
        return itemsString;
    };
    //定义一个getExitsInfo函数构建出口信息字符串
    var getExitsInfo = function() {
        var exitsString = "Exits from " + title;
        exitsString += ":" + newLine;
        // this.exits.forEach(function(exit,i){
        //     exitsString += " - " + exit.title;
        //     exitsString += newLine;
            Object.keys(exits).forEach(function (key) {
                exitsString += " - " + key;
                exitsString += newLine; 
            });
        // });
        return exitsString;
    };
    //定义getTitleInfo函数获得出口名称,并直接调用title参数
    var getTitleInfo = function() {
        return spacer.box(
            title,
            title.length + 4,
            "="
        );
    };
    //定义getInfo函数整合以上函数信息，直接调用description参数，同级函数
    var getInfo = function () {
        //使用新方法来构造信息字符串
        var infoString = getTitleInfo();
        infoString += description;
        infoString += newLine + newLine;
        infoString += getItemsInfo() + newLine;
        infoString += getExitsInfo();
        infoString += spacer.line(40, "=") + newLine;
        return infoString;
    };

    
    //此处为接口吗？
    this.showInfo = function () {
        console.log(getInfo());
    };
    this.addItem = function (item) {
        items.push(item);
    };
    this.addExit = function (direction,exit) {
        exits[direction] = exit;
    }

    
    //添加一个公共方法来访问目的地
    this.getExit = function (direction) {
        return exits[direction];
    };
    
    //添加一个公共方法从items数组中获取最后一项元素
    this.getLastItem = function () {
        return items.pop(); 
    }

    //确保有一个名为theCrypt的全局命名空间
    if(window.theCrypt === undefined) {
        window.theCrypt = {};
    }
     //将Player构造函数分配给theCrypt命名空间
    theCrypt.Place = Place;

}) ();