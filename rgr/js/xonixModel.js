const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_TOP = 38;
const KEY_CODE_DOWN = 40;
var STEP_POINT = 2;
var STEP_BALL = 2;

var WIDTH = 600;
var HEIGHT = 400;

var Pointer = null;
var Map = new Uint8Array(64*48);

var board = [];

var row = [-1,-1,-1,0,0,1,1,1];
var col = [-1,0,1,-1,1,-1,0,1];

// 0 суша , 1 море

var Model = function () {
    this.scores = 0;
    this.fill = 0;
    this.Map = null;
    this.temporalCells = [];
    this.firstCell = null;
    this.lastCell = null;
    this.ff = [];
    this.prevx = null;
    this.prevy = null;
    this.player = null;
    this.flagball2 = null;
    this.lastmove = null;

    this.objs = {
        'ball': {
            x: 100,
            y: 100,
            speedx: 3,
            speedy: 3,
            angle:45
        },
        'ball2': {
            x: 35,
            y: 15,
            speedx: 3,
            speedy: 3,
            angle:45
        },
        'pointer': {
            x: 0,
            y: 0,
            top: false,
            left: false,
            right: false,
            down: false,
            lastturn:null
        },
        'Map':{
            array: null
        }

    };
};




Model.prototype.init = function (renderFunction) {
    this.objs.Map = new Uint8Array(60*40);
    this.objs.temporalCells = [];
    this.objs.ff = [0,0];
    this.objs.scores = 0;
    this.objs.fill = 0;
    this.objs.flagball2 = false;
    this.initMap();
    this.objs.lastmove = null;
    this.needRendering = renderFunction;
    Pointer = requestAnimationFrame(this.movingpointer);
    this.objs.player = new ya.music.Audio();
}

Model.prototype.ballMove = function (e) {
    var keyCode = e.keyCode;

    switch (keyCode) {
        case KEY_CODE_RIGHT: {
            if(this.objs.temporalCells.length != 0 && this.objs.lastmove == "l")
            {
                this.stopPointer();
                this.objs.pointer.left = true;
            }
            else {
                this.stopPointer();
                this.objs.pointer.right = true;
            }
            //this.objs.pointer.x+=STEP_POINT;
            break;
        }
        case KEY_CODE_LEFT: {

            if(this.objs.temporalCells.length != 0 && this.objs.lastmove == "r")
            {
                this.stopPointer();
                this.objs.pointer.right = true;
            }
            else {
                this.stopPointer();
                this.objs.pointer.left = true;
            }
            //this.objs.pointer.x-=STEP_POINT;
            break;

        }
        case KEY_CODE_TOP: {
            if(this.objs.temporalCells.length != 0 && this.objs.lastmove == "d")
            {
                this.stopPointer();
                this.objs.pointer.down = true;
            }
            else{
                this.stopPointer();
                this.objs.pointer.top = true;
            }
            break;
        }
        case KEY_CODE_DOWN: {
            if(this.objs.temporalCells.length != 0 && this.objs.lastmove == "t")
            {
                this.stopPointer();
                this.objs.pointer.top = true;
            }
            else {
                this.stopPointer();
                this.objs.pointer.down = true;
            }

            //this.objs.pointer.y+=STEP_POINT;
            break;
        }
    }
    this.setcoordPointer();
}

Model.prototype.initMap = function () {
    for(var i= 3;i<57;i++) {
        for(var j=3;j<37;j++)
        {
            var cell = 60*j + i;
            this.objs.Map[cell] = 1;
        }
    }
}

Model.prototype.ballcollisionTemporal = function (x_ , y_,ball) {
    this.objs.pointer.x = 0;
    this.objs.pointer.y = 0;

    for(var i=0;i<this.objs.temporalCells.length;i++)
    {
        var x = this.objs.temporalCells[i] %60;
        var y = Math.floor(this.objs.temporalCells[i] /60);
        this.objs.Map[60*y + x] = 1;
    }
    this.objs.temporalCells = [];
    this.objs.firstCell = null;
    this.objs.lastCell = null;
    this.objs.ff = [];
    this.objs.prevx = null;
    this.objs.prevy = null;


    var list = [];
    for(var i = 0;i < 60;i++)
    {
        for(var j =0 ;j < 40;j++)
        {
            if(this.objs.Map[60*j + i] == 1)
            {
                list.push(60*j + i);
            }
        }
    }

    var random_x = Math.floor(Math.random() * (list.length - 0) + 0);

    var new_x = list[random_x] % 60;
    var new_y = Math.floor(list[random_x] / 60);



    ball.x = x_;
    ball.y =  y_;

    this.objs.scores -= 2000;
    xonixView.setText(this.objs);

}

