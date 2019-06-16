//使用一种方法，将地图数据对象作为参数，创建地点模型

(function () {
    var buildMap = function (mapDate) {
        var placesStore = {};

        var buildPlace = function (placeDate) {
         //用标题和描述调用Place构造函数
            var place= new theCrypt.Place(
                placeDate.title,
                placeDate.description
            );
        //从地图仓库中检索地图模型
            if (placeDate.items !== undefined) {
                placeDate.items.forEach(place.addItem);
            };

        //从地图仓库中检索地图模型
            placesStore[placeDate.title] = place;

    };

    var buildExits = function (placeDate) {
        //为地图模型数据中的每个模型添加出口
        var here = placesStore[placeDate.title];

        if(placeDate.exits !== undefined) {
            placeDate.exits.forEach(function (exit) {
                var there = placesStore[exit.to];
                //为地点数据中的每个出口添加一个挑战
                here.addExit(exit.direction, there);
                // here.addChallenge(exit.direction, exit.challenge);
            });
        }
    };

    //为每个地点创建一个模型
    mapDate.places.forEach(buildPlace);

    //为每个地点添加出口
    mapDate.places.forEach(buildExits);

    //返回游戏中第一份位置的模型
    return placesStore[mapDate.firstPlace];
    };

    // 将地图构造器作为方法传递给全局变量theCrypt

    if (window.theCrypt === undefined) {
        window.theCrypt = {};
    }

    theCrypt.buildMap = buildMap;

}) ();    




