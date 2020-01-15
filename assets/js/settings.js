
//ナビゲーションの固定
var navPos = $('#step-nav').offset().top;
var navHeight = $('#step-nav').outerHeight();
$(window).on('scroll', function() {
	if ( $( this ).scrollTop() > navPos ) {
		$('body').css('padding-top', navHeight);
		$('#step-nav').addClass('nav_fixed');
	} else {
		$('body').css('padding-top', 0);
		$('#step-nav').removeClass('nav_fixed');
	}
});


//check boxでボタン有効
$(function(){
	$("#check_approval").click(function(){
		if(this.checked){
			removeInactive();
		} else {
			addInactive();
		};
	});
});
function removeInactive(){
	$("#next_page").removeClass("inactive");	
	$(".alt").css("display", "none");
}
function addInactive(){
	$("#next_page").addClass("inactive");
	$(".alt").css("display", "block");
}


//ウィンドウ閉じる
function windowClose(){
	var result = window.confirm("ウィンドウを閉じます。\nよろしいですか？");
	if(result){
		window.open('about:blank', '_self').close();
	}
}


//canvasに入力
var can;
var container;
var ct;
var ox=0,oy=0,x=0,y=0;
var mf=false;

function mam_draw_init(){
	
	  can = document.getElementById('can');
	  container = document.getElementById('can_wrp');
	  sizing();
	  function sizing() {
	    can.height = container.offsetHeight;
	    can.width = container.offsetWidth;
	  }
	  window.addEventListener('resize', function() {
	    (!window.requestAnimationFrame) ? setTimeout(sizing, 300): window.requestAnimationFrame(sizing);
	  });

	//初期設定
	can.addEventListener("touchstart",onDown,false);
	can.addEventListener("touchmove",onMove,false);
	can.addEventListener("touchend",onUp,false);
	can.addEventListener("mousedown",onMouseDown,false);
	can.addEventListener("mousemove",onMouseMove,false);
	can.addEventListener("mouseup",onMouseUp,false);

	ct=can.getContext("2d");
	ct.strokeStyle="#000000";
	ct.lineWidth=3;
	clearCan();
}


function onDown(event){
    mf=true;
    ox=event.touches[0].pageX-event.target.getBoundingClientRect().left;
    oy=event.touches[0].pageY-event.target.getBoundingClientRect().top;
    event.stopPropagation();
  }
  function onMove(event){
    if(mf){
      x=event.touches[0].pageX-event.target.getBoundingClientRect().left;
      y=event.touches[0].pageY-event.target.getBoundingClientRect().top;
      drawLine();
      ox=x;
      oy=y;
      event.preventDefault();
      event.stopPropagation();
    }
  }
  function onUp(event){
    mf=false;
    event.stopPropagation();
    removeInactive();
  }
  
  function onMouseDown(event){
    ox=event.clientX-event.target.getBoundingClientRect().left;
    oy=event.clientY-event.target.getBoundingClientRect().top ;
    mf=true;
  }
  function onMouseMove(event){
    if(mf){
      x=event.clientX-event.target.getBoundingClientRect().left;
      y=event.clientY-event.target.getBoundingClientRect().top ;
      drawLine();
      ox=x;
      oy=y;
    }
  }
  function onMouseUp(event){
    mf=false;
    removeInactive();
  }
  function drawLine(){
    ct.beginPath();
    ct.moveTo(ox,oy);
    ct.lineTo(x,y);
    ct.stroke();
  }
  function clearCan(){
    ct.fillStyle="rgb(255,255,255)";
    ct.fillRect(0,0,can.getBoundingClientRect().width,can.getBoundingClientRect().height);
    addInactive();
  }


