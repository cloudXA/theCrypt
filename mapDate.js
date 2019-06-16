    //地图数据
    (function () {
  
        var mapDate = {
          "title" : "The Dark House",
          "firstPlace" : "The Kitchen",
        
          "places" : [
            {
              "title" : "The Kitchen",
              "description" : "You are in a kitchen. There is a disturbing smell.",
              "items" : [ "a piece of cheese" ],
              "exits" : [
                { "direction": "south", "to": "The Old Library" },
                { "direction": "west",  "to": "The Kitchen Garden" },
                { "direction": "east",  "to": "The Kitchen Cupboard" }
              ]
            },
            {
              "title" : "The Old Library",
              "description" : "You are in a library. Dusty books line the walls.",
              "items" : [ "a rusty key" ],
              "exits" : [
                { "direction" : "north", "to" : "The Kitchen" }
              ]
            },
            {
              "title" : "The Kitchen Garden",
              "description" : "You are in a small, walled garden.",
              "exits" : [
                { "direction" : "east", "to" : "The Kitchen" }
              ]
            },
            {
              "title" : "The Kitchen Cupboard",
              "description" : "You are in a cupboard. It's surprisingly roomy.",
              "items" : [ "a tin of Spam" ],
              "exits" : [
                { "direction" : "west", "to" : "The Kitchen" }
              ]
            }
          ]
        };
      
        if (window.theCrypt === undefined) {
          window.theCrypt = {};
        }
        
        theCrypt.mapDate = mapDate;
        
      })();
                
        