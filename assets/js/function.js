var PORTFOLIO = PORTFOLIO || {};
PORTFOLIO.COMMON = {};


//=========================================================================
// Canvas
//=========================================================================
PORTFOLIO.COMMON.canvas = {
  opt : {
    squereNum : 2000,
    currentR : 0,
    maxR : 5,
    minR : 2,
    rDiff : 1,
    color : [
      '#c3c3c3',
      '#d9d9d9',
      '#e9e9e9',
    ]
  },
  init : function(){
    this.setParameters();
    this.setFirstSize();
    this.bindEvent();
    this.makeSquere();
  },
  setParameters : function(){
    this.$window = $(window);
    this.$canvas = $('#canvas');
    this.ww = this.$window.width() * 2/3;
  },
  bindEvent : function(){
    this.$window.on('resize',$.proxy(this.resizeCanvas,this));
  },
  setFirstSize : function(){
    this.$canvas.width(this.ww);
  },
  resizeCanvas : function(){
    var ww = this.$window.width() * 2/3;
    this.$canvas.width(ww);
  },
  makeSquere : function(){
    var canvas = document.getElementsByTagName('canvas')[0];
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');

    this.opt.currentR = this.opt.maxR;

    var colorIndex = 0;

    for (var i = 0; i < this.opt.squereNum; i++) {
      ctx.beginPath();

      //乱数定義
      var a = Math.floor( Math.random() * this.$canvas.width()),
          b = Math.floor( Math.random() * this.$canvas.height());

      //描画
      ctx.fillStyle = this.opt.color[colorIndex];
      ctx.arc(a, b, this.opt.currentR, 0/180*Math.PI, 360/180*Math.PI);
      ctx.fill();

      //半径の更新
      if(this.opt.currentR < this.opt.minR){
        this.opt.currentR = this.opt.maxR;
      }else{
        this.opt.currentR = this.opt.currentR - this.opt.rDiff;
      }

      //半径の更新
      if(colorIndex === this.opt.color.length - 1){
        colorIndex = 0;
      }else{
        colorIndex++;
      }
    }
  }
}

$(function(){
  PORTFOLIO.COMMON.canvas.init();
});
