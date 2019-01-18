
var View = function() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext('2d');

    this.canvaslives = document.getElementById("lives");
    this.ctxlives = this.canvaslives.getContext('2d');

    this.img = null;

    this.canvaslives.width = 300;
    this.canvaslives.height = 30;



    this.canvas.width = 600;
    this.canvas.height = 400;
    this.onKeyDownEvent = null;
    this.playbut = document.getElementById('play');
    this.pausebut = document.getElementById('pause');
    this.stopbut = document.getElementById('stop');
    this.restartbut = document.getElementById('restartbutton');

    this.playEvent = null;
    this.pauseEvent = null;
    this.stopEvent = null;
    this.restartEvent = null;
    this.image = null;
    this.textlevel = "Уровень 1";


};

View.prototype.randomColor = function () {
    var brightness = 3;
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";

}

View.prototype.init = function () {
    this.img = new Image();
    this.img.src = "assets/img/heart.png";
    document.addEventListener('keydown', this.onKeyDownEvent);
    this.playbut.addEventListener("click", this.playEvent);
    this.pausebut.addEventListener("click", this.pauseEvent);
    this.restartbut.addEventListener("click", this.restartEvent);

};

View.prototype.render = function (objs) {
    this.ctx.clearRect(0, 0, 600, 400);
    this.ctxlives.clearRect(0, 0, 300, 30);
    this.renderMap(objs);
    this.ctxlives.font = "22px serif";

    if(objs.levelnumber == 1)
        this.textlevel = "Уровень 1";
    if(objs.levelnumber == 2)
        this.textlevel = "Уровень 2";
    if(objs.levelnumber == 3)
        this.textlevel = "Уровень 3";



    if(objs.levelnumber >= 2)
    {
        this.renderBall(objs.ball2);
        if(objs.levelnumber == 3){
            this.renderBall(objs.ball3);
        }
    }



    this.renderBall(objs.ball);
    this.renderpointer(objs);
    this.renderlives(objs);
    this.setText(objs);
    this.ctxlives.fillText(this.textlevel,100,25);


};

View.prototype.renderlives = function (obj) {
    if(obj.lives == 0)
    {
        this.textlevel = "Вы проиграли";
        this.restartbut.style.visibility = "visible";
    }
    else {
        this.restartbut.style.visibility = "hidden";
    }


    for(var i=0;i < obj.lives ; i++)
    {
        this.ctxlives.drawImage(this.img,10 + i*25,0 ,20,20);
    }
}

View.prototype.setText = function (objs) {
    var scores = document.getElementById("scorestext");
    scores.innerHTML = objs.scores.toString();

    var fill = document.getElementById("filltext");
    fill.innerHTML = objs.fill.toString() + " %";
}

View.prototype.renderpointer = function (objs) {


    if(objs.pointer.x % 10 == 0 && objs.pointer.y % 10 == 0)
    {
        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        this.ctx.fillRect(objs.pointer.x, objs.pointer.y, 10, 10);
    }
    else{
        var xx = objs.pointer.x - ( objs.pointer.x % 10 );
        var yy = objs.pointer.y - ( objs.pointer.y % 10 );
        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        this.ctx.fillRect(xx, yy, 10, 10);
    }
    //this.ctx.fillStyle = 'rgb(200, 200, 0)';
    //this.ctx.fillRect(objs.pointer.x+3, objs.pointer.y+3, 3, 3);
    this.ctx.stroke();
}

View.prototype.renderBall = function (ball) {
    this.ctx.strokeStyle = 'rgb(255, 0, 0)';
    this.ctx.beginPath();
    this.ctx.arc(ball.x,ball.y,5,0,2*Math.PI);
    this.ctx.stroke();
}

View.prototype.renderMap = function (objs) {


    for(var i=0;i<60;i++)
    {
        for(var j=0;j<40;j++)
        {
            if(objs.Map[60*j + i] == 1)
            {
                this.ctx.fillStyle = 'rgb(40, 255, 255)';
                this.ctx.fillRect(i*10, j*10, i*10 + 9, j*10 + 9);
            }

            if(objs.Map[60*j + i] == 0){
                this.ctx.fillStyle =   'rgb(140, 255, 0)';//'rgb(140, 255, 0)';
                this.ctx.fillRect(i*10, j*10, i*10 + 9, j*10 + 9);
            }
            if(objs.Map[60*j + i] == 2)
            {
                this.ctx.fillStyle = 'rgb(238, 130, 238)';
                this.ctx.fillRect(i*10, j*10, i*10 + 9, j*10 + 9);
            }

            if(objs.Map[60*j + i] == 3)
            {
                this.ctx.fillStyle = 'rgb(0, 0, 0)';
                this.ctx.fillRect(i*10, j*10, i*10 + 9, j*10 + 9);
            }
            if(objs.Map[60*j + i] == 4)
            {
                this.ctx.fillStyle = 'rgb(255, 255, 255)';
                this.ctx.fillRect(i*10, j*10, i*10 + 9, j*10 + 9);
            }
            if(objs.Map[60*j + i] == 5)
            {
                this.ctx.fillStyle = 'rgb(255, 0, 0)';
                this.ctx.fillRect(i*10, j*10, i*10 + 9, j*10 + 9);
            }

        }
    }
    this.ctx.strokeStyle = 'rgb(51, 204, 255)';
}







var xonixView = new View();