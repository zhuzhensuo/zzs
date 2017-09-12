
	
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
		done:true,
		
		isff : /firefox/i.test(navigator.userAgent),
		isapple:/safari/i.test(navigator.userAgent),
		html5:function(){
			if(typeof Worker !=="undefined"){
				return true;
			} else{
				return false;
			}
		}
	}
	
	
	function ScrollBar(o){
		this.id=$(o.id);
		this.f=this.id.find(o.f);
		this.s=this.id.find(o.s);
		this.progress=$(o.g)
		this.index=0;
		this.d=this.progress.find(".tips");
		this.active=this.progress.find(".second_menu");
		this.init.apply(this,arguments);
	}
	ScrollBar.prototype={
		init:function(){
			this.layout();
			this.addEvent();
			this.bindEvent();
			this.obj=[/*1*/[],/*2*/[".triangel",".left_main2",".right_main2",".part1",".part2",".part3",".part4"],/*3*/[".rights_wrap",".pink,.gray",".people1,.people2"],[".li"],[".fl_wrap"],[".seven_step",".left_click",".right_click",".left_yh",".right_yh",".word_wrap",".lines",".name_wrap",".peoples"],[]];
			this.resetStyle=[/*1*/[],/*2*/[{top:-100+"%"},{marginLeft:-350},{marginRight:-350},{opacity:0},{width:0},{opacity:0},{paddingTop:0,opacity:0}],/*3*/[{width:0,height:0,top:195,left:195},{width:3},{opacity:0}],/*4*/[{opacity:0}],/*5*/[{width:0}],/*6*/[{top:-100+"%"},{left:200,opacity:0},{right:200,opacity:0},{left:40+"%",opacity:0},{right:40+"%",opacity:0},{opacity:0},{width:0},{height:0},{bottom:30,opacity:0}],/*7*/[]];
			
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
			
			$(document).bind("keyup",function(evt){
				var e=evt || window.event;
				var which=e.which;
				switch(which){
					case 40:
						if(_this.index>=_this.s.length-1 || !zzs.done){return;}
						_this.index++;
						_this.doMove();
						break;
					case 38:
						if(_this.index<=0 || !zzs.done){return;}
						_this.index--;
						_this.doMove();
						break;
				}
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
			var li=this.d.find("li");
			this.d.animate({top:-(this.index*li.height())},"slow","easeInOutExpo");
			this.changeState();
			this.f.stop(true,false).animate({top:-(h*this.index)},"slow","easeInOutExpo",function(){
				_this.callBacks();
			});
			this.resetCss();
		},
		callBacks:function(){
			
			switch((this.index+1)){
				case 1:
					zzs.done=true;
					break;
				case 2:
					this.secondAnimation();
					break;
				case 3:
					this.thirdAnimation();
					break;
				case 4:
					this.fourthAnimation();
					break;
				case 5:
					this.fifthAnimation();
					break;
				case 6:
					this.sixthAnimation();
					break;
				case 7:
					zzs.done=true;
					break;
			}
		},
		changeState:function(){
			var li=this.active.find("li");
			li.removeClass("active");
			li.eq(this.index).addClass("active");
			
		},
		bindEvent:function(){
			var _this=this;
			var li=this.active.find("li");
			li.click(function(){
				var in_dex=li.index(this);
				if(in_dex==_this.index){return}
				_this.index=in_dex;
				_this.doMove();
			});
		},
		resetCss:function(){
			var _this=this;
			for(var i=0;i<this.obj[this.index].length;i++){
				try{
					$(this.obj[this.index][i]).css(this.resetStyle[this.index][i]);
				}catch(e){
					return;
				}
				
			}
		},
		resetting:function(){
			var h=this.id.outerHeight();
			this.f.css({top:-(h*this.index)});
		},
		commonFn:function(obj,attr){
			var i=0,timer=null,times=0,time=100;
			var fn=function(){
				$(obj[i]).animate(attr[i],"slow","easeOutCirc",function(){
					if(times>=obj.length-1){
						zzs.done=true;
						return;
					}
					times++;
				});
				if(i>=obj.length-1){
					clearTimeout(timer);
					return;
				}
				i++;
				timer=setTimeout(fn,time);
			}
			fn();
		},
		secondAnimation:function(){
			var obj=[".left_main2",".right_main2",".part1",".part2",".part3",".part4"],_this=this;
			
			var attr=[{marginLeft:40},{marginRight:40},{opacity:1},{width:361},{opacity:1},{paddingTop:50,opacity:1}];
			$(".triangel").animate({top:50+"%"},"easeInOutExpo",function(){
				_this.commonFn(obj,attr);
			});
			
		},
		thirdAnimation:function(){
			var obj=[".gray",".pink",".people1",".people2"],_this=this;
			
		
			var attr=[{width:50+"%"},{width:50+"%"},{opacity:1},{opacity:1}];
			$(".rights_wrap").animate({width:100+"%",height:100+"%",left:0,top:0},"slow","easeInOutBack",function(){
				_this.commonFn(obj,attr);
			});
			
		},
		fourthAnimation:function(){
			var obj=$(".scroll_part_next").find("li"),arr=[],_this=this;
			var attr=[{opacity:1}];
			for(var i=0;i<obj.length;i++){
				obj.eq(i).addClass("li_"+(i+1));
				arr.push(".li_"+(i+1));
				attr[i]={opacity:1}
			}
			_this.commonFn(arr,attr);
		},
		fifthAnimation:function(){
			var timer=null,_this=this,obj=$(".fl_wrap"),attr=[],arr=[];
			var fn=function(){
				$(".border_div").toggleClass("borderClass");
				timer=setTimeout(fn,80);
			}
			fn();
			setTimeout(function(){
				clearTimeout(timer);
				$(".border_div").addClass("borderClass");
				for(var i=0;i<obj.length;i++){
					obj.eq(i).addClass("fl_wrap"+(i+1));
					arr.push(".fl_wrap"+(i+1));
					attr[i]={width:100+"%"};
				}
				_this.commonFn(arr,attr);
			},600);
			
		},
		sixthAnimation:function(){
			var _this=this;
			var obj=[".left_click",".right_click",".left_yh",".right_yh",".word_wrap",".lines",".name_wrap",".peoples"];
			var attr=[{left:0,opacity:1},{right:0,opacity:1},{left:0,opacity:1},{right:0,opacity:1},{opacity:1},{width:230},{height:52},{bottom:0,opacity:1}];
			
			$(".seven_step").animate({top:50+"%"},function(){
				_this.commonFn(obj,attr);
			})
			
		}
		
	}
$(function(){
	$(".steps").each(function(i){
		$(this).addClass("steps_"+(i+1));
	});
	
	var fn=function(){
		var done=true;
		var fn_1=function(){
			var first=$(".up").find("div:first"),last=$(".up").find("div:last")
			if(zzs.html5()){
				if(done){
					first.removeClass("todown2").addClass("todown");
					last.removeClass("toup2").addClass("toup");
					done=!done;
				}else{
					first.addClass("todown2");
					last.addClass("toup2");
					
					done=!done;
				}
			}else{
				first.animate({top:150,opacity:0},"slow");
				last.animate({top:0,opacity:1},"slow");
				$(".up").append(first);
			}
			
			setTimeout(arguments.callee,3000);
			
		}
		fn_1();
		
		
		
	}
	
	fn();
	function Scroll2(id,l,r,auto){
		this.id=$("#"+id);
		this.ul=this.id.find("ul");
		this.li=this.ul.find("li");
		this.l=this.id.find("div."+l);
		this.r=this.id.find("div."+r);
		this.auto=auto;
		this.done=true;
		var _this=this;
		this.init.apply(this,arguments);
		
	}
	
	Scroll2.prototype={
		init:function(){
			this.ul.css("width",this.li.width()*this.li.length);
			this.event();
		},
		event:function(){
			var me=this;
			this.l.click(function(){
				if(!me.done) return;
				me.done=!me.done;
				me.ul.animate({left:-me.li.width()},"slow","easeInOutBack",function(){
					
					me.ul=me.id.find("ul");
					me.li=me.id.find("li");
					me.ul.append(me.li.eq(0));
					me.ul.css("left",0);
					me.done=!me.done;
				});
				
			});
			this.r.click(function(){
					if(!me.done) return;
					me.done=!me.done;
					me.ul=me.id.find("ul");
					me.li=me.id.find("li");
					me.li.eq(me.li.length-1).insertBefore(me.li.eq(0));
					me.ul.css("left",-me.li.width()).animate({left:0},"slow","easeInOutBack",function(){
						me.done=!me.done;
					});
				});
		}
	}
	
	new Scroll2("wrap","right_btn","left_btn",true);
	
	var add_transition=function(){
		$(".five_wrap").find(".fl_wrap").each(function(){
			$(this).find("dd,div").addClass("transition");
		});
	}
	add_transition();
	
	
	var move_bg=function(){
		var x=0,obj=$(".steps_6");
		var fn=function(){
			obj.css("backgroundPosition",x+"px center");
			if(Math.abs(x)%1920==0){
				x=0;
			}
			x--;
			setTimeout(fn,20);
		}
		fn();
	}
	move_bg();
	
	
	var here=function(){
		var ispeed=0,obj=$(".position"),maxValue=350,minValue=330;
		setInterval(function(){
			var top=obj.position().top;
			ispeed+=1;
			var total=top+ispeed;
			
			//alert(total);
			if(total>maxValue){
				total=maxValue;
				ispeed*=-1;
			}else if(total<minValue){
				total=minValue;
				ispeed*=-1;
			}
			obj.css("top",total);
		},50);
	}
	here();
	
	var come_out=function(){
		var obj=$(".menu"),son=obj.children(".second_menu"),timer=null,_this=this;
		obj.hover(function(){
			clearTimeout(timer);
			son.css({display:"block"}).stop(true,false).animate({opacity:1,top:55});
		},function(){
			timer=setTimeout(function(){
				son.stop(true,false).animate({opacity:0,top:38},function(){
					$(this).hide();
				});
			},500);
			
		});
		
		
		
	}
	come_out();
	
	var notHtml5=function(){
		
		var l=$(".left_click"),r=$(".right_click"),i=0,maxium=$("#noh5").find(".word_models").length,change1=$("#noh5").find(".word_models"),change2=$("#noh5").find(".info_wrap"),change3=$("#noh5").find(".people_photo"),done=true;
		var obj=[".name_wrap",".peoples",".lines",".word_wrap",".offer_pos"];
		var obj2=[".peoples",".name_wrap",".lines",".word_wrap",".offer_pos"];
		var o=[{opacity:0},{opacity:0,bottom:30},{width:0},{opacity:0},{width:20+"%"}];
		var o2=[{opacity:1,bottom:0},{opacity:1},{width:230},{opacity:1},{width:100+"%"}];
		
		var f_n=function(s){
			return $("#noh5").find(s);
		}
		
		r.click(function(){
			if(!done){return}
			i++;
			if(i>=maxium){
				i=0;
			}
			doMove();
			
			done=false;
		});
		
		l.click(function(){
			if(!done){return}
			i--;
			if(i<0){
				i=maxium-1;
			}
			doMove();
			done=false;
		});
		
		function doMove(){
			var fn=function(){
				var times=0,timer=null,tmp=0;
				var fn_1=function(){
					f_n(obj[times]).animate(o[times],function(){
					if(tmp>=obj.length-1){
						fn2();
						return;
					}
					tmp++
					});
					if(times>=obj.length-1){
						clearTimeout(timer);
						return;
					}
					times++;
					timer=setTimeout(fn_1,300);	
					}
					fn_1();
				}
			fn();
			
			var fn2=function(){
				var times=obj.length-1,timer=null,tmp=0;
				change1.addClass("hide").eq(i).removeClass("hide");
				change2.addClass("hide").eq(i).removeClass("hide");
				change3.addClass("hide").eq(i).removeClass("hide");
				var fn_1=function(){
					f_n(obj2[times]).animate(o2[times],"easeInExpo",function(){
					if(tmp>=obj.length-1){
						done=true;
						return;
					}
					tmp++
					});
					if(times<=0){
						clearTimeout(timer);
						return;
					}
					times--;
					timer=setTimeout(fn_1,300);	
					}
					fn_1();
				}
				
			}
			
	}
	
	
	var html5=function(){
		var l=$(".left_click"),r=$(".right_click"),model=$("#h5").find(".seven_step_wrap"),i=0,done=true;
		
		r.click(function(){
			if(!done){return;}
			i++;
			done=false;
			if(i>=model.length){
				i=0;
			}
			model.removeClass("zero").addClass("minus_ninety").eq(i).removeClass("minus_ninety").addClass("zero");
			timers();
		});
		
		l.click(function(){
			if(!done){return;}
			i--;
			done=false;
			if(i<0){
				i=model.length-1;
				
			}
			model.removeClass("zero").addClass("minus_ninety").eq(i).removeClass("minus_ninety").addClass("zero");
			timers();
		});
		
		
		
		var timers=function(){
			clearTimeout(timers.timer);
			timers.timer=setTimeout(function(){
				done=true;
			},1000);
		}
		
	}
	
	if(!zzs.html5()){
		$("#noh5").show();
		notHtml5();
	}else{
		$("#h5").show();
		html5();
		
	}
	
	
	
})
window.onload=function(){
	new ScrollBar({
		id:"#wraper",
		f:".wraps",
		s:".steps",
		g:".progress"
	});
	
	
	var change_sth=function(){
		var fn=function(){
			var h=$(window).height()-80;
			$(".five_wrap").css("height",h);
		}
		fn();
		$(window).resize(fn);
	}
	change_sth();
	
	
	
	
	
}

















