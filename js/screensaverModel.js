var Zindexline = 1;

var Model = function (stcount,color,flag) {
    this.color = color;
    this.zIndex = 2;
    this.standartcount = stcount;
    this.countline = 0;
    this.arrlines = [];
    this.colorchange = flag;
};

Model.prototype.init = function () {
    this.zIndex = Zindexline;
    Zindexline = Zindexline + 1;
    this.setcolor();
    this.setcountArr();
    this.setArrayLines();
}

Model.prototype.setcolor = function () {
    if(this.colorchange == false)
    {
        var letters = '0123456789ABCDEF';
        var randomcolor = '#';
        for (var i = 0; i < 6; i++) {
            randomcolor += letters[Math.floor(Math.random() * 16)];
        }
        this.color = randomcolor;
    }
}


// 1400 на 900
Model.prototype.setstandartcount = function (q) {
    this.standartcount = q;
}

Model.prototype.setcountArr = function () {
    this.countline = getRandomInt(this.standartcount,this.standartcount);
}
Model.prototype.setArrayLines = function () {
    for(var i=0;i<this.countline;i++)
    {
        var array = [getRandomInt(0,1400),getRandomInt(0,900)];
        this.arrlines.push(array);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Model.prototype.newLine = function () {
    this.init();
}



var screenModel = new Model();
//screenModel.init();


