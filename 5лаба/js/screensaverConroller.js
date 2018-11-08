var Controller = function (View, Model) {
    this.screenView = View;
    this.screenModel = Model;
    this.screenView.clearscreenEvent = this.clearscreen.bind();
    this.screenView.colorchangeEvent = this.changecolor.bind(this);
    this.screenView.countchangeEvent = this.screenView.changecount.bind();
    this.screenView.horverchangeEvent = this.changehorver.bind(this);
    this.colorchange = false;
};


Controller.prototype.init = function() {
    var screenModel = new Model(this.getcount(),this.getcolor(),this.colorchange);
    screenModel.init();
    this.screenView.init();
    this.screenModel = screenModel;
    this.needRendering();

};
Controller.prototype.changehorver = function () {
    this.screenView.changehorver();

}

Controller.prototype.changecolor = function () {
    this.screenView.changecolorforbutton();
    this.colorchange = true;
    this.screenModel.setcolor();
    //this.screenView.colorchangebutton.style.backgroundColor = this.screenModel.color;

}

Controller.prototype.getcolor = function () {
    return this.screenView.getcolor();
}

Controller.prototype.clearscreen = function () {
    this.screenView.clearscreen();
}

Controller.prototype.changecount = function () {
    this.screenView.changecount();
}
Controller.prototype.getcount = function () {
    return this.screenView.getcount();
}



Controller.prototype.newneedRendering = function(){
    this.screenModel.init();
    this.screenView.render(this.screenModel);
};
Controller.prototype.needRendering = function(){
    this.screenView.render(this.screenModel);
};



var screenController = new Controller(screenView,screenModel);


setInterval(function() {
    setInterval(screenController.init(),2000);
}, 2000);