Model.prototype.checkBallCollision = function (ball , Map) {
    var x = ball.x;
    var y = ball.y;
    // calc cuurent ball cell
    var xx = (x - ( x % 10 )) / 10;
    var yy = (y - ( y % 10 )) / 10;




    if( (x > 630 || x < -20) && (y > 430 || y < -20))
    {
        ball.x = new_x;
        ball.y = new_y;
    }

    // bot
    if(Map[60*(yy+1) + xx] == 0){
        ball.speedy = -STEP_BALL;
    }
    // right
    if(Map[60*(yy) + xx+1] == 0){
        ball.speedx = -STEP_BALL;
    }
    // top
    if(Map[60*(yy-1) + xx] == 0){
        ball.speedy = STEP_BALL;
    }
    // left
    if(Map[60*(yy) + xx-1] == 0){
        ball.speedx = STEP_BALL;
    }

    if(Map[60*(yy+1) + xx] == 2){
        this.ballcollisionTemporal(x , y  ,ball);
    }

    if(Map[60*(yy) + xx+1] == 2){
        this.ballcollisionTemporal(x , y  ,ball);
    }

    if(Map[60*(yy-1) + xx] == 2){
        this.ballcollisionTemporal(x , y   ,ball);
    }

    if(Map[60*(yy) + xx-1] == 2){
        this.ballcollisionTemporal(x , y   ,ball);
    }
}

Model.prototype.checkBallCollision2 = function (ball , Map) {
    var xp = this.objs.pointer.x;
    var yp = this.objs.pointer.y;
    var xxp = (xp - ( xp % 10 )) / 10;
    var yyp = (yp - ( yp % 10 )) / 10;

    var x = ball.x;
    var y = ball.y;
    // calc cuurent ball cell
    var xx = (x - ( x % 10 )) / 10;
    var yy = (y - ( y % 10 )) / 10;

    if( (x > 630 || x < -20) && (y > 430 || y < -20))
    {
        ball.x = 40;
        ball.y = 20;
    }

    // bot
    if(Map[60*(yy+1) + xx] == 1){
        ball.speedy = -(STEP_BALL+4);
    }
    // right
    if(Map[60*(yy) + xx+1] == 1){
        ball.speedx = -(STEP_BALL+4);
    }
    // top
    if(Map[60*(yy-1) + xx] == 1){
        ball.speedy = (STEP_BALL+4);
    }
    // left
    if(Map[60*(yy) + xx-1] == 1){
        ball.speedx = (STEP_BALL+4);
    }


    if(x  <= -1 && y  >= -1 && y  <= HEIGHT-1)
    {
        ball.speedx = (STEP_BALL+4);
    }
    // right
    if(x  >= WIDTH-11 && y  >= -1 && y  <= HEIGHT-1)
    {
        ball.speedx = -(STEP_BALL+4);
    }
    // top
    if(y  <= -1 && x  >= -1 && x  <= WIDTH-1)
    {
        ball.speedy = (STEP_BALL+4);
    }
    // down
    if(y  >= HEIGHT-11 && x  >= -1 && x  <= WIDTH-1)
    {
        ball.speedy = -(STEP_BALL+4);
    }

    /////////////////////////////////
    if( (xxp-1) == xx && (yyp-1) == yy || (xxp+1) == xx && (yyp+1) == yy)
    {
        this.objs.scores += -2000;
        var random_x = Math.floor(Math.random() * (590 - 10) + 10);
        this.objs.pointer.x = random_x;
        this.objs.pointer.y = 15;

    }


}

Model.prototype.setcoordBall = function (ball) {
    ball.x += ball.speedx;
    ball.y += ball.speedy;
}

