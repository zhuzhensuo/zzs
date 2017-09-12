$(function(){
	(function(){
		var arr=[{width:212,height:140,top:250,left:0},{width:338,height:213,top:176,left:40},{width:838,height:388,top:0,left:170},{width:338,height:213,top:176,left:800},{width:212,height:140,top:250,left:952}];
		
		var model=$("#moban_scroll_wrap").find("div"),left=$(".right_btn"),right=$(".left_btn");
		model.each(function(i){
			if(i<arr.length-1){
				$(this).css(arr[i]);
			}else{
				$(this).css(arr[arr.length-1]);
			}
		});
		
		var changeZindex=function(i){
			var arr2=[1,3,5,3,i];
			for(var i=0;i<model.length;i++){
				if(i<arr2.length){
					model.eq(i).css("zIndex",arr2[i]);
				}
			}
		}
		changeZindex(1);
		var doMove=function(){
			model.each(function(i){
				if(i<arr.length-1){
					$(this).stop(true,false).animate(arr[i]);
				}else{
					$(this).stop(true,false).animate(arr[arr.length-1]);
				}
			});
		}
		
		var doMove2=function(){
			
			var first=$("#moban_scroll_wrap").find("div:first");
			var last=$("#moban_scroll_wrap").find("div:last");
			last.insertBefore(first);
			model=$("#moban_scroll_wrap").find("div");
			changeZindex(1);
			doMove();
			
			
			
		}
		left.click(function(){
			var first=$("#moban_scroll_wrap").find("div:first");
			$("#moban_scroll_wrap").append(first);
			model=$("#moban_scroll_wrap").find("div");
			changeZindex(0);	
			doMove();	
				
			
			
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
	
	
	var btns=function(){
		$(".demo_btn").each(function(){
			var span=$(this).find("span");
			var i=$(this).find("i");
			$(this).hover(function(){
				span.stop(true,false).animate({paddingLeft:30},"fast",function(){
					i.stop(true,false).animate({opacity:1},"fast");
				});
			},function(){
				i.stop(true,false).animate({opacity:0},"fast");
				span.stop(true,false).animate({paddingLeft:0},"fast");
			});
		});
	}
	btns();
	
	
	function Scroll(id,className){
		this.id=$("#"+id);
		this.className=this.id.find("."+className);
		this.li=this.className.find("li");
		this.index=0;
		this.timer=null;
		this.lbtn=this.id.find(".left_btn2");
		this.rbtn=this.id.find(".right_btn2");
		this.init.apply(this,arguments);
		
	}
	Scroll.prototype={
		init:function(){
			this.resize();
			this.auto();
			this.btn_click();
		},
		resize:function(){
			var w=parseInt(this.className.css("width"));
			this.li.css({"width":w});
			this.ul=this.className.find("ul");
			var total=this.li.length*w;
			this.ul.css({"width":total});
			var me=this;
		},
		
		run:function(){
			var me=this;
			this.ul.stop(true,false).animate({left:-(this.index*this.className.width())},"slow");
		},
		auto:function(){
			var me=this;
			this.timer=setInterval(function(){
				me.index++;
				if(me.index>=me.li.length){
					me.index=0;
				}
				me.run();
			},3500);
		},
		btn_click:function(){
			var me=this;
			this.lbtn.click(function(){
				me.index--;
				if(me.index<0){
					me.index=me.li.length-1;
				}
				me.run();
			});
			
			this.rbtn.click(function(){
				me.index++;
				if(me.index>=me.li.length){
					me.index=0;
				}
				me.run();
			});
			this.id.hover(function(){
				clearInterval(me.timer);
			},function(){
				me.auto();
			});
			
			
			
		}
	}
	new Scroll("moban_two_scroll","moban-two-wraps");

	(function(){
		var arr=[{width:408,height:301,top:70,left:0},{width:499,height:370,top:0,left:162},{width:408,height:301,top:70,left:400},{width:408,height:301,top:70,left:162}];
		
		var model=$("#moban_five_scroll").find("div"),left=$(".right_btn"),right=$(".left_btn");
		model.each(function(i){
			if(i<arr.length-1){
				$(this).css(arr[i]);
			}else{
				$(this).css(arr[arr.length-1]);
			}
		});
		
		var changeZindex=function(i){
			var arr2=[1,2,i,-1];
			for(var i=0;i<model.length;i++){
				if(i<arr2.length){
					model.eq(i).css("zIndex",arr2[i]);
				}
			}
		}
		changeZindex(1);
		var doMove=function(){
			model.each(function(i){
				if(i<arr.length-1){
					$(this).stop(true,false).animate(arr[i]);
				}else{
					$(this).stop(true,false).animate(arr[arr.length-1]);
				}
			});
		}
		
		var doMove2=function(){
			
			var first=$("#moban_five_scroll").find("div:first");
			var last=$("#moban_five_scroll").find("div:last");
			last.insertBefore(first);
			model=$("#moban_five_scroll").find("div");
			doMove();
			changeZindex(1);
			
			
			
		}
		left.click(function(){
			var first=$("#moban_five_scroll").find("div:first");
			$("#moban_five_scroll").append(first);
			model=$("#moban_five_scroll").find("div");
			doMove();	
			changeZindex();	
				
			
			
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
	
	function GetFixed(id,className,a){
		this.id=$("#"+id);
		this.a=$("."+a);
		this.div=$("."+className);
		this.init.apply(this,arguments);
	}
	GetFixed.prototype={
		init:function(){
			this.addEvent();
			this.resize();
		},
		addEvent:function(){
			var t=this.a.offset().top,that=this;
			
			var fn=function(){
				var top=$(document).scrollTop();
				if(top>=t){
					that.id.css({left:that.div.offset().left,position:"fixed",width:100+"%",top:0}).addClass("actives");
				}else{
					that.id.css({left:0,position:"absolute"}).removeClass("actives");
				}
			}
			fn();
			$(window).scroll(function(){
				fn();	
			});
		},
		resize:function(){
			var that=this;
			$(window).resize(function(){
				that.addEvent();
			});
		}
	}
	new GetFixed("fix_nav","fix_nav","fix_nav");
	
	var fns=function(){
		var arr=[];
		$(".need_scroll").each(function(){
			var top=$(this).offset().top-150;
			arr.push(top);
		});
		
		$(window).scroll(function(){
			var t=$(document).scrollTop();
			$.each(arr,function(k,v){
				if(t>=v){
					done(k);
				}
			});
		});
		
		function done(i){
			if(i==0){
				one();
			}else if(i==1){
				two();
			}
		}
		
		function one(){
			var i=0,div=$(".moban_three_scroll").find("div"),timer=null;
			timer=setInterval(function(){
				div.eq(i).animate({bottom:0,opacity:1});
				if(i>=div.length-1){
					clearInterval(timer);
					return;
				}
				i++;
			},500);
			
		}
		
		function two(){
			var img=$(".moban_four_wraps").find("img");
			img.animate({bottom:0,opacity:1});
		}
		
	}
	fns();
	
	var bg_move=function(){
		var doMove=function(t,obj,o,tar,callBack){
			var arr=[];
			$.each(o,function(k,v){
				var start=v["min"],end=v["max"];
				var times=v["max"]/(v["max"]-v["min"]);
				var a=(tar[k]["e"]-tar[k]["s"])/(v["max"]/times)*(t-v["min"])+tar[k]["s"];
				arr[k]=a;
				callBack({
					obj:obj,
					s:start,
					e:end,
					t:t,
					now:arr,
					tar:tar
				});
			});
			
		}
		try{
			var start=$(".moban_six_wrap").offset().top;
		}catch(e){return;}
		
		$(window).scroll(function(){
			var top=$(document).scrollTop();
			doMove(top,".moban_six_wrap img",[{min:start-698,max:start}],[{s:-582,e:0}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).css(arr[k],v);
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).css(arr[k],v);
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						$(o.obj).css(arr[k],v);
						//$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
			});
		});
		
		
		
	}
	bg_move();
	
	function Scrolls(id,className){
			this.id=$("#"+id);
			this.className=this.id.find("."+className);
			this.li=this.className.find("li");
			this.index=0;
			this.timer=null;
			this.lbtn=this.id.find(".ld_left");
			this.rbtn=this.id.find(".ld_right");
			this.init.apply(this,arguments);
			
		}
		Scrolls.prototype={
			init:function(){
				this.resize();
				this.createBtn();
				this.auto();
				this.btn_click();
			},
			resize:function(){
				var w=parseInt(this.li.outerWidth());
				this.li.css({"width":w});
				this.ul=this.className.find("ul");
				var total=this.li.length*w;
				this.ul.css({"width":total});
				var me=this;
				
			},
			createBtn:function(){
				this.event();
			},
			event:function(){
				this.btn=this.id.find(".ld_tit li");
				var me=this;
				this.btn.click(function(){
					me.index=me.btn.index(this);
					me.run();
				});
			},
			run:function(){
				var me=this;
				this.ul.stop(true,false).animate({left:-(this.index*this.li.outerWidth())},"slow");
				this.btn.find("dl").removeClass("active").end().eq(this.index).find("dl").addClass("active");
			},
			auto:function(){
				var me=this;
				this.timer=setInterval(function(){
					me.index++;
					if(me.index>=me.li.length){
						me.index=0;
					}
					me.run();
				},3500);
			},
			btn_click:function(){
				var me=this;
				this.id.hover(function(){
					clearInterval(me.timer);
				},function(){
					me.auto();
				});
				
				this.lbtn.click(function(){
					me.index--;
					if(me.index<0){
						me.index=me.li.length-1;
					}
					me.run();
				});
				
				this.rbtn.click(function(){
					me.index++;
					if(me.index>=me.li.length){
						me.index=0;
					}
					me.run();
				});
				
			}
		}
		new Scrolls("ld_banner","ld_banner2");
	
		function Slide(id,li,tips){
			this.id=$("#"+id);
			this.li=this.id.find(li);
			this.tips=this.id.find("."+tips);
			this.index=0;
			this.init.apply(this,arguments);
		}
		
		Slide.prototype={
			init:function(){
				this.addEvent();
				this.run();
			},
			run:function(){
				this.tips.css({width:this.li.eq(1).outerWidth(),left:this.li.eq(1).position().left});
			},
			addEvent:function(){
				var _this=this;
				this.li.hover(function(){
					_this.index=_this.li.index(this);
					var left=$(this).position().left,w=$(this).outerWidth();
					_this.tips.stop().animate({left:left,width:w});
				},function(){
					_this.tips.stop().animate({left:_this.li.eq(1).position().left,width:_this.li.eq(1).outerWidth()});
				});
			}
		}
		new Slide("nav","li","tips");
	
		var moveNav=function(o){
		var f=$("."+o.f),a=f.find(o.a);
		f.css({position:"relative"});
		var moveDiv=function(w,l,a){
			var div=$("<div class='move_div'></div>");
			f.append(div);
			div.css({position:"absolute",left:l,width:w});
			addEvent(w,l,a,div);
		}
		
		var addEvent=function(w,l,a,div){
			a.each(function(){
				$(this).hover(function(){
					a.addClass("actives");
					var w2=$(this).outerWidth();
					var l2=$(this).position().left;
					div.stop(true,false).animate({left:l2,width:w2});
				},function(){
					a.removeClass("actives");
					div.stop(true,false).animate({left:l,width:w});
				});
			});
		}
		
		a.each(function(i){
			if($(this).hasClass("on")){
				var w=$(this).outerWidth();
				var l=$(this).position().left;
				moveDiv(w,l,a);
			}
		});
	}
	moveNav({
		f:"nav_center",
		a:"li"
	});
	
	var createDiv=function(){
		$(".demo_btn,.demos").click(function(){
			$(".fixed_div").show();
		});
		$("img.img").click(function(){
			$(".fixed_div").hide();
		});
	}
	createDiv();
	
	
	
	
	
	
	
	
});