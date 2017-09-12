$(function(){
	
	var Cloud=function(o){
		this.id=$(o.id);
		
		this.init.apply(this,arguments);
	}
	Cloud.prototype={
		init:function(){
			this.run();
		},
		random:function(max,min){
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		run:function(){
			var maxTop=$(".slide_menu").outerHeight()-this.id.outerHeight(),w=$(document).width(),delay=this.random(20,1);
			
			var l=this.random(w,0),t=this.random(maxTop,0),timer=null,_this=this;
			_this.id.css({top:t});
			var fn=function(time){
				t=_this.random(maxTop,0)
				_this.id.css({top:t});
				delay=_this.random(20,1);
				timer=setInterval(function(){
					l--;
					if(l<=-_this.id.outerWidth()){
						l=$(document).width();
						clearInterval(timer);
						fn(delay);
					}
					_this.id.css({left:l,top:t});
				},time);
			}
			fn(delay);
			
				
			
		}
	}
	
	new Cloud({
		id:"#big_cloud"
	});
	new Cloud({
		id:"#small_cloud"
	});
	
	
});

var func=function(){
	var models=$(".models"),scan=$(".scan"),qipao=$(".qipao"),person=$(".persons");
	var zzs={
		init:function(){
			this.arr=[];
			var _this=this;
			models.each(function(i){
				_this.arr[i]=$(this).offset().top;
			});
			
			this.target=[{left:50,opacity:1},{top:0,opacity:1},{top:0,opacity:1},{top:0,opacity:1}];
			this.obj=[".ipad",".point_ipad_wrap",".s_func",".person_center_wrap"];
			this.addEvent();
			this.startAnimation();
		},
		startAnimation:function(){
			var i=0,timer=null;
			var fn=function(){
				qipao.eq(i).children("img").animate({left:0,top:0,width:100+"%"},"slow","easeInOutBack");
				if(i>qipao.length-1){
					clearTimeout(timer);
					return;
				}
				i++;
				timer=setTimeout(fn,500);
			}
			scan.animate({top:-159,opacity:1},1000,"easeInOutBack",function(){
				fn();
			});
		},
		addEvent:function(){
			var _this=this;
			$(window).scroll(function(){
				var top=$(document).scrollTop();
				$.each(_this.arr,function(k,v){
					if(top>=v-200){
						$(_this.obj[k]).animate(_this.target[k],1000,function(){
							if(k==_this.arr.length-1){
								_this.lastAnimation();
							}
						});
					}
				});
			});
		},
		lastAnimation:function(){
			var i=0,timer=null;
			var fn=function(){
				person.eq(i).children("img").animate({left:0,top:0,width:100+"%"},"slow","easeInOutBack");
				if(i>person.length-1){
					clearTimeout(timer);
					return;
				}
				i++;
				timer=setTimeout(fn,500);
			}
			fn();
		}
		
	}
	zzs.init();
	
	
	
	(function(){
		var arr=[{height:330,width:437,top:0,left:20,opacity:0.3},{height:430,top:60,left:315,opacity:1,width:570},{height:330,top:0,left:730,opacity:0.3,width:437}];
		
		
		
		
		var model=$(".scrollings_wrap").find("div"),left=$(".right_btn"),right=$(".left_btn");
		model.each(function(i){
			$(this).css(arr[i]);
		});
		
		var changeZindex=function(){
			var arr2=[1,3,1];
			for(var i=0;i<model.length;i++){
				model.eq(i).css("zIndex",arr2[i]);
			}
		}
		changeZindex();
		var doMove=function(){
			model.each(function(i){
				$(this).stop(true,false).animate(arr[i],1000,"easeInOutExpo");
				
			});
		}
		
	
		
		var doMove2=function(){
			
			var first=$(".scrollings_wrap").find("div:first");
			var last=$(".scrollings_wrap").find("div:last");
			last.insertBefore(first);
			model=$(".scrollings_wrap").find("div");
			changeZindex();
			doMove();
			
			
			
		}
		left.click(function(){
			var first=$(".scrollings_wrap").find("div:first");
			$(".scrollings_wrap").append(first);
			model=$(".scrollings_wrap").find("div");
			doMove();		
			changeZindex();	
			
		});
		var auto=function(){
			auto.timer=setInterval(function(){
				doMove2();
			},3000);
		}
		
		right.click(function(){
			doMove2();
		});
		auto();
		
		left.hover(function(){
			clearInterval(auto.timer);
		},function(){
			auto();
		});
		right.hover(function(){
			clearInterval(auto.timer);
		},function(){
			auto();
		});
		
		
	})();
	
	var contact=function(){
		$(".suspension").find(".j-icon").mouseover(
			function(){
				$(".suspension").find(".j-box").eq($(this).index()).show().siblings(".j-box").hide();
			}
		);
//鍒ゆ柇ie娴忚鍣�
	
		if(navigator.appVersion.match(/11./i) == '11.' || navigator.appVersion.match(/10./i) == '10.') {
			$(".suspension").css("right","30px");
		}

		$(".suspension .j-back-top").hide()
		
		$(window).scroll(function(){
			if($(window).scrollTop() > 100){
				$(".suspension .j-back-top").fadeIn()
			}else {
				$(".suspension .j-back-top").fadeOut()
			}
		});
		$(".j-tencent").hover(function(){
					$(".tencent-qq").stop(true,false).animate({width:"51",height:"59",left:"-3"});
				},function(){
					$(".tencent-qq").stop(true,false).animate({width:"39",height:"45",left:"3"});
				});
		// 鏁堟灉
		$(".suspension").mouseleave(function(event){
			event.preventDefault();
			$(".suspension").find(".j-box").hide();
		});
		
		$(".j-back-top").click(function(){
			$("html,body").animate({scrollTop:0},500);
		});
	}
	
	contact();
	
	
	
	
	
	
	
	
	
}
window.onload=function(){
	func();
}

