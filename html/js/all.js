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
	done2:false,
	html5:function(){
		if(typeof Worker!=="undefined"){
			return true;
		}else{
			return false;
		}
	},
	isff : /firefox/i.test(navigator.userAgent),
	isie:/msie/i.test(navigator.userAgent),
	ischrome:/chrome/i.test(navigator.userAgent),
	isapple:function(){
		if(this.isff || this.isie || this.ischrome){
			return false;
		}else{
			return true;
		}
	}
}

function ScrollBar(o){
		this.id=$(o.id);
		this.hide=this.id.find(o.hide);
		this.progress=this.id.find(o.progress);
		this.index=0;
		this.done=false;
		this.banner=this.id.find(o.banner);
		this.ul=this.banner.find("ul");
		this.li=this.ul.find("li");
		this.span=this.progress.find("span");
		this.dl=this.progress.find("dl");
		this.init.apply(this,arguments);
	}
	ScrollBar.prototype={
		init:function(){
			this.layout();
			this.firstEvent();
			this.addEvent();
			this.calcColor();
			this.bindEvent();
		},
		layout:function(){
			var len=this.li.length,w=this.li.outerWidth();
			this.ul.css("width",w*len);
			
			if(zzs.html5() && !zzs.isapple()){
				$(".rounds").show();
			}else{
				$(".rounds").hide();
			}
			
		},
		firstEvent:function(){
			var self=this;
			this.hide.stop(true,false).animate({width:30+"%"},800,"linear");
			this.progress.stop(true,false).animate({left:0},2000,"linear");
			setTimeout(function(){
				self.hide.stop(true,false).animate({width:0},1200,"linear",function(){
					zzs.done=true;
					self.banner.animate({height:400,width:1024,marginTop:-200,marginLeft:-512,opacity:1},"slow");
				});
			},2000);
			
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
				if(this.index>=this.li.length-1 || !zzs.done){return;}
				this.index++;
				this.doMove();
				zzs.done=false;
			}else{
				if(this.index<=0 || !zzs.done){return;}
				this.index--;
				this.doMove();
				zzs.done=false;
			}
		},
		doMove:function(){
			if(this.index>0){
				this.progress.addClass("time_active");
				this.banner.addClass("scroll_active");
				if(this.index>=1 && !this.done){
					this.calcColor({r:255,g:255,b:255},{r:34,g:165,b:228});
					this.done=true;
				}
				
			}else{
				this.progress.removeClass("time_active");
				this.banner.removeClass("scroll_active");
				this.calcColor({r:34,g:165,b:228},{r:255,g:255,b:255});
				this.done=false;
			}
			this.changeState();
		},
		bindEvent:function(){
			var span=this.dl,_this=this;
			span.click(function(){
				var i=span.index(this);
				
				if(i==_this.index){return;}
				
				_this.index=i;
				_this.doMove();
			});
		},
		changeState:function(){
			var w=this.li.outerWidth(),_this=this;
			this.dl.removeClass("active").eq(this.index).addClass("active");
			this.ul.animate({left:-w*this.index},1000,"easeInOutExpo",function(){
				zzs.done=true;
			});
		},
		calcColor:function(o1,o2){
			var _this=this,done=true;
			clearInterval(this.timer);
			this.timer=setInterval(function(){
				done=true;
				for(var index in o2){
					var tar=o2[index];
					var now=o1[index];
					var s=(tar-now)/6;
					s = s>0 ? Math.ceil(s) : Math.floor(s);
					if(tar!=now){
						done=false;
						now = s+now;
						o1[index]=now;
						$("body").css("backgroundColor","rgb("+o1["r"]+","+o1["g"]+","+o1["b"]+")");		
					}
					
				}
				if(done){
					clearInterval(_this.timer);
				}
				
			},30);
		}
	}
	
