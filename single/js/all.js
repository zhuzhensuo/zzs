$(function(){
	var addClass=function(){
		$(".color_model").each(function(i){
			$(this).addClass("color_"+(i+1));
		});
	}
	addClass();
	
	var fn=function(){
		 var w=$(".radius_div").outerWidth();
		 $(".radius_div").css({right:-w});
	}
	fn();
	$(window).resize(fn);
	
	var zzs={
		bind:function(obj,fn){
			return function(){
				return fn.apply(obj,arguments);
			}
		},
		done:false
	}
	
	function Animation(o){
		this.id=$(o.id);
		this.div=this.id.find(o.div);
		this.done=true;
		this.main=$(o.main);
		this.index=0;
		this.timer=null;
		this.first=$(o.first);
		this.aj=$(o.anjian);
		zzs.bind(this,this.init)();
	}
	Animation.prototype={
		init:function(){
			this.addEvent();
			this.arr=[{r:224,g:66,b:54},{r:179,g:33,b:44},{r:191,g:22,b:114},{r:36,g:162,b:220}];
			this.arr2={r:224,g:66,b:54};
			this.main.css("backgroundColor","rgb("+this.arr2["r"]+","+this.arr2["g"]+","+this.arr2["b"]+")");
			this.getWidth();
			this.first_div();
		},
		getWidth:function(){
			var _this=this;
			var fn=function(){
				_this.width=$(window).width();
				_this.id.css("width",_this.width);
				if(_this.done){
					_this.moveto();
				}else{
					_this.move();
				}
			}
			fn();
			$(window).resize(fn);
		},
		addEvent:function(){
			var _this=this;
			this.div.click(function(){
				_this.done=false;
				var before=_this.div.index(this);
				_this.index=before;
				_this.calcColor(before);
				_this.getWidth();
				
			});
			this.div.hover(function(){
				var index=_this.div.index(this);
				if(index==_this.index || _this.done) return;
				_this.div.eq(index).children("div").stop(true,false).animate({width:230});
				
				
			},function(){
				_this.div.children("div").stop(true,false).animate({width:70});
			});
			
			$(".fixed_top").click(function(){
				_this.done=true;
				_this.getWidth();
			});
			
			
			this.aj.hover(function(){
				var aj=$(this).children("div");
				aj.stop().animate({height:220});
			},function(){
				var aj=$(this).children("div");
				aj.stop().animate({height:167});
			});
			
			this.aj.click(function(){
				_this.done=false;
				var before=_this.aj.index(this);
				_this.index=before;
				_this.calcColor(before);
				_this.getWidth();
			});
			
			
			$(".fixed_footer").click(function(){
				
				_this.calcColor(3);
				_this.index=3;
				_this.move();
			});
			
		},
		moveto:function(){
			this.id.stop().animate({left:0},"slow",function(){
				this.done=true;
				$(this).removeClass("getfixed");
			});
		}
		,
		move:function(){
			var _this=this;
			$(".main_part").hide().eq(this.index).show();
			//alert(this.width);
			this.id.stop(true,false).animate({left:-this.width+70},"slow",function(){
				_this.done=false;
				_this.id.addClass("getfixed");
			});
		},
		calcColor:function(b){
			var _this=this,done=true;
				clearInterval(this.timer);
				this.timer=setInterval(function(){
					done=true;
					for(var index in _this.arr[b]){
						var tar=_this.arr[b][index];
						var now=_this.arr2[index];
						var s=(tar-now)/6;
						s = s>0 ? Math.ceil(s) : Math.floor(s);
						if(tar!=now){
							done=false;
							now = s+now;
							_this.arr2[index]=now;
							_this.main.css("backgroundColor","rgb("+_this.arr2["r"]+","+_this.arr2["g"]+","+_this.arr2["b"]+")");		
						}
						
					}
					if(done){
						clearInterval(_this.timer);
					}
					
				},30);
				
		},
		first_div:function(){
			var next=this.first.find(".ewm_div");
			var _this=this;
			var fn=function(){
				if(!_this.done){
					next.addClass("active_style");
				}else{
					next.removeClass("active_style");
				}
			}
			fn();
			this.first.hover(function(){
				var w=$(window).outerWidth();
				fn();
				next.stop().animate({width:w,opacity:1},"slow");
			},function(){
				fn();
				next.stop().animate({width:0,opacity:0},"slow");
			});
			
		}
	}
	
	new Animation({
		id:"#home_page",
		div:".color_model2",
		main:".main",
		first:".ewm_first",
		anjian:".aj_model"
	});

		
	function slowMove(id,time){
		this.id=$(id);
		this.time=time || 20;
		this.init.apply(this,arguments);
	}
	slowMove.prototype={
		init:function(){
			this.move();
		},
		move:function(){
			var _this=this;
			var fn=function(){
				var li=_this.id.find("li:first"),h=li.outerHeight(),tmp=0;
				fn.timer=setInterval(function(){
					if(tmp>=h){
						_this.id.append(li);
						_this.id.css("top",0);
						clearInterval(fn.timer);
						fn();
						return;
					}
					tmp++;
					_this.id.css("top",-tmp);
				},_this.time);
			}
			fn();
		}
	}

	new slowMove("#those_ul");

	var hopeYouAreLucky=function(){
		var done=true;
		var doMove=function(deg){
			$('#rotate_img').stopRotate();
			$("#rotate_img").rotate({
				angle:0, 
				duration: 5000, 
				animateTo:deg, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
				callback:function(){
				}
			}); 
		}
		
		$(".start_div").click(function(){
			//if(!done) return;
			done=false;
			doMove(1027);
		});
		
	}
	hopeYouAreLucky();
	
	var toggleClass=function(){
		if(zzs.done){return;}
		
		var len=$(".time_model").length;
		var func=function(){
			var fn=arguments.callee;
			for(var i=0;i<len;i++){
				$(".time_wraper"+(i+1)).toggleClass("time_wraper"+(i+1)+"_active");
			}
			toggleClass.timer=setTimeout(fn,500);
		}
		func();
		
	}
	toggleClass();
	
	var endTime=function(){
		var s1=$("#second").find("h2 img"),s2=$("#second").find("h1 img"),done=false;
		var m1=$("#min").find("h2 img"),m2=$("#min").find("h1 img");
		var h1=$("#hour").find("h2 img"),h2=$("#hour").find("h1 img");
		endTime.timer=setInterval(function(){
			if(done) return;
		  $(".endtime").each(function(){
			var obj = $(this);
			var endTime = new Date(2014,10,10,11,11);
			var nowTime = new Date();
			var nMS=endTime.getTime() - nowTime.getTime();
			var myD=Math.floor(nMS/(1000 * 60 * 60 * 24));
			var myH_show=Math.floor(nMS/(1000*60*60) % 24);
			var myH=Math.floor(nMS/(1000*60*60));
			
			var myM=Math.floor(nMS/(1000*60)) % 60;
			var myS=Math.floor(nMS/1000) % 60;
		
			var myMS=Math.floor(nMS/100) % 10;
			
			var h=myH_show,m=myM,s=myS;
			
			
			
			if(myD < 10)
			{
				myD = '0'+myD;
			}
			if(myH < 10)
			{
				myH = '0'+myH;
				var a=myH.toString().split("");
				var f=9-parseInt(a[0]);
				var l=9-parseInt(a[1]);
				h1.stop().animate({top:-l*48});
				h2.stop().animate({top:-f*48});
			}else{
				var a=myH.toString().split("");
				var f=9-parseInt(a[0]);
				var l=9-parseInt(a[1]);
				
				h1.stop().animate({top:-l*48});
				h2.stop().animate({top:-f*48});
			}
			
			if(myM < 10)
			{
				myM = '0'+myM;
				var a=myM.toString().split("");
				var f=9-parseInt(a[0]);
				var l=9-parseInt(a[1]);
				m1.stop().animate({top:-l*48});
				m2.stop().animate({top:-f*48});
			}else{
				var a=myM.toString().split("");
				var f=9-parseInt(a[0]);
				var l=9-parseInt(a[1]);
				
				m1.stop().animate({top:-l*48});
				m2.stop().animate({top:-f*48});
			}
			
			if(myS < 10)
			{
				myS = '0'+myS;
				var a=myS.toString().split("");
				var f=9-parseInt(a[0]);
				var l=9-parseInt(a[1]);
				s1.stop().animate({top:-l*48});
				s2.stop().animate({top:-f*48});
				
			}else{
				var a=myS.toString().split("");
				var f=9-parseInt(a[0]);
				var l=9-parseInt(a[1]);
				
				s1.stop().animate({top:-l*48});
				s2.stop().animate({top:-f*48});
			}
			var a = parseInt(h+m+s);
			if(a<=0){
				done=true;
				clearInterval(endTime.timer);
			}
		  });
		},1000);
		
	}
	
	endTime();
	
	function Wave(o){
		this.id=$(o.id);
		this.index=0;
		this.li=this.id.find(o.li);
		this.wrap=this.id.find(o.wrap);
		this.init.apply(this,arguments);
	}
	Wave.prototype={
		init:function(){
			this.arr=[];
			this.auto();
			//this.addEvent();
		},
		addEvent:function(){
			var _this=this;
			this.id.hover(function(){
				clearInterval(_this.timer);
			},function(){
				_this.auto();
			});
		},
		createRandom:function(max,min){
			return Math.floor(Math.random()*(max-min)+min);
		},
		createDiv:function(){
			var num=this.createRandom(40,30),w=this.id.outerWidth(),perwidth=Math.ceil((w/num).toFixed(9)),_this=this,img=this.id.find("img"),tmp=0,pos=[];
			var src=img.eq(this.index).attr("src");
			
			for(var i=0;i<num;i++){
				var div=$("<div class='wave'></div>");
				//pos[i]=perwidth*i;
				div.css({width:perwidth});
				
				this.wrap.append(div);
			}
			var wave=this.id.find(".wave");
			wave.each(function(i){
				_this.arr[i]=$(this).position().left;
				$(this).html("<img src="+src+" />");
				$(this).find("img").css("left",-_this.arr[i]);
			});
			
			var fn=function(){
				var id=0;
				var func=function(){
					wave.eq(id).stop(true,false).animate({opacity:1},"slow",function(){
						if(tmp>=num-1){
							_this.callBack(wave);
						}
						tmp++;
					});
					if(id>=num-1){
						clearTimeout(fn.timer);
						return;
					}
					id++;
					fn.timer=setTimeout(func,70);
				}
				func();
				
			}
			fn();
		},
		callBack:function(o){
			this.li.hide().eq(this.index).show();
			o.remove();
		},
		auto:function(){
			var _this=this;
			this.timer=setInterval(function(){
				_this.index++;
				if(_this.index>=_this.li.length){
					_this.index=0;
				}
				_this.createDiv();
			},5000);
		}
		
	}
	
	new Wave({
		id:"#banner1",
		li:"li",
		wrap:".wave_wrap"
	});
	/*
	for(var i=0;i<$(".banner").length;i++){
		new Wave({
			id:"#banner"+(i+1),
			li:"li",
			wrap:".wave_wrap"
		});
	}
	*/
	var calcDate=function(){
		
		var time=[{
			m:11,
			d:10,
			h:13,
			f:11
		},{
			m:11,
			d:11,
			h:0,
			f:0
		},{
			m:11,
			d:11,
			h:11,
			f:11
		},{
			m:11,
			d:11,
			h:13,
			f:11
		}];
		var fn=function(){
			var times=new Date();
			var o={
				m:times.getMonth()+1,
				d:times.getDate(),
				h:times.getHours(),
				f:times.getMinutes()
			}
			
			if(o.m>=time[time.length-1]["m"] && o.d>=time[time.length-1]["d"] && o.h>=time[time.length-1]["h"] && o.f>=time[time.length-1]["f"]){
				$(".time_model").hide().eq(time.length-1).show().children("div").addClass("time_wraper4_active");
				zzs.done=true;
				clearTimeout(toggleClass.timer);
				return;
			}
			
			$.each(time,function(k,v){
				for(var index in o){
					var val=v[index];
					var val2=o[index];
				}
				if(val==val2){
					if(k==time.length-1){
						$(".time_model").hide().eq(k).show().children("div").addClass("time_wraper4_active");
						return;
					}
					$(".time_model").hide().eq(k+1).show();
				}
			});
			setTimeout(fn,4000);
			
		}
		fn();
		
		
	}
	calcDate();
	
	
	
	
	
	
	
	
	
	
	
});