var Controller = function (View, Model) {
    this.xonixView = View;
    this.xonixModel = Model;

    this.xonixView.playEvent = this.play.bind(this);
    this.xonixView.pauseEvent = this.pause.bind(this);

    this.flagpause = false;
};

Controller.prototype.init = function () {
    this.xonixView.onKeyDownEvent = this.moving.bind(this);

    this.xonixView.init();
    this.xonixModel.init(this.needRendering.bind(this));
    this.needRendering();
};

Controller.prototype.reinit = function () {

    this.xonixView.onKeyDownEvent = this.moving.bind(this);
    this.xonixView.init();
    this.xonixModel.init(this.needRendering.bind(this));
    this.needRendering();
};



Controller.prototype.play = function () {
    this.xonixModel.PlayMusic();
}

Controller.prototype.pause = function () {
    this.xonixModel.PauseMusic(this.flagpause);
    if(this.flagpause)
        this.flagpause = false;
    else
        this.flagpause = true;

}


Controller.prototype.needRendering = function(){
    this.xonixView.render(xonixModel.objs);
    //this.xonixModel.objs
};

Controller.prototype.moving = function (e) {

    this.xonixModel.ballMove(e);
};

var xonixController = new Controller(xonixView,xonixModel);
xonixController.init();