Model.prototype.setcoordPointer = function () {

    if(this.objs)
    this.objs.prevx = this.objs.pointer.x;
    this.objs.prevy = this.objs.pointer.y;
    if( this.objs.pointer.right)
    {

        this.objs.pointer.x+=STEP_POINT;
        this.objs.lastmove = "r";
    }
    if( this.objs.pointer.left){


        this.objs.pointer.x -= STEP_POINT;
        this.objs.lastmove = "l";

    }
    if( this.objs.pointer.top)
    {
        this.objs.pointer.y-=STEP_POINT;
        this.objs.lastmove = "t";
    }
    if( this.objs.pointer.down){
        this.objs.pointer.y+=STEP_POINT;
        this.objs.lastmove = "d";
    }
    this.needRendering();
}

Model.prototype.stopPointer = function () {
    this.objs.pointer.right = false;
    this.objs.pointer.left = false;
    this.objs.pointer.top = false;
    this.objs.pointer.down = false;
}

Model.prototype.checkSideMap = function (pointer) {
    // left
    if(pointer.x  <= -1 && pointer.y  >= -1 && pointer.y  <= HEIGHT-1)
    {
        this.stopPointer();
        pointer.x = 0;
    }
    // right
    if(pointer.x  >= WIDTH-11 && pointer.y  >= -1 && pointer.y  <= HEIGHT-1)
    {
        this.stopPointer();
        pointer.x = WIDTH-10;
    }
    // top
    if(pointer.y  <= -1 && pointer.x  >= -1 && pointer.x  <= WIDTH-1)
    {
        this.stopPointer();
        pointer.y = 0;
    }
    // down
    if(pointer.y  >= HEIGHT-11 && pointer.x  >= -1 && pointer.x  <= WIDTH-1)
    {
        this.stopPointer();
        pointer.y = HEIGHT-10;
    }
}

function getboard(Map,i,j) {
    var x = (i[0] - ( i[0] % 10 )) / 10;
    var y = (i[1] - ( i[1] % 10 )) / 10;

    var xx = j % 60;
    var yy = Math.floor(j / 60);

    if( x == xx)
    {
        alert("horiz " + x + " " + y + " " + xx + " " + yy);
    }
    if( y == yy)
    {
        alert("vertic " + x + " " + y + " " + xx + " " + yy);
    }
}

Model.prototype.returnxy = function(number){
    var x = number%60;
    var y = Math.floor(number/60);
    return [x,y];
}

Model.prototype.returnnumberlist = function(x,y){
   var n = y*60+x;
   return n;
}

Model.prototype.isSafe = function (Map,x,y) {
    //alert(Map[50*y+x] + " " + 50*y+x , " " + x + " " + y);
    return (x >=0 && x < 60 && y >= 0 && y < 40) && Map[60*y+x] == 1;
}

Model.prototype.easyFloodFill = function (coord,Map,color) {
    var x = coord[0];
    var y = coord[1];

    Map[60*y +x] = color;

    for( var i=0;i<8;i++)
    {
        if(this.isSafe(Map,x+row[i],y+col[i]))
            this.easyFloodFill([x+row[i],y+col[i]],Map,color);
    }
}

Model.prototype.getSize = function (Map,color) {
    var counr = 0;
    for(var i=0;i<60;i++)
    {
        for(var j =0 ; j < 40;j++)
        {
            if(Map[60*j+i] == color) counr++;
        }
    }
    return counr;
}

Model.prototype.doNormal = function (Map,color,color2) {
    for(var i=0;i<60;i++)
    {
        for(var j =0 ; j < 40;j++)
        {
            if(Map[60*j+i] == color) Map[60*j+i] = 1;
            if(Map[60*j+i] == color2) Map[60*j+i] = 0;
        }
    }
}

