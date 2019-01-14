
var View = function() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.onKeyDownEvent = null;
    this.playbut = document.getElementById('play');
    this.pausebut = document.getElementById('pause');
    this.stopbut = document.getElementById('stop');

    this.playEvent = null;
    this.pauseEvent = null;
    this.stopEvent = null;
    this.image = null;


};

View.prototype.randomColor = function () {
    var brightness = 3;
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";

}

View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
    this.playbut.addEventListener("click", this.playEvent);
    this.pausebut.addEventListener("click", this.pauseEvent);

    // this.image = new Image();
    // this.image.src = 'assets/img/ball2.png';

};

View.prototype.render = function (objs) {
    this.ctx.clearRect(0, 0, 600, 400);

    this.renderMap(objs);

    if(objs.flagball2 == true)
        this.renderBall(objs.ball2);

    this.renderBall(objs.ball);
    this.renderpointer(objs);
    this.setText(objs);

};

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
    // if(objs.ff[0] != 0)
    // {
    //     var x = objs.ff[0];
    //     var y =  objs.ff[1];
    //     var xx = (x - ( x % 10 )) / 10;
    //     var yy = (y - ( y % 10 )) / 10;
    //     this.ctx.fillStyle = 'rgb(0, 0, 255)';
    //     this.ctx.fillRect(xx*10, yy*10, xx*10 + 9, yy*10 + 9);
    //     this.ctx.stroke();
    // }

    this.ctx.strokeStyle = 'rgb(51, 204, 255)';
}







var xonixView = new View();