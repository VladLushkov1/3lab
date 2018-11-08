var View = function() {
    this.container = document.getElementById("container");
    this.colorchangebutton = document.getElementById('colorchange');
    this.countchangebutton = document.getElementById('countchange');
    this.horverchangebutton = document.getElementById('horverchange');
    this.clearscreenbutton = document.getElementById('clearscreen');
    this.clickline = null;

    this.colorchangeEvent = null;
    this.countchangeEvent = null;
    this.horverchangeEvent = null;
    this.clearscreenEvent = null;

    this.lineisdrawhor = true;
};

View.prototype.render = function (obj) {
    if(this.lineisdrawhor == true)
    {
        // заношу в контейнер всю линию
        var divcont = document.createElement('div');
        divcont.className = "cont"+obj.zindex;
        divcont.style.position = "absolute";
        divcont.style.zIndex = obj.zindex;

        divcont.addEventListener('click', function() {
            var Children = divcont.children;
            var randomnumber = Math.floor(Math.random() * (100 - 0)) + 0;
            var randomcolor = View.prototype.return_random_color();
            for (var i = 0; i < Children.length; i++)
            {
                if( randomnumber % 5 == 0)
                {
                    Children[i].style.backgroundColor = View.prototype.return_random_color();
                    Children[i].style.borderColor = View.prototype.return_random_color();
                }
                else{
                    Children[i].style.backgroundColor = randomcolor
                    Children[i].style.borderColor = randomcolor;
                }


            }
    });

        this.clickline = divcont;
        for(var i=1;i<obj.countline;i++)
        {
            var tmp = this;
            var delay=250;
            setTimeout(function(i) {
                return function() {
                    tmp.drawHorizontal(obj.arrlines[i-1],obj.arrlines[i],obj.color,obj.zIndex,divcont);
                };
            }(i), delay*(i));
        }
    }
    else{
        for(var i=1;i<obj.countline;i++)
        {
            var tmp = this;
            var delay=250;
            setTimeout(function(i) {
                return function() {
                    tmp.drawVerChanged(obj.arrlines[i-1],obj.arrlines[i],obj.color,obj.zIndex);
                };
            }(i), delay*(i));
        }
    }
}

View.prototype.return_random_color = function () {
    var letters = '0123456789ABCDEF';
    var randomcolor = '#';
    for (var i = 0; i < 6; i++) {
        randomcolor += letters[Math.floor(Math.random() * 16)];
    }
    return randomcolor;
}



View.prototype.init = function () {
    this.colorchangebutton.addEventListener("click", this.colorchangeEvent);
    this.countchangebutton.addEventListener("click", this.countchangeEvent);
    this.horverchangebutton.addEventListener("click", this.horverchangeEvent);
    this.clearscreenbutton.addEventListener("click", this.clearscreenEvent);
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

View.prototype.clearscreen = function () {
    this.container.innerHTML = " ";
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



View.prototype.drawHorizontal =  function (line1,line2,color,zindex,divcont) {
    var k =0;
    var difference = line2[0] - line1[0];

    // var divcont = document.createElement('div');
    // divcont.className = "cont"+zindex;
    // divcont.style.position = "absolute";
    // divcont.style.zIndex = zindex;

    for(let i=0;i<Math.abs(parseInt(difference/3));i++)
    {
        k = i*3;
        if( difference < 0)
            k = -k;

        var div = document.createElement('div');
        div.className = "line";
        div.style.left = line1[0] + k+"px";
        div.style.top = line1[1]+"px";
        div.style.zIndex = zindex;
        div.style.backgroundColor = color;
        div.style.borderColor = color;

        divcont.appendChild(div);
        this.container.appendChild(divcont);
    }
    this.drawVer(line1,line2,color,zindex,divcont);
}

View.prototype.drawVer = function (line1,line2,color,zindex,divcont) {
    var k =0;
    var difference = line2[1] - line1[1];
    for(let i=0;i<Math.abs(parseInt(difference/3));i++)
    {
        k = i*3;
        if( difference < 0)
            k = -k;
        var div = document.createElement('div');
        div.className = "line";
        div.style.left = line2[0]+"px";
        div.style.top = line1[1]+k+"px";
        div.style.zIndex = zindex;
        div.style.backgroundColor = color;
        div.style.borderColor = color;
        divcont.appendChild(div);

        this.container.appendChild(divcont);
    }
}

View.prototype.drawHorizontalChanged =  function (line1,line2,color,zindex) {
    var k =0;
    var difference = line2[0] - line1[0];
    for(let i=0;i<Math.abs(parseInt(difference/3));i++)
    {
        k = i*3;
        if( difference < 0)
            k = -k;
        var div = document.createElement('div');
        div.className = "line";
        div.style.left = line1[0] + k+"px";
        div.style.top = line1[1]+"px";
        div.style.zIndex = zindex;
        div.style.backgroundColor = color;
        div.style.borderColor = color;
        this.container.appendChild(div);
    }

}

View.prototype.drawVerChanged = function (line1,line2,color,zindex) {
    var difference = line2[1] - line1[1];
    var k = 0;
    for(let i=0;i<Math.abs(parseInt(difference/3));i++)
    {
        k = i*3;
        if( difference < 0)
            k = -k;
        var div = document.createElement('div');
        div.className = "line";
        div.style.left = line2[0]+"px";
        div.style.top = line1[1]+k+"px";
        div.style.zIndex = zindex;
        div.style.backgroundColor = color;
        div.style.borderColor = color;
        this.container.appendChild(div);
    }
    this.drawHorizontalChanged(line1,line2,color,zindex);
}

var screenView = new View();





