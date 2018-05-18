var PORTFOLIO = PORTFOLIO || {};
PORTFOLIO.COMMON = {};


//=========================================================================
// Canvas
//=========================================================================
PORTFOLIO.COMMON.canvas = {
  opt : {
    squereNum : 6000,
    currentR : 0,
    maxR : 5,
    minR : 2,
    rDiff : 0.25,
    xDiff : 10,
    yDiff : 5,
    udDiff : 0.25,
    diffFlg : false,
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

    this.xdiff = this.opt.xDiff;
    this.ydiff = this.opt.yDiff;

    this.count = 0;
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

    var a = 640 ,
        b = 480 ;

    var aDash = a,
        bDash = b;


    this.opt.diffFlg = false;

    for (var i = 0; i < this.opt.squereNum; i++) {
      ctx.beginPath();

      //描画
      ctx.fillStyle = this.opt.color[colorIndex];
      ctx.arc(a, b, this.opt.currentR, 0/180*Math.PI, 360/180*Math.PI);
      ctx.fill();

      a = a - this.xdiff ;
      b = b - this.opt.yDiff;

      if(this.opt.diffFlg){
        this.xdiff = this.xdiff + this.opt.udDiff;
      }else{
        this.xdiff = this.xdiff - this.opt.udDiff;
      }

      //x座標の変更のためのフラグ更新
      if(this.xdiff === -this.opt.xDiff){
        this.opt.diffFlg = !this.opt.diffFlg
        this.opt.yDiff = this.opt.yDiff * -1;

        this.opt.maxR = 1;
        this.opt.currentR = 1;
        this.opt.currentR = 0.5;

        // this.opt.color[0] = '#c3c3c3';
      }
      if(this.xdiff === this.opt.xDiff){
        this.opt.diffFlg = !this.opt.diffFlg
        this.opt.yDiff = this.opt.yDiff * -1;

        this.opt.maxR = 5;
        this.opt.currentR = 5;
        this.opt.currentR = 2;

        // this.opt.color[0] = '#FF0000';
      }

      if(aDash === a && bDash === b){
        a = a - (Math.random() * ( 20 ) + 70);
        a = Math.floor(a);
        aDash = a;

        b = b - (Math.random() * ( 30 ) + 20);
        b = Math.floor(b);
        bDash = b;
      }

      //半径の更新
      if(this.opt.currentR < this.opt.minR){
        this.opt.currentR = this.opt.maxR;
      }else{
        // this.opt.currentR = this.opt.maxR;
        this.opt.currentR = this.opt.currentR - (Math.random() * ( 1 ) - 1);
        console.log((Math.random() * ( 1 ) - 0.25));
      }

      //カラーの更新
      if(colorIndex === this.opt.color.length - 1){
        colorIndex = 0;
      }else{
        colorIndex++;
      }
    }
  }
};


//=========================================================================
// Encloser
//=========================================================================
PORTFOLIO.COMMON.encloser = {
  init : function(){
    this.setParameters();
    this.encloseText();
  },
  setParameters : function(){
    this.$textBox = $('.jsc-encloser');
  },
  encloseText : function(){
    this.$textBox.each(function(){
      var $target = $(this),
          text = $target.text(),
          textArray = text.split(''),
          fixedText = "";

      for (var i = 0; i < textArray.length; i++) {
          fixedText = fixedText + "<span>" + textArray[i] + "</span>";
      }
      $target.html(fixedText);
    });
  }
};

$(function(){
  PORTFOLIO.COMMON.canvas.init();
  PORTFOLIO.COMMON.encloser.init();
});
