window.onload=function(){
	var more=function(){
		var div=$(".more").find("div"),i=-1;
		setInterval(function(){
			div.eq(i).show();
			i++;
			if(i>=div.length){
				div.hide();
				i=-1;
			}
		},500);
		
	}
	more();
	
	var setting=function(){
		var resizes=function(){
			var w=$(".main").outerWidth();
			$(".main").css("height",w);
		}
		resizes();
		$(window).resize(resizes);
		
	}
	setting();
	var fades=function(){
		var div=$(".divs"),timer=null,i=0;
		timer=setInterval(function(){
			div.eq(i).fadeIn("slow");
			i++;
			if(i>=div.length){clearInterval(timer)}
		},800);
		
	}
	fades();
	
	var radio=function(){
		$(".steps5").find("dd").each(function(){
			$(this).click(function(){
				$(this).addClass("on").siblings("dd").removeClass("on");
				if($(this).hasClass("on")){
					$(this).find("input").attr("checked",true).end().siblings("dd").find("input").attr("checked",false);
				}
			});
		});
	}
	radio();
	
	var tanchuang=function(){
		var div=$(".steps6").find("div.box");
		var li=div.find("li");
		var input=$(".steps6").find("div.div input");
		$(".steps6").find("div.div").click(function(e){
			e.stopPropagation();
			div.show();
		});
		$("html,body").click(function(){
			div.hide();
		});
		li.click(function(){
			var txt=$(this).text();
			input.val(txt);
			div.hide();
			li.removeClass("active");
			$(this).addClass("active");
		});
		
		
	}
	tanchuang();
	
	function zhuangbi(){
		var arr=[],step=$(".steps"),scan=$(".scans"),timer=null,i=0;
		step.each(function(i){
			arr[i]=$(this).position().top;
		});
		try{
			var top=scan.position().top;
		}
		catch(e){return;}
		timer=setInterval(function(){
			var top=scan.position().top;
			top+=2;
			$.each(arr,function(k,v){
				if(top>=v){
					step.eq(k).animate({opacity:1});
				}
				if(top>=arr[arr.length-1]+50){
					clearInterval(timer);
					
					getFixed(top,arr[arr.length-1]+50);
				}
				
			});
			scan.css("top",top)
		},20);
		
		var getFixed=function(cur,max){
			var timers=null,done=false,h=0;
			var s=function(){
				h=$(".steps7").find("dd").outerHeight();
			}
			s();
			$(window).resize(s);
			
			timers=setInterval(function(){
				if(cur>=max+h/1.5){
					done=true;
				}else if(cur<=max){
					done=false;
				}
				
				cur = done==false ?  cur +=1 : cur-=1;
				scan.css("top",cur)
			},20);
		}
	}
	zhuangbi();
	var fenxi=function(){
		$(".progress2").animate({width:100+"%"},5000,function(){
			location.href="jinian.html";
		});
		
	}
	fenxi();
	
	var toup=function(){
		var ban=function(){
			window.ontouchmove=function(evt){
				var e =evt||event;
				e.preventDefault ? e.preventDefault() : e.returnValue=false;
			};
		}
		var can=function(){
			window.ontouchmove=function(evt){
				var e =evt||event;
				e.returnValue=true;
				return true;
			};
		}
		ban();
		var bool=$(".wrap").hasClass("qubie");
		var node=$(".jn_ul").find("li.liucheng");
		var h=node.outerHeight();
		var maxh=$(".jinians2").outerHeight();
		node.css({height:0,overflow:"hidden"});
		$(".jinians2").css("height",maxh);
		node.animate({height:h},bool ? 30000 : 20000,"jswing");
		var h1=$(".jinians3").outerHeight();
		var cha=maxh-h1;
		$(".jinians3").animate({scrollTop:cha},bool ? 30000 : 20000,"jswing");
		var t=h1-$(".jn_scan").outerHeight();
		
		$(".jn_scan").css("bottom",t).animate({bottom:0},bool ? 30000 : 20000,"jswing",function(){
			$(this).addClass("jn_scan2");
			can();
		});
		
	}
	toup();
	 
	
	
	
	var daojishi=function(time){
		var date=new Date();
		var num=[31,28,31,30,31,30,31,31,30,31,30,31]
		var node=$(".time");
		var timer=setInterval(function(){
			var m=date.getMonth();
			var d=date.getDate();
			var days=num[m]-d+time;
			node.text(days);
		},1000);
	}
	daojishi(16);
	
	var bofang=function(){
		function plays(){
			var music=document.getElementById("music");
			if(music.paused){
				music.play();
			}
		}
		plays();
		var btn=document.getElementById("links");
		$("body,html").bind("load click mousemove touchmove touch touchstart touchend tap swipeUp",function(){
			plays();
		});
	}
	bofang();
}








