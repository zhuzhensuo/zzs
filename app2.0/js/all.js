var mess=function(){
	$(".loading").stop().animate({height:100+"%"});
}
var load_done=function(fn){
	$(".loading").stop().animate({height:0+"%"},fn);
}
mess();
	var zzs={
		addEventListener:function(obj,type,fn){
			if(window.addEventListener){
				obj.addEventListener(type,fn,false);
			}else if(window.attachEvent){
				obj.attachEvent("on"+type,fn);
			}else{
				obj["on"+type]=fn;
			}
		},
		removeEventListener:function(obj,type,fn){
			if(window.removeEventListener){
				obj.removeEventListener(type,false,fn);
			}else if(window.detachEvent){
				obj.detachEvent("on"+type,fn);
			}else{
				obj["on"+type]=null;
			}
		},
		done:false,
		
		isff : /firefox/i.test(navigator.userAgent),
		isapple:/safari/i.test(navigator.userAgent)
	}
	
	
	function ScrollBar(o){
		this.id=$(o.id);
		this.f=this.id.find(o.f);
		this.s=this.id.find(o.s);
		this.progress=$(o.g)
		this.index=0;
		this.d=this.progress.find("li");
		this.active=this.progress.find("div");
		this.init.apply(this,arguments);
	}
	ScrollBar.prototype={
		init:function(){
			this.layout();
			this.addEvent();
			this.bindEvent();
			this.obj=[[".one_words",".firstImg"],[".t_c_top",".second_left",".second_right"],[".three_c_top",".three_footer",".flash_content"],[".f_c_content",".four_footer"],[".five_t_content",".five_footer"],[".six_top",".six_footer"]];
			this.resetStyle=[[{
				top:-100,
				opacity:0
			},{
				bottom:-100,
				opacity:0
			}]/*1*/,[{
				top:-100,
				opacity:0
			},{
				left:-50,
				opacity:0
			},{
				right:-50,
				opacity:0
			}]/*2*/,[{
				top:-50,
				opacity:0
			},{
				bottom:0,
				opacity:0
			},{height:0,width:0,top:262,left:470}]/*3*/,[{
				top:-100,
				opacity:0
			},{
				bottom:-100,
				opacity:0
			}]/*4*/,[{
				left:-100,
				opacity:0
			},{
				left:100,
				opacity:0
			}]/*5*/,[{
				top:-50,
				opacity:0
			},{
				bottom:-50,
				opacity:0
			}]];
			
			this.movePara=[[{top:-20,opacity:1},{bottom:0,opacity:1}],[{top:0,opacity:1},{left:50,opacity:1},{right:50,opacity:1}],[{top:0,opacity:1},{bottom:50,opacity:1},{left:0,top:0,height:525,width:940}],[{top:0,opacity:1},{bottom:0,opacity:1}],[{left:0,opacity:1},{left:0,opacity:1}],[{top:0,opacity:1},{bottom:0,opacity:1}]];
			
			
			this.animation();
			this.resetCss();
			
			
			
			
		},
		layout:function(){
			var _this=this;
			var fn=function(){
				var h=_this.id.outerHeight();
				_this.s.css({height:h});
			}
			fn();
			$(window).resize(function(){
				fn();
				_this.resetting();
			});
			
		},
		addEvent:function(){
			var _this=this;
			zzs.addEventListener(document,zzs.isff ? "DOMMouseScroll" : "mousewheel",function(evt){
				var e=evt || window.event;
				var d=zzs.isff ? e.detail : e.wheelDelta*(-1);
				_this.getDirection(d);
			});
		},
		getDirection:function(d){
			if(d>0){
				if(this.index>=this.s.length-1 || !zzs.done){return;}
				this.index++;
				this.doMove();
			}else{
				if(this.index<=0 || !zzs.done){return;}
				this.index--;
				this.doMove();
			}
		},
		doMove:function(){
			
			if(!zzs.done){return;}
			zzs.done=false;
			var _this=this;
			var h=this.id.outerHeight();
			this.active.animate({width:(this.index*40)+(this.index+1)*18},function(){
				_this.changeState();
			});
			this.f.stop(true,false).animate({top:-(h*this.index)},"slow","easeInQuart",function(){
				_this.resetCss();
				_this.animation();
				
			});
		},
		changeState:function(){
			this.d.removeClass("active");
			for(var i=0;i<=this.index;i++){
				this.d.eq(i).addClass("active");
			}
		},
		bindEvent:function(){
			var _this=this;
			var li=this.d;
			li.click(function(){
				_this.index=li.index(this);
				_this.doMove();
			});
		},
		animation:function(){
			var index=this.index,nowObj=this.obj[index],len=nowObj.length,tmp=0,times=0;
			var _this=this;
			zzs.done=false;
			var fn=function(){
				var o=_this.movePara[index][tmp];
				$(_this.obj[index][tmp]).css(_this.resetStyle[index][tmp]);
				$(_this.obj[index][tmp]).stop(false,true).animate(_this.movePara[index][tmp],"slow",function(){
					times++;
					if(times==len){
						_this.callBack();
						zzs.done=true;
					}
					
				});
				if(tmp>=len-1){
					clearTimeout(fn.timer);
					return;
				}
				tmp++;
				fn.timer=setTimeout(arguments.callee,500);
			}
			fn();
			
		},
		resetCss:function(){
			var _this=this;
			for(var i=0;i<this.obj.length;i++){
				var arr=this.obj[i],styles=this.resetStyle[i];
				for(var j=0;j<arr.length;j++){
					$(arr[j]).css(styles[j]);
				}
			}
		},
		resetting:function(){
			var h=this.id.outerHeight();
			this.f.css({top:-(h*this.index)});
		},
		callBack:function(){
			var i=0,obj=$(".six_wrap");
			if(this.index!=this.s.length-1) return;
			var fn=function(){
				obj.eq(i).addClass("transform");
				if(i>=obj.length-1){
					clearTimeout(fn.timer);
					setTimeout(function(){
						obj.removeClass("transform");
					},5000);
					return;
				}
				i++;
				fn.timer=setTimeout(arguments.callee,200);
			}
			fn();
		}
		
	}
	
	
	$(function(){
	var changeActive=function(){
		var obj=$(".five_wrap");
		obj.mouseover(function(){
			obj.removeClass("active");
			$(this).addClass("active");
		});
	}
	changeActive();
	
	var look_demo=function(){
		$(".yanshi").click(function(){
			$(".shadow_bg").fadeIn();
		});
		
		$(".shadow_bg").click(function(){
			$(this).fadeOut();
		});
	}
	look_demo();
	
	var isSafari=function(){
		if(zzs.isapple){
			$(".progress ul.clearfix").addClass("isapple");
		}
	}
	isSafari();
	
	
	
	(function(){
		var arr=[{height:250,width:142,top:137,left:45},{height:407,width:232,top:59,left:185},{height:250,width:142,top:137,left:405}];
		
		var model=$("#click_scroll").find("div"),left=$(".right_btn"),right=$(".left_btn"),tips=1;
		model.each(function(i){
			if(i<arr.length-1){
				$(this).css(arr[i]);
			}else{
				$(this).css(arr[arr.length-1]);
			}
		});
		
		var changeZindex=function(){
			var arr2=[1,3,1];
			for(var i=0;i<model.length;i++){
				if(i<arr2.length){
					model.eq(i).css("zIndex",arr2[i]);
				}else{
					model.eq(i).css("zIndex",arr2[arr2.length-1]);
				}
			}
		}
		changeZindex();
		var doMove=function(){
			model.each(function(i){
				$(this).stop(true,false).animate(arr[i]);
				
				/*
				if(i<arr.length-1){
					$(this).stop(true,false).animate(arr[i]);
				}else{
					$(this).stop(true,false).animate(arr[arr.length-1]);
				}
				*/
			});
		}
		
		var xianshi=function(){
			$(".func_produce").hide();
			$(".func_produce").eq(tips).show();
		}
		
		var doMove2=function(){
			
			var first=$("#click_scroll").find("div:first");
			var last=$("#click_scroll").find("div:last");
			last.insertBefore(first);
			model=$("#click_scroll").find("div");
			doMove();
			changeZindex();
			tips--;
			if(tips<0){tips=$(".func_produce").length-1;}
			xianshi();
			
			
		}
		left.click(function(){
			var first=$("#click_scroll").find("div:first");
			$("#click_scroll").append(first);
			model=$("#click_scroll").find("div");
			doMove();		
			changeZindex();	
			
			tips++;
			if(tips>=$(".func_produce").length){tips=0;}
			xianshi();
			
		});
		var auto=function(){
			auto.timer=setInterval(function(){
				doMove2();
			},3000);
		}
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
		
		
		
		right.click(function(){
			doMove2();
		});
		
		
	})();
});


window.onload=function(){
	setTimeout(function(){
		load_done(function(){
			new ScrollBar({
				id:"#body_wrap",
				f:".wrap",
				s:".steps",
				g:".progress"
			});
		});
	},500);
	
}







