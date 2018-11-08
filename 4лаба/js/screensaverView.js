var View = function() {
    this.container = document.getElementById("container");
    this.colorchangebutton = document.getElementById('colorchange');
    this.countchangebutton = document.getElementById('countchange');
    this.horverchangebutton = document.getElementById('horverchange');
    this.clearscreenbutton = document.getElementById('clearscreen');
    this.clickline = null;
    this.canvas = document.getElementById("myCanvas");
    this.canvas.width = 1400;
    this.canvas.height = 900;


    this.context = this.canvas.getContext("2d");

    this.clickToCanvasEvent = null;
    this.colorchangeEvent = null;
    this.countchangeEvent = null;
    this.horverchangeEvent = null;
    this.clearscreenEvent = null;

    this.lineisdrawhor = true;
};

View.prototype.init = function () {
    this.colorchangebutton.addEventListener("click", this.colorchangeEvent);
    this.countchangebutton.addEventListener("click", this.countchangeEvent);
    this.horverchangebutton.addEventListener("click", this.horverchangeEvent);
    this.clearscreenbutton.addEventListener("click", this.clearscreenEvent);
    this.canvas.addEventListener("click", this.clickToCanvasEvent);

}

View.prototype.changecolorforbutton = function () {
    var letters = '0123456789ABCDEF';
    var randomcolor = '#';
    for (var i = 0; i < 6; i++) {
        randomcolor += letters[Math.floor(Math.random() * 16)];
    }
    this.colorchangebutton.style.backgroundColor = randomcolor;
}

View.prototype.changecount = function () {
    var str = this.screenView.countchangebutton.value;
    str = str.slice(str.length-3,str.length);
    var number = parseInt(str) + 2;
    if( number == 20)
        number = 2;
    this.screenView.countchangebutton.value = "Кол-во линий :  " +number ;
}

View.prototype.getcount = function () {
    var str = this.countchangebutton.value;
    str = str.slice(str.length-3,str.length);
    var number = parseInt(str);
    return (number+2)/2;
}

View.prototype.getcolor = function () {
    return this.colorchangebutton.style.backgroundColor;
}
View.prototype.render = function (obj) {

        var masslines = [];
        for(var i=1;i<obj.countline;i++)
        {
            var tmp = this;
            var delay=150;
            //setTimeout(this.drawHorizontal(obj.arrlines[i-1],obj.arrlines[i],obj.color),delay*i);
            setTimeout(function(i) {
                return function() {
                    //alert(i);
                    if(this.lineisdrawhor == true) {
                        tmp.drawHorizontal(obj.arrlines[i - 1], obj.arrlines[i], obj.color,masslines);
                    }
                    else{
                        tmp.drawVertical(obj.arrlines[i - 1], obj.arrlines[i], obj.color,masslines);
                    }
                };
            }(i), delay*(i));
        }
    GlobalArrLines.push(masslines);
}

View.prototype.checkLine = function (x,y) {
    var k = 3;
    for(var i=0;i<GlobalArrLines.length;i++) {
        for (var j = 1; j < GlobalArrLines[i].length; j++) {
            // верикальная линия
            if (GlobalArrLines[i][j - 1][0] == GlobalArrLines[i][j][0] && GlobalArrLines[i][j - 1][1] == GlobalArrLines[i][j][1])
                continue;
            if (GlobalArrLines[i][j - 1][0] == GlobalArrLines[i][j][0]) {
                var l1 = GlobalArrLines[i][j - 1];
                var l2 = GlobalArrLines[i][j];
                var q = function () {
                    var x1 = [];
                    var x2 = [];
                    var x3 = [];
                    var x4 = [];
                }
                q.x1 = [l1[0] - k, l1[1]];
                q.x2 = [l1[0] + k, l1[1]];
                q.x3 = [l1[0] - k, l2[1]];
                q.x4 = [l1[0] + k, l2[1]];

                if (q.x1[0] <= x && q.x2[0] >= x) {
                    if ((q.x1[1] <= y && q.x3[1] >= y) || (q.x1[1] >= y && q.x3[1] <= y)) {
                        this.redrawPickedLine(GlobalArrLines[i]);
                        break;
                    }
                }
            }
            if (GlobalArrLines[i][j - 1][1] == GlobalArrLines[i][j][1]) {
                var l1 = GlobalArrLines[i][j - 1];
                var l2 = GlobalArrLines[i][j];
                var q = function () {
                    var x1 = [];
                    var x2 = [];
                    var x3 = [];
                    var x4 = [];
                }
                q.x1 = [l1[0], l1[1] + k];
                q.x2 = [l1[0], l1[1] - k];
                q.x3 = [l2[0], l2[1] + k];
                q.x4 = [l2[0], l2[1] - k];
                if ((q.x1[0] <= x && q.x3[0] >= x) || (q.x1[0] >= x && q.x3[0] <= x)) {
                    if (q.x1[1] >= y && q.x2[1] <= y) {
                        this.redrawPickedLine(GlobalArrLines[i]);
                        break;
                    }
                }
            }
            // горизонтальная
        }
    }
}




View.prototype.redrawPickedLine = function (line) {
    var rand_color = View.prototype.return_random_color();
    for(var i=1;i < line.length;i++)
    {
        this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo(line[i-1][0], line[i-1][1]);
        this.context.lineTo(line[i][0],line[i-1][1]);
        this.context.lineTo(line[i][0],line[i][1]);
        this.context.strokeStyle = rand_color;
        this.context.stroke();
        this.context.closePath();
    }
}

View.prototype.drawHorizontal = function (line1,line2,color,masslines) {
    this.context.lineWidth = 4;
    this.context.beginPath();
    this.context.moveTo(line1[0], line1[1]);
    this.context.lineTo(line2[0],line1[1]);
    this.context.lineTo(line2[0],line2[1]);
    this.context.strokeStyle = color;
    this.context.stroke();
    this.context.closePath();
    masslines.push([line1[0], line1[1]],[line2[0],line1[1]],[line2[0],line2[1]]);

}
View.prototype.drawVertical = function (line1,line2,color,masslines) {
    this.context.lineWidth = 4;
    this.context.beginPath();
    this.context.moveTo(line1[0], line1[1]);
    this.context.lineTo(line1[0],line2[1]);
    this.context.lineTo(line2[0],line2[1]);
    this.context.strokeStyle = color;
    this.context.stroke();
    this.context.closePath();
    masslines.push([line1[0], line1[1]],[line1[0],line2[1]],[line2[0],line2[1]]);
}


View.prototype.return_random_color = function () {
    var letters = '0123456789ABCDEF';
    var randomcolor = '#';
    for (var i = 0; i < 6; i++) {
        randomcolor += letters[Math.floor(Math.random() * 16)];
    }
    return randomcolor;
}

View.prototype.changehorver = function () {
    if (this.horverchangebutton.style.backgroundColor == "green")
    {
        this.horverchangebutton.style.backgroundColor = "red";
        this.lineisdrawhor = false;
    }
    else
    {
        this.horverchangebutton.style.backgroundColor = "green";
        this.lineisdrawhor = true;
    }
}


View.prototype.clearscreen = function () {
    this.context.clearRect(0, 0, 1400, 900);
}


var screenView = new View();





