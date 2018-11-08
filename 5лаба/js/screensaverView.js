var View = function() {
    this.container = document.getElementById("container");
    this.colorchangebutton = document.getElementById('colorchange');
    this.countchangebutton = document.getElementById('countchange');
    this.horverchangebutton = document.getElementById('horverchange');
    this.clearscreenbutton = document.getElementById('clearscreen');
    this.clickline = null;
    // this.svg = document.getElementById('Mysvg');

    this.mysvg=document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    this.mysvg.setAttribute('width','1400');
    this.mysvg.setAttribute('height','900');

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

}

View.prototype.changecolorforbutton = function () {
    var letters = '0123456789ABCDEF';
    var randomcolor1 = '#';
    for (var i = 0; i < 6; i++) {
        randomcolor1 += letters[Math.floor(Math.random() * 16)];
    }
    this.colorchangebutton.style.backgroundColor = randomcolor1;
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
View.prototype.hexToRgb = function (hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
}



View.prototype.getcolor = function () {
    return this.colorchangebutton.style.backgroundColor;
}
View.prototype.randomColorSVG = function () {
    var r = Math.floor(Math.random() * (255 - 0)) + 0;
    var g = Math.floor(Math.random() * (255 - 0)) + 0;
    var b = Math.floor(Math.random() * (255 - 0)) + 0;
    return [r,g,b];
}


View.prototype.render = function (obj) {
    var tmpstring = Object.create(obj);
    var stringcolor = "rgb("+this.hexToRgb(tmpstring.color.slice(1))+")";
    if(stringcolor === "rgb(0,0,0)")
        stringcolor = obj.color;
    var tmp = this;

    for(var i=1;i<obj.countline;i++)
    {
        var tmp = this;
        var delay=150;
        setTimeout(function(i) {
            return function() {
                tmp.drawHorizontal(obj.arrlines[i-1],obj.arrlines[i],stringcolor,obj.zIndex);
            };
        }(i), delay*(i));
    }
}

View.prototype.drawHorizontal = function (line1,line2,color,zindex) {
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    newElement.setAttribute('x1',line1[0].toString());
    newElement.setAttribute('y1',line1[1].toString());
    newElement.setAttribute('x2', line2[0].toString());
    newElement.setAttribute('y2',line1[1].toString());
    newElement.setAttribute('stroke',color);
    newElement.setAttribute('class','newline'+zindex);
    newElement.setAttribute('stroke-width','6');
    this.mysvg.appendChild(newElement);
    document.body.appendChild(this.mysvg);
    newElement.addEventListener('click', function() {
        var id = newElement.className.animVal;
        var mass = document.getElementsByClassName(id);
        var randcolor = screenView.randomColorSVG();
        var stringcolor = "rgb("+randcolor[0]+","+randcolor[1]+","+randcolor[2]+")";
        for(var i=0;i<mass.length;i++)
        {
            mass[i].style.stroke = stringcolor;
        }
    });

    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    newElement.setAttribute('x1',line2[0].toString());
    newElement.setAttribute('y1',line1[1].toString());
    newElement.setAttribute('x2', line2[0].toString());
    newElement.setAttribute('y2',line2[1].toString());
    newElement.setAttribute('stroke',color);
    newElement.setAttribute('class','newline'+zindex);
    newElement.setAttribute('stroke-width','6');
    this.mysvg.appendChild(newElement);
    document.body.appendChild(this.mysvg);
    newElement.addEventListener('click', function() {
        var id = newElement.className.animVal;
        var mass = document.getElementsByClassName(id);
        var randcolor = screenView.randomColorSVG();
        var stringcolor = "rgb("+randcolor[0]+","+randcolor[1]+","+randcolor[2]+")";
        for(var i=0;i<mass.length;i++)
        {
            mass[i].style.stroke = stringcolor;
        }
    });
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
    this.mysvg.innerHTML = "";
}


var screenView = new View();