function ScrollBar2(o){
		this.id=$(o.id);
		this.f=this.id.find(o.f);
		this.s=this.id.find(o.s);
		this.active=this.id.find(o.li);
		this.index=0;
		this.init.apply(this,arguments);
	}
	ScrollBar2.prototype={
		init:function(){
			this.layout();
			this.addEvent();
			this.bindEvent();
			this.fourthAnimation.done=false;
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
			
			$(".j-back-top").click(function(){
				 	_this.index=0;
     				_this.doMove();
			});
			
		},
		getDirection:function(d){
			if(d>0){
				if(this.index>=this.s.length-1 || !zzs.done2){return;}
				this.index++;
				this.doMove();	
			}else{
				var self=this;
				var last=this.s.eq(this.s.length-1),t=last.scrollTop();
				if(this.index<=0 || !zzs.done2 || t>0){return;}
				this.index--;
				this.doMove();	
			}
		},
		doMove:function(){
			
			if(!zzs.done2){return;}
			zzs.done2=false;
			var _this=this;
			var h=this.id.outerHeight();
			this.changeState();
			this.f.stop(true,false).animate({top:-(h*this.index)},1300,"easeInOutExpo",function(){
				_this.callBacks();
				zzs.done2=true;
			});
		},
		callBacks:function(){
			
			switch((this.index+1)){
				case 1:
					$(".suspension .j-back-top").fadeOut();
					zzs.done2=true;
					break;
				case 2:
					$(".suspension .j-back-top").fadeIn();
					this.secondAnimation();
					break;
				case 3:
				$(".suspension .j-back-top").fadeIn();
					this.thirdAnimation();
					break;
				case 4:
				$(".suspension .j-back-top").fadeIn();
					this.fourthAnimation();
					break;
				case 5:
				$(".suspension .j-back-top").fadeIn();
					this.fifthAnimation();
					break;
			}
		},
		changeState:function(){
			var li=this.active.find("li");
			li.removeClass("active").eq(this.index).addClass("active");
			
		},
		resetting:function(){
			var h=this.id.outerHeight();
			this.f.css({top:-(h*this.index)});
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
		secondAnimation:function(){
			var obj=[".goods_a",".goods_b",".goods_c",".goods_d",".goods_e"];
			var attr=[{left:200,top:-10,opacity:1},{left:215,top:180,opacity:1},{left:700,top:165,opacity:1,zIndex:11},{left:890,top:-50,opacity:1},{top:220,left:925,opacity:1}];
			this.commonFn(obj,attr);
			
		},
		thirdAnimation:function(){
			var obj=[".img2"];
			var attr=[{left:-330,top:-30,opacity:1,width:1075,height:515}];
			this.commonFn(obj,attr);
			$(".steps_three").find("div").addClass("transform3");
		},
		fourthAnimation:function(){
			var self=this;
			if(this.fourthAnimation.done){return}
			var randomNum=function(max,min){
				return Math.floor(Math.random()*(max-min+1)+min);
			}
			var obj=[".years",".months",".days"];
			var arr=[{mx:9999,mi:1000},{mx:99,mi:10},{mx:99,mi:10}];
			var real=["2015","01","09"];
			var time=20;
			var fn=function(){
				for(var i=0;i<obj.length;i++){
					var r=randomNum(arr[i]["mx"],arr[i]["mi"]);
					$(obj[i]).find("p").text(r);
				}
				
				fn.timer=setTimeout(fn,time);
				setTimeout(function(){
					clearTimeout(fn.timer);
					for(var i=0;i<obj.length;i++){
						$(obj[i]).find("p").text(real[i]);
					}
					self.fourthAnimation.done=true;
				},1000);
				
			}
			fn();
			
		},
		fifthAnimation:function(){
			var img=$(".app").find("img"),i=0,timer=null;
			timer=setInterval(function(){
				img.eq(i).addClass("transform2");
				i++;
				if(i>=img.length){
					clearInterval(timer);
				}
			},300);
		},
		commonFn:function(obj,attr){
			var i=0,timer=null,times=0,time=300;
			var fn=function(){
				$(obj[i]).animate(attr[i],1500,"easeOutCirc",function(){
					if(times>=obj.length-1){
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
		}
		
	}	

function Options(id,cName,model){
	this.id=$("#"+id);
	this.li=this.id.find("."+cName).find("li");
	this.model=this.id.find("."+model);
	this.init();
}
Options.prototype.init=function(){
	var that=this;
	this.model.eq(0).css("display","block");
	this.li.eq(0).addClass("active_1");
	this.li.mouseover(function(){
		var index=that.li.index(this);
		that.li.each(function(i){
			$(this).removeClass("active_"+(i+1));
		});
		that.li.eq(index).addClass("active_"+(index+1));
		
		that.model.css("display","none");
		that.model.eq(index).css("display","block");
	});	
}


$(function(){
	new ScrollBar({
		id:"#main",
		hide:".behide",
		progress:".time_wrap",
		banner:".scroll_banner"
	});
	// new Options("models","main-7-slid-btn","div_models");

	new Options("zuhe_model","zuhe_title","div_models");
	new Options("models","main-7-slid-btn","models");


	new ScrollBar2({
		id:"#wraper",
		f:".wraps",
		s:".steps",
		li:".imgnav"
	});
	
	$(".buy_now").click(function(){
		$(".fixed_div").show();
		$(".body_wrap").animate({top:50+"%",marginTop:-320},1500,"easeInOutExpo");
	});
	$(".close_btn,.go_on_look").click(function(){
		$(".body_wrap").animate({top:100+"%",marginTop:0},1500,"easeInOutExpo",function(){
			$(".fixed_div").hide();
		});
		
	});
	
	
	var add_func=function(){
		var div=$(".div_models_2").find(".f_l");
		div.click(function(){
			div.removeClass("active");
			$(this).addClass("active");
		});
	}
	add_func();
	
	
	function Scrolls(id,l,r,auto){
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
	Scrolls.prototype={
		init:function(){
			this.ul.css("width",this.li.width()*this.li.length);
			this.event2();
		},
		event2:function(){
			var div=$(".main-10-bomword").find("div");
			var _this=this,i=0,done=true,mini=this.ul.width()-$(".scroll_part_next").width();
			var max_num=this.ul.outerWidth()/this.li.outerWidth();
			this.r.hide();
			this.l.bind("click",function(){
				if(!_this.done || !done) return;
				_this.done=!_this.done;
				
				i++;
				_this.li.removeClass("active").eq(i).addClass("active");
				if(i>0){
					_this.r.show();
				}else{
					_this.r.hide();
				}
				div.hide().eq(i).show();
				_this.ul.animate({left:-_this.li.width()*i},"slow",function(){
					_this.done=!_this.done;
					if(i>=max_num-1){
						_this.l.hide();
					}
					
				});
			});
			
			this.r.bind("click",function(){
				if(!_this.done || !done) return;
				_this.done=!_this.done;
				i--;
				_this.li.removeClass("active").eq(i).addClass("active");
				div.hide().eq(i).show();
				_this.ul.animate({left:-_this.li.width()*i},"slow",function(){
					_this.done=true;
					if(_this.ul.position().left>=0){
						_this.r.hide();
					}else{
						_this.l.show();
					}
				});
			});
			
			this.li.click(function(){
				if(!_this.done || !done) return;
				var index=_this.li.index(this);
				i=index;
				if(i==0){
					_this.r.hide();
				}else{
					_this.r.show();
				}
				if(i==_this.li.length-1){
					_this.l.hide();
				}else{
					_this.l.show();
				}
				_this.li.removeClass("active").eq(i).addClass("active");
				div.hide().eq(i).show();
				_this.ul.animate({left:-_this.li.width()*i},"slow");
				
			});
			
			
		}
	
		
	}
	
	new Scrolls("scrolls","right_btn","left_btn",false);
	
	function Scrolls2(id,l,r,auto){
		this.id=$("#"+id);
		this.ul=this.id.find("ul");
		this.li=this.ul.find("li");
		this.l=this.id.find("div."+l);
		this.r=this.id.find("div."+r);
		this.img=this.ul.find("img");
		this.dl=this.id.find("dl");
		this.auto=auto;
		this.done=true;
		var _this=this;
		this.init.apply(this,arguments);
		
	}
	Scrolls2.prototype={
		init:function(){
			this.ul.css("width",this.li.width()*this.li.length);
			this.event2();
		},
		event2:function(){
			var _this=this,i=0,done=true,mini=this.ul.width()-$(".scroll_part_next").width();
			var max_num=this.ul.outerWidth()/this.li.outerWidth();
			this.r.hide();
			this.l.bind("click",function(){
				if(!_this.done || !done) return;
				_this.done=!_this.done;
				
				i++;
				if(i>0){
					_this.r.show();
				}else{
					_this.r.hide();
				}
				_this.img.animate({left:50,top:0,width:311,height:500}).eq(i).animate({height:797,width:454,top:-148,left:-27});
				_this.dl.hide().eq(i).show();
				_this.ul.animate({left:-_this.li.width()*i},"slow",function(){
					_this.done=!_this.done;
					if(i>=max_num-1){
						_this.l.hide();
					}
					
				});
				
			});
			
			this.r.bind("click",function(){
				if(!_this.done || !done) return;
				_this.done=!_this.done;
				i--;
				_this.img.animate({left:50,top:0,width:311,height:500}).eq(i).animate({height:797,width:454,top:-148,left:-27});
				_this.dl.hide().eq(i).show();
				_this.ul.animate({left:-_this.li.width()*i},"slow",function(){
					_this.done=true;
					if(_this.ul.position().left>=0){
						_this.r.hide();
					}else{
						_this.l.show();
					}
				});
			});
			
			this.li.click(function(){
				if(!_this.done || !done) return;
				var index=_this.li.index(this);
				i=index;
				if(i==0){
					_this.r.hide();
				}else{
					_this.r.show();
				}
				if(i==_this.li.length-1){
					_this.l.hide();
				}else{
					_this.l.show();
				}
				_this.li.removeClass("active").eq(i).addClass("active");
				_this.dl.hide().eq(i).show();
				_this.ul.animate({left:-_this.li.width()*i},"slow");
				_this.img.animate({left:50,top:0,width:311,height:500}).eq(i).animate({height:797,width:454,top:-148,left:-27});
				
			});
			
		}
	
		
	}
	new Scrolls2("last","rbtn","lbtn",false);
	
	
	$(".steps").each(function(i){
		$(this).addClass("steps_"+(i+1));
	});
	
	
	var fn=function(){
		var obj=[".whitelogo",".ecjia",".plus"],
			attr=[{opacity:1},{opacity:1,bottom:0},{opacity:1,right:54}],
			i=0,timer=null,times=0,time=500;
			setTimeout(function(){
				$(".blue_bg").animate({left:0+"%",top:0+"%",height:100+"%",width:100+"%"},1300,"easeInOutExpo",function(){
					func();
				});
			},2800);
			var func=function(){
				$(obj[i]).animate(attr[i],"slow","easeOutCirc",function(){
					if(times>=obj.length-1){
						$(".plus").addClass("transform");
						callBack();
						return;
					}
					times++;
				});
				if(i>=obj.length-1){
					clearTimeout(timer);
					return;
				}
				i++;
				timer=setTimeout(func,time);
			}
		
			var getdata=function(){
				var f=function(){
					var w=$(".doMove").outerWidth(),h=$(".doMove").outerHeight();
					$(".logo_wrap").css({width:w,height:h,left:0,top:0});
				}
				f();
				$(window).resize(f);
			}
			getdata();
			
			var callBack=function(){
				setTimeout(function(){
					$(".doMove").animate({height:0},1000,"easeInOutExpo",function(){
						$(".doMove").remove();
						zzs.done2=true;
					});
				},1000);
			}
	}
	
	fn();
	
	var product_fn=function(){
		var obj=$(".product_wrap").find(".pro_next"),
		i=0,timer=null,times=0,time=400;
		var func=function(){
			obj.eq(i).animate({top:0+"%"},1000,"easeOutCirc");
			if(i>=obj.length-1){
				clearTimeout(timer);
				return;
			}
			i++;
			timer=setTimeout(func,time);
		}
		func();
	}
	product_fn();
	
	
	
	var selectFn=function(){
		var ewm=$(".erweima"),demo=$(".demo");
		demo.click(function(ev){
			var e=ev || window.event;
			e.stopPropagation();
			if(!$(this).hasClass("close")){
				ewm.stop(true,false).animate({ height:360,opacity:1},350);
				$(this).addClass("close");
			}else{
				ewm.stop(true,false).animate({ height:0,opacity:0},350);
				$(this).removeClass("close");
			}
		});
		
		$(document).click(function(){
			ewm.stop(true,false).animate({ height:0,opacity:0},350);
			demo.removeClass("close");
		});
		
	}
	selectFn();
	
	var change_active=function(){
		var div=$(".android_twlve").find(".f_l");
		div.mouseover(function(){
			div.removeClass("active")
			$(this).addClass("active");
		});
	}
	change_active();
	
	
	
})
	