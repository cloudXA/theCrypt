//定义命名空间对象
var spacer = {
    //返回空字符
    blank: function (){
        return "";
    },
    //返回换行符
    newLine: function () {
        return "\n";
    },
    //返回指定长度的字符
    line: function (length, character) {
        var longString = "****************************************";
        longString += "----------------------------------------";
        longString += "========================================";
        longString += "++++++++++++++++++++++++++++++++++++++++";
        longString += " ";
        length = Math.max(0, length);
        length = Math.min(40,length);
        return longString.substr(longString.indexOf(character), length);

    },
    //使用字符和新增加的首位空格填充文本
    wrap: function (text, length, character) {
        var padLength = length - text.length + 3;
        var wrapText = character + " " + text;
        wrapText += spacer.line(padLength, " ");
        wrapText += character;
        return wrapText;
    },
    //将文本置于指定字符的框内
    box: function (text, length, character) {
        var boxText = spacer.newLine();
        boxText += spacer.line(length, character) + spacer.newLine();
        boxText += spacer.wrap(text, length, character) + spacer.newLine();
        boxText += spacer.line(length, character) + spacer.newLine();
        return boxText;
    }
}


//定义Place构造函数
function Place (title, description) {
    var newLine = spacer.newLine();
    this.title = title;
    this.description = description;
    this.items = [];
    //创建一个空数组，将其赋值给属性exits
    // this.exits = [];

    //将exit属性从数组改为对象
    this.exits = {};
    //定义一个getItems方法构建物品字符串
    this.getItems = function(){
        var itemsString = "Items: " + newLine;
        this.items.forEach(function(item,i){
            itemsString += " - " + item;
            itemsString += newLine;
        });
        return itemsString;
    };
    //定义一个getExits方法构建出口信息字符串
    this.getExits = function() {
        var exitsString = "Exits from " + this.title;
        exitsString += ":" + newLine;
        // this.exits.forEach(function(exit,i){
        //     exitsString += " - " + exit.title;
        //     exitsString += newLine;
            Object.keys(this.exits).forEach(function (key) {
                exitsString += " - " + key;
                exitsString += newLine; 
            });
        // });
        return exitsString;
    };
    this.getTitle = function() {
        return spacer.box(
            this.title,
            this.title.length + 4,
            "="
        );
    };
    this.getInfo = function () {
        //使用新方法来构造信息字符串
        var infoString = this.getTitle();
        infoString += this.description;
        infoString += newLine + newLine;
        infoString += this.getItems() + newLine;
        infoString += this.getExits();
        infoString += spacer.line(40, "=") + newLine;
        return infoString;
    };
    this.showInfo = function () {
        console.log(this.getInfo());
    };
    this.addItem = function (item) {
        this.items.push(item);
    };

    //定义addExit方法，将一个新场所添加到exits数组
    // this.addExit = function (exit) {
    //     this.exits.push(exit);
    // };
    //更新addExit函数以使用exits对象

    this.addExit = function (direction, exit) {
        this.exits[direction] = exit;
    }


};




//定义玩家构造函数
function Player (name, health) {
    var newLine = spacer.newLine();
    this.name = name;
    this.health = health;
    this.items = [];
    //创建并赋值给place属性前，先将空值null分配给place
    this.place = null;
    //定义一个方法为物品数组添加元素
    this.addItem = function (item) {
        this.items.push(item);
    };
    //从get函数返回玩家名称信息的字符串
    this.getName = function() {
        return this.name;
    };
    this.getHealth = function () {
        return this.name + " has health " + this.health;
    };
    //使用已分配给this.place的place对象的title属性
    this.getPlace = function () {
        return this.name + " is in " + this.place.title;
    };
    this.getItems = function () {
        var itemsString = "Items:" + "\n";
        this.items.forEach(function(item,i) {
            itemsString += " - " + item + "\n";
        })
        return itemsString;
    };
    this.getInfo = function (character) {
        var place = this.getPlace();
        var health = this.getHealth();
        var longest = Math.max(place.length,health.length) + 4;
        //使用spacer方法对玩家信息进行格式化处理
        var info = spacer.box(this.getName(), longest, character);
        info += spacer.wrap(place, longest, character);
        info += newLine + spacer.wrap(health, longest, character);
        info += newLine + spacer.line(longest, character);
        info += newLine;
        info += " " + this.getItems();
        info += newLine;
        info += spacer.line(longest, character);
        info += newLine;
        return info;
    };
    //定义一个方法获取玩家信息字符串并显示
    this.showInfo = function() {
        console.log(this.getInfo("*"));
    };
};


//定义render函数清除控制台和玩家信息
var render = function () {
    console.clear();
    player1.place.showInfo();
    player1.showInfo("*");


};
//定义go,将玩家移动到指定方向的地方
var go = function (direction) {
    player1.place = player1.place.exits[direction];
    render();
    return "";
};
//定义get,让玩家拾取物品
var get = function () {
    var item = player1.place.items.pop()
    player1.addItem(item);
    render();
    return "";
}



//构造对象
var kitchen = new Place (
    "the kitchen",
    "you are in a kitchen ,There is a disturbing smell"
);
var library = new Place (
    "the old library",
    "you are in a library.dusty books line the walls"
);
var garden = new Place (
    "the kitchen garden",
    "you are in a cupiboard. It's surprisingly roomy"
);
var cupboard = new Place (
    "the kitchen cupboard",
    "you are in a cupboard, it is surprisingly"
);

//为每个地点添加物品
kitchen.addItem("a piece of cheese");
library.addItem("a rusty key");
cupboard.addItem("a tin of spam");

//为厨房添加出口
kitchen.addExit("south", library);
kitchen.addExit("west",garden);
kitchen.addExit("east", cupboard);


//添加通往厨房的窗口
library.addExit("north",kitchen);
garden.addExit("east",kitchen);
cupboard.addExit("west",kitchen);




//创建玩家，给他们一把剑，并把他们放在厨房
var player1 = new Player("kandra",50);
player1.addItem("the sword of doom");
player1.place = kitchen;
render();
go("south");
get();





