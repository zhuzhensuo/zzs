
var doMove=function(){
	var obj=$(".banner_1"),speed=0,timer=null,tmp=0;
	timer=setInterval(function(){
		var top=obj.position().top;
		speed+=2;
		var t=top+speed;
		if(t>0){
			t=0;
			speed*=-0.6;
			tmp++;
			if(tmp>1){
				clearInterval(timer);
				callBack();
			}
		}else{
			tmp=0;
		}
		obj.css("top",t);
	},20);
		
	
}
doMove();

var callBack=function(){
	var img=$(".ecmoban").find("img");
	img.stop().animate({width:712},1000,"easeOutSine");
	$(".anli_wrap2").stop().animate({width:712},1000,"easeOutSine");
}
void function(){
	$(".slide_nav2").find(".backtotop").click(function(){
		$("body,html").animate({scrollTop:0},{easing:"easeOutQuint"});
	});
	
	
	var md=$(".slide_nav2").find(".maodian");
	md.click(function(){
		var i=md.index(this),top=$(".main_1").eq(i).offset().top;
		$("body,html").animate({scrollTop:top},"easeOutSine");
	});
	
	
}();