Model.prototype.getOtherCaptureCells = function (temporalCells , Map , color) {
    for(var i=0;i<temporalCells.length;i++)
    {
        var x = temporalCells[i]%60;
        var y = Math.floor(temporalCells[i]/60);

        if(( Map[60*y + x - 1] == 1 && Map[60*y + x + 1] == color)  || (Map[60*y + x - 1] == color && Map[60*y + x + 1] == 1))
        {
            if(Map[60*y + x + 1] == 1)
            {
                var temp = 60*y + x + 1;
                this.easyFloodFill(this.returnxy(temp),Map,0);
            }
            if(Map[60*y + x - 1] == 1)
            {
                var temp = 60*y + x - 1;
                this.easyFloodFill(this.returnxy(temp),Map,0);
            }
        }

        if( ( Map[60*(y-1) + x ] == 1 && Map[60*(y+1) + x ] == color) || ( Map[60*(y-1) + x ] == color && Map[60*(y+1) + x ] == 1))
        {
            if(Map[60*(y-1) + x ] == 1)
            {
                var temp = 60*(y-1) + x;
                this.easyFloodFill(this.returnxy(temp),Map,0);
            }
            if(Map[60*(y+1) + x ])
            {
                var temp = 60*(y+1) + x;
                this.easyFloodFill(this.returnxy(temp),Map,0);
            }
        }
    }
}

Model.prototype.getCaptureCells = function (temporalCells,Map){
    var array = Array();
    var MaxY = -999;
    var MinY = 999;
    var MaxX = -999;
    var MinX = 999;
    array = [];
    for(var i=0;i<temporalCells.length;i++)
    {
        var x = temporalCells[i]%60;
        var y = Math.floor(temporalCells[i]/60);
        var startedCountourOne = null;
        var startedCountourTwo = null;
        if(Map[60*y + x - 1] == 1 && Map[60*y + x + 1] == 1)
        {
            startedCountourOne = 60*y + x - 1;
            startedCountourTwo = 60*y + x + 1;
            Map[60*y + x - 1] = 3;
            Map[60*y + x + 1] = 3;
            break;
        }
        if(Map[50*(y-1) + x ] == 1 && Map[60*(y+1) + x ] == 1)
        {
            startedCountourOne = 60*(y-1) + x ;
            startedCountourTwo = 60*(y+1) + x ;
            Map[60*(y-1) + x ] = 3;
            Map[60*(y+1) + x ] = 3;
            break;
        }
    }

    this.easyFloodFill(this.returnxy(startedCountourOne),Map,3);
    this.easyFloodFill(this.returnxy(startedCountourTwo),Map,4);

    var sizeA = this.getSize(Map,3);
    var sizeB = this.getSize(Map,4);

    this.getOtherCaptureCells(temporalCells,Map,3);
    this.getOtherCaptureCells(temporalCells,Map,4);

    var counter = 0;
    for(var i=0;i<60;i++)
    {
        for(var j =0 ; j < 40;j++)
        {
            if( sizeA > sizeB)
            {
                if(Map[60*j+i] == 4) Map[60*j+i] = 0;
                if(Map[60*j+i] == 3) Map[60*j+i] = 1;
            }
            else {
                if(Map[60*j+i] == 4) Map[60*j+i] = 1;
                if(Map[60*j+i] == 3) Map[60*j+i] = 0;
            }
            if(Map[60*j+i] == 2) Map[60*j+i] = 0;

            if(Map[60*j+i] == 0) counter++;
        }
    }
    counter = counter - (2400 - 1836);
    this.objs.scores += counter*10;
    this.objs.fill = Math.floor((counter / (1836)) *100);
}

Model.prototype.checkTemporalArray = function (pointer,Map) {
    var x = pointer.x;
    var y = pointer.y;
    // calc cuurent pointer cell

    var xx = Math.floor((x - ( x % 10 )) / 10);
    var yy = (y - ( y % 10 )) / 10;
    // check new area
    if(this.objs.firstCell != null)
    {
        if(Map[60*(yy) + xx] == 0)
        {
            this.objs.lastCell = 60*(yy) + xx;
            for(var i=1;i< this.objs.temporalCells.length; i++)
            {
                var x = this.objs.temporalCells[i-1]%60;
                var y = Math.floor(this.objs.temporalCells[i-1]/60);
                var xx = this.objs.temporalCells[i]%60;
                var yy = Math.floor(this.objs.temporalCells[i]/60);


                if( Map[60*(yy-1) + xx -1] == 2)
                {
                    if(Map[60*(yy-1) + xx ] !=2)
                    {
                        Map[60*(yy) + xx-1 ] = 2;
                    }
                }

                if( Map[60*(yy-1) + xx +1] == 2)
                {
                    if(Map[60*(yy-1) + xx ] !=2) {
                        Map[60 * (yy - 1) + xx + 1] = 2;
                    }
                }

                if( Map[60*(yy-1) + xx +1] == 2)
                {
                    if(Map[60*(yy) + xx +1] !=2)
                    {
                        Map[60*(yy) + xx +1 ] = 2;
                    }
                }

                // if( Map[60*(yy-1) + xx +1] == 2)
                // {
                //     if(Map[60*(yy) + xx+1 ] !=2)
                //     {
                //         Map[60*(yy) + xx + 1 ] = 2;
                //     }
                // }

            }

            this.getCaptureCells(this.objs.temporalCells,Map);
            this.objs.temporalCells = [];
            this.objs.firstCell = null;
            this.objs.lastCell = null;
        }
    }
    // set temporal cell
    if(Map[60*(yy) + xx] == 1)
    {
        Map[60*(yy) + xx] = 2;
        this.objs.temporalCells.push(60*(yy) + xx);

        if(this.objs.firstCell == null)
        {
            this.objs.firstCell = 60*(yy) + xx;
            this.objs.ff[0] = this.objs.prevx;
            this.objs.ff[1] = this.objs.prevy;
        }
    }
}

