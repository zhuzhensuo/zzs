


$(function(){
	$(document).bind("contextmenu",function(e){
		e.preventDefault();
		return false;
	});
	
	(function(){
	var wrap=$("#wrapper"),models=wrap.children(".models"),index=0,done=true,isff=/firefox/i.test(navigator.userAgent),in_dex=0,next_step=wrap.children(".next_arrows");
	var createBtn=function(){
		var ul=$("<ul class='btn'></ul>");
		for(var i=0;i<models.length;i++){
			var li=$("<li></li>");
			ul.append(li);
		}
		wrap.append(ul);
	}
	var center=function(){
		var ul=$(".btn"),li=ul.children("li");
		ul.css({height:li.length*li.outerHeight(),marginTop:-ul.outerHeight()/2});
		li.eq(index).addClass("active");
		li.eq(li.length-1).addClass("last");
		
		bindEvent(li);
		return li;
	}
	var zindex=function(){
		for(var i=0;i<models.length;i++){
			models.eq(i).css({zIndex:models.length-i});
		}
	}
	zindex();
	
	var bindEvent=function(obj){
		obj.click(function(){
			in_dex=obj.index(this);
			windowScroll(in_dex,obj);
		});
	}
	/*
	var href=window.location.href;
	if(href.indexOf("ecmoban.com")==-1){
		return;
	}
	*/
	var windowScroll=function(i,o){
		if(!done){return;}
		done=false;
		if(i>index){
			if(i==obj_li.length-1){
				obj_li.parent("ul").stop().animate({top:0+"%",opacity:0},"slow");
				next_step.stop().animate({bottom:100+"%"},"slow");
			}
			models.eq(i).css("height",100+"%").siblings("div.models").animate({height:0+"%"},"slow",function(){
				done=true;
				if(i==obj_li.length-1){
					models.eq(obj_li.length-1).addClass("models_last2");
				}
			});
			index=i;
			o.removeClass("active").eq(index).addClass("active");
		}else{
			var top=$(document).scrollTop();
			models.eq(obj_li.length-1).removeClass("models_last2");
			models.eq(i).stop(true,false).animate({height:100+"%"},"slow",function(){
				done=true;
			});
			o.removeClass("active").eq(i).addClass("active");
			obj_li.parent("ul").stop().animate({top:50+"%",opacity:1});
			next_step.stop().animate({bottom:0},"slow");
			index=i;
			
		}
	}
	
	var init=function(){
		createBtn();
		return center();
	}
	var obj_li=init();
	
	var returnDir=function(evt){
		var e=evt||window.event;
		var direction=isff ? -e.detail : e.wheelDelta;
		return direction;
	}
	
	var zzs2={
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
		isff : /firefox/i.test(navigator.userAgent),
		step:0,
		done:true
	}
	var move=function(evt){
		var e=evt || window.event;
		var val=returnDir(e);
		var top=$(".models_last").scrollTop();
		if(!done){return;}
		if(val<0){
			if(in_dex>=obj_li.length-1){
				return;
			}
			in_dex++;
			windowScroll(in_dex,obj_li);
		}else{
			if(in_dex<=0 || top>0){
				return;
			}
			in_dex--;
			windowScroll(in_dex,obj_li);
				
		}
	}
	
	next_step.click(function(){
		if(in_dex>=obj_li.length-1){
			return;
		}
		in_dex++;
		windowScroll(in_dex,obj_li);
	});
	
	zzs2.addEventListener(document,isff ? "DOMMouseScroll" : "mousewheel",move);
	
	var auto=function(){
		auto.timer=setInterval(function(){
			in_dex++;
			if(in_dex>models.length-1){in_dex=0;}
			windowScroll(in_dex,obj_li);
		},4000);
	}
	//auto();
	
	
})();


//菜单页面js
void function(){
	$(".only").each(function(){
		$(this).hover(function(){
			$(this).find("div").show().stop(true,false).animate({fontSize:27.5,opacity:1});
		},function(){
			$(this).find("div").stop(true,false).animate({fontSize:50,opacity:0});
		});
	});
	$(".close").click(function(){
		$(".fixed_div").fadeOut();
	});
	
	$(".open").click(function(){
		$(".fixed_div").fadeIn();
	});
	
	
	
}();


void function(){
	var len=$(".step_words").length,arr=[470,415],index=len;
	
	var cartoon=function(){
		cartoon.timer=setTimeout(function(){
			callBack();
		},1000);
	}
	cartoon();
	
	var callBack=function(){
		var fn=arguments.callee;
		if(index<0){
			clearInterval(cartoon.timer);
			clearTimeout(callBack.out);
			return;
		}
		index--;
		$(".foot_step").eq(index).children("img").fadeIn("slow",function(){
			$(".step_words").eq(index).animate({width:arr[index]},"slow");
			callBack.out=setTimeout(fn,1000);
		});
		
	}

	$("#backtop").click(function(){
		$(".models_last").scrollTop(0);
	});
	$(".backtop").click(function(){
		$("html,body").scrollTop(0);
	});
	
	$(".share").hover(function(){
		$(this).children(".share_btn").fadeIn();
	},function(){
		$(this).children(".share_btn").hide();
	});
	
}()

		
		
	try{
		$('.lightbox').lightbox();
	}catch(e){return}
	
});








