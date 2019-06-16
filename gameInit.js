
(function () {
    var getGame = function() {

        var render = function () {
            console.clear();
            player.getPlace().showInfo();
            player.showInfo();
        };

        // 将地图数据传递给build Map函数
        var firstPlace = theCrypt.buildMap(theCrypt.mapDate);

        var player = new theCrypt.player("kandra",50);
        player.addItem("The Sword of Doom");
        player.setPlace(firstPlace);

        render();

        // 返回公共接口
        return {
            t:firstPlace,
            go: function (direction) {
                var place = player.getPlace();
                var destination = place.getExit(direction);

                if (destination !== undefined) {
                    player.setPlace(destination);
                    render();
                    return "";
                } else {
                    return "there is no exit in that direction";
                }
            },
            get: function () {
                var place = player.getPlace();
                var item = place.getLastItem();

                if (item !== undefined) {
                    player.addItem(item);
                    render();
                    return "";
                } else {
                    return "there is no item to get ";
                }
            }
        };

    };

        if(window.theCrypt === undefined) {
            window.theCrypt = {};
        }

        theCrypt.getGame = getGame;

}) ();

    