Model.prototype.checkPointerCollision = function (pointer,Map) {
    this.checkSideMap(pointer);
    this.checkTemporalArray(pointer,Map);
}

Model.prototype.checknextlvl = function () {
    if(this.objs.fill > 1)
    {
        this.objs.flagball2 = true;
    }
    if(this.objs.fill > 70)
    {
        this.NextLvlMusic();
        STEP_POINT ++;
        STEP_BALL ++;
        this.objs.pointer.x = 0;
        this.objs.pointer.y = 0;
        for(var i=0;i<this.objs.temporalCells.length;i++)
        {
            var x = this.objs.temporalCells[i] %60;
            var y = Math.floor(this.objs.temporalCells[i] /60);
            this.objs.Map[60*y + x] = 1;
        }
        this.objs.temporalCells = [];
        this.objs.firstCell = null;
        this.objs.lastCell = null;
        this.objs.ff = [];
        this.objs.prevx = null;
        this.objs.prevy = null;
        this.objs.ball.x = 100;
        this.objs.ball.y =  100;
        this.objs.fill = 0;
        this.initMap();
        this.objs.flagball2 = false;
        alert("Сложность увнличена");
        if(STEP_POINT >= 5 && STEP_BALL >= 5)
        {
            STEP_POINT = 2;
            STEP_BALL = 2;
        }
    }
}



Model.prototype.PlayMusic = function () {
    xonixModel.objs.player.play('assets/sound/quiet.mp3').then(function() {
        console.log("Аудиоплеер начал воспроизведение.");
    }, function (err) {
        console.log("При воспроизведении возникла ошибка.");
    });
}

Model.prototype.PauseMusic = function (flagpause) {
    if(flagpause == false)
    {
        xonixModel.objs.player.pause().then(function () {
            console.log("Воспроизведение поставлено на паузу.");
        }, function (err) {
            console.log("Ошибка при попытке поставить плеер на паузу.");
        });
    }
    else{
        xonixModel.objs.player.resume().then(function () {
            console.log("Возобновление воспроизведения.");
        }, function (err) {
            console.log("Ошибка при обновлении воспроизведения.");
        });
    }
}

Model.prototype.NextLvlMusic = function () {
    xonixModel.objs.player.play('assets/sound/tuturu.mp3').then(function() {
        console.log("Аудиоплеер начал воспроизведение.");
    }, function (err) {
        console.log("При воспроизведении возникла ошибка.");
    });
}


Model.prototype.movingpointer = function () {
    xonixModel.checknextlvl();
    xonixModel.checkBallCollision(xonixModel.objs.ball , xonixModel.objs.Map);
    xonixModel.checkPointerCollision(xonixModel.objs.pointer,xonixModel.objs.Map);
    xonixModel.setcoordPointer();
    xonixModel.setcoordBall(xonixModel.objs.ball);
    if(xonixModel.objs.flagball2 == true)
    {
        xonixModel.checkBallCollision2(xonixModel.objs.ball2 , xonixModel.objs.Map);
        xonixModel.setcoordBall(xonixModel.objs.ball2);
    }
    requestAnimationFrame(xonixModel.movingpointer);
}




var xonixModel = new Model();