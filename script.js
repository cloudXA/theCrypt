//将实现包裹在一个函数中以创建局部作用域
var getGame = function () {
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
        };


        //定义Place构造函数
        function Place (title, description) {
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
            this.showInfo = function () {
                console.log(getInfo());
            };
            this.addItem = function (item) {
                items.push(item);
            };
            this.addExit = function (direction,exit) {
                exits[direction] = exit;
            }

            //定义addExit方法，将一个新场所添加到exits数组
            // this.addExit = function (exit) {
            //     this.exits.push(exit);
            // };
            //更新addExit函数以使用exits对象

            
            //添加一个公共方法来访问目的地
            this.getExit = function (direction) {
                return exits[direction];
            };
            
            //添加一个公共方法从items数组中获取最后一项元素
            this.getLastItem = function () {
                return items.pop(); 
            }

        };

        //定义玩家构造函数
        function Player (name, health) {
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
                var itemsString = "Items:" + "\n";
                items.forEach(function (item,i) {
                    itemsString += " - " + item + "\n";
                })
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

    
        //定义render函数清除控制台和玩家信息
        var render = function () {
            console.clear();
            player1.getPlace().showInfo();
            player1.showInfo();


        };

        //构造对象
        var kitchen = new Place (
            "the kitchen",
            "you are in a kitchen ,There is a disturbing smell"
        );
        var library = new Place (
            "the old library",
            "you are in a library.dusty books line the walls"
        );

        //为每个地点添加物品
        kitchen.addItem("a piece of cheese");
        library.addItem("a rusty key");


        //为厨房添加出口
        kitchen.addExit("south", library);
        kitchen.addExit("north",kitchen);
        //创建一个玩家（为局部变量），并初始化
        var player1 = new Player("kandra",50);
        player1.addItem("the sword of doom");
       
        //预先设置玩家的初始地址
        player1.setPlace(kitchen);
        //在控制台显示初始化信息
        render();


        //返回一个对象作为一个接口，玩家可以访问其函数
        return {
            go: function (direction) {
                var place = player1.getPlace();
                //获得当前位置的情况下，调用该位置的getExit方法，利用指定方向检索目的地
                var destination = place.getExit(direction);
                //检测目的地是否undefined,存在时设置新的位置
                if (destination !== undefined) {
                  //玩家找到目的地的情况下，更新玩家的位置
                     player1.setPlace(destination);
                     render();
                     return "";  
                } else {
                    return " *** 该方向没有出口 ***";
                };
                
            },
            get: function () {
                var place = player1.getPlace();
                var item = place.getLastItem();
                //检测物品是否undefined,存在时添加物品到玩家
                if (item !== undefined) {
                    player1.addItem(item);
                    render();
                    return "";
                } else {
                    return " *** 没有可获得的物品 ***";
                }
                
            }
        
        };
    };
    //调用getGame函数，返回接口对象，将其分配给game变量
    var game = getGame();
   

















