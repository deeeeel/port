var PORTFOLIO = PORTFOLIO || {};
PORTFOLIO.COMMON = {};


//=========================================================================
// Canvas
//=========================================================================
PORTFOLIO.COMMON.canvas = {
  opt : {
    squereNum : 2000,
    currentR : 0,
    maxR : 2,
    minR : 0.5,
    rDiff : 0.25,
    xDiff : 3,
    yDiff : 5,
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

    var a = 640 - 100,
        b = 480 - 100;

    var diff = 3;
    this.opt.diffFlg = false;

    var pattern = 0;

    for (var i = 0; i < this.opt.squereNum; i++) {
      ctx.beginPath();

      //乱数定義
      // var a = Math.floor( Math.random() * this.$canvas.width()),
      //     b = Math.floor( Math.random() * this.$canvas.height());

      // var a = this.$canvas.width() - 100,
      //     b = this.$canvas.height() - 100



      //描画
      ctx.fillStyle = this.opt.color[colorIndex];
      ctx.arc(a, b, this.opt.currentR, 0/180*Math.PI, 360/180*Math.PI);
      ctx.fill();

      a = a - this.opt.xDiff;
      b = b - this.opt.yDiff;

      //x座標の変更
      // if(this.opt.diffFlg){
      //   this.opt.xDiff = this.opt.xDiff + 0.25;
      // }else{
      //   this.opt.xDiff = this.opt.xDiff - 0.25;
      // }

      // if(this.count == 2){
      //   this.count = 0;
      // }

      switch (pattern) {
        case 0:
          this.opt.xDiff = this.opt.xDiff - 0.25;
        case 1:
          this.opt.xDiff = (this.opt.xDiff - 0.25) * -1;
        case 2:

        case 3:
        break;
      }

      //x座標の変更のためのフラグ更新
      if(this.opt.xDiff === -3){
        // this.opt.diffFlg = !this.opt.diffFlg
        this.count++;
      }
      if(this.opt.xDiff === 3){
        // this.opt.diffFlg = !this.opt.diffFlg
        this.count++;
      }




      //半径の更新
      if(this.opt.currentR < this.opt.minR){
        this.opt.currentR = this.opt.maxR;
      }else{
        this.opt.currentR = this.opt.currentR - this.opt.rDiff;
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
