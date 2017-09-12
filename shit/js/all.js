

var Loadings=function(o){
	this.id=$(o.id);
	this.wrap=this.id.find(o.wrap);
	this.div=this.wrap.find("div");
	this.init.apply(this,arguments);
}
Loadings.prototype={
	init:function(){
		this.run();
	},
	run:function(){
		var i=0,timer=null,_this=this;
		var fn=function(){
			_this.div.eq(i).show();
			i++;
			if(i>_this.div.length){
				_this.div.fadeOut();
				i=0;
			}
			timer=setTimeout(arguments.callee,500);
		}
		fn();
	}
}
new Loadings({
	id:"#more",
	wrap:".load_wrap"
});

new Loadings({
	id:"#more2",
	wrap:".load_wrap"
});

new Loadings({
	id:"#more3",
	wrap:".load_wrap"
});

new Loadings({
	id:"#more4",
	wrap:".load_wrap"
});

new Loadings({
	id:"#more5",
	wrap:".load_wrap"
});





var scrolling=function(){
	var move=function(){
		var obj=[".gaizi",".pc",".service",".wx",".ecjia",".business",".bottom"];
		var para=[{
			top:-250
		},{
			top:-230
		},{
			top:-178
		},{
			top:-135
		},{
			top:-90
		},{
			top:-48
		},{
			top:25
		}];
		//var para=[-210,-170,-120,-80,-47,-25];
		$(".shangchuang").animate({right:735},1500,"easeInOutExpo",function(){
			$(".li").hide();
			$(".heng").show();
			$.each(para,function(k,v){
				$(obj[k]).animate(para[k],1000,"easeInOutExpo",function(){
					$(".gs_info").animate({right:0,opacity:1},1000,"easeInOutExpo");
				});
			});
		});
	}
	
	
	var clientHeight=$(".reason_wrap").outerHeight();
	
	$(window).scroll(function(){
		var top=$(document).scrollTop();
		$("#fixed").text(top);
		if(top>=700){
			move();
		}
		/****section2 文字移动*****/
		/*
		doMove(top,".gs_info",[{
				min:0,
				max:790
			},{
				min:0,
				max:790
			}],[{
				s:-600,
				e:0
			},{
				s:0,
				e:1
			}],function(o){
				var arr=["right","opacity"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});	
		*/
		/*****************/
		if(top>=1684){
			$(".house_1,.house_2,.house_3").addClass("active");
		}
		/****section3 挖掘机移动****/
		doMove(top,".wjj",[{
				min:1684,
				max:1955
			},{
				min:1684,
				max:1955
			}],[{
				s:-245,
				e:75
			},{
				s:0,
				e:1
			}],function(o){
				var arr=["right","opacity"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});	
		
		/*********section4 轮播图部分**********/
		
		doMove(top,".scrollbar",[{
				min:3000,
				max:3500
			},{
				min:3000,
				max:3500
			}],[{
				s:0,
				e:1
			},{
				s:-168,
				e:0
			}],function(o){
				var arr=["opacity","bottom"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		doMove(top,".pic_wrap",[{
				min:4100,
				max:4700
			}],[{
				s:0,
				e:-100
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		/****第6屏****/
		
		doMove(top,".rpart",[{
				min:5340,
				max:5700
			}],[{
				s:0,
				e:520
			}],function(o){
				var arr=["height"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		
		/****第7屏****/
		
		doMove(top,".lp",[{
				min:5700,
				max:6200
			}],[{
				s:0,
				e:445
			}],function(o){
				var arr=["height"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		/****第9屏****/
		doMove(top,".scrollbar2",[{
				min:7650,
				max:8150
			},{
				min:7650,
				max:8150
			}],[{
				s:0,
				e:1
			},{
				s:-168,
				e:0
			}],function(o){
				var arr=["opacity","bottom"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		doMove(top,".pic_wrap2",[{
				min:8850,
				max:9350
			}],[{
				s:0,
				e:-100
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		/****第10屏****/
		doMove(top,".section_10",[{
				min:8850,
				max:9350
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		/****第11屏****/
		doMove(top,".model_1",[{
				min:9850,
				max:10350
			}],[{
				s:50,
				e:-50
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		/****第12屏****/
		doMove(top,".apples",[{
				min:10350,
				max:10850
			},{
				min:10350,
				max:10850
			}],[{
				s:250,
				e:0
			},{
				s:38,
				e:7
			}],function(o){
				var arr=["top","left"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		doMove(top,".ipads",[{
				min:10350,
				max:10850
			}],[{
				s:250,
				e:17
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		doMove(top,".androids",[{
				min:10350,
				max:10850
			},{
				min:10350,
				max:10850
			}],[{
				s:250,
				e:0
			},{
				s:38,
				e:70
			}],function(o){
				var arr=["top","left"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		doMove(top,".info_wrap2",[{
				min:10350,
				max:10850
			},{
				min:10350,
				max:10850
			}],[{
				s:800,
				e:0
			},{
				s:0,
				e:1
			}],function(o){
				var arr=["left","opacity"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		doMove(top,".model_2",[{
				min:11350,
				max:12350
			}],[{
				s:40,
				e:-100
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		doMove(top,".info_wrap",[{
				min:11350,
				max:11850
			}],[{
				s:1,
				e:0
			}],function(o){
				var arr=["opacity"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});	
		
		
		doMove(top,".model_3",[{
				min:12050,
				max:12550
			}],[{
				s:0,
				e:1
			}],function(o){
				var arr=["opacity"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		
		doMove(top,".model_3_wrap",[{
				min:15850,
				max:16350
			}],[{
				s:0,
				e:250
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".abg",[{
				min:15850,
				max:17850
			}],[{
				s:42,
				e:-100
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".abg2",[{
				min:15850,
				max:16850
			}],[{
				s:150,
				e:32
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		
		doMove(top,".model_4",[{
				min:16850,
				max:17850
			}],[{
				s:0,
				e:800
			}],function(o){
				var arr=["width"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".model4_wrap",[{
				min:18500,
				max:19500
			},{
				min:18500,
				max:19500
			}],[{
				s:0,
				e:800
			},{
				s:1,
				e:0
			}],function(o){
				var arr=["left","opacity"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".abg2_wrap",[{
				min:18500,
				max:19500
			}],[{
				s:0,
				e:-200
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		
		doMove(top,".menus",[{
				min:20000,
				max:21000
			},{
				min:20000,
				max:21000
			}],[{
				s:256,
				e:0
			},{
				s:1000,
				e:0
			}],function(o){
				var arr=["left","top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		doMove(top,".founds",[{
				min:20000,
				max:21000
			},{
				min:20000,
				max:21000
			}],[{
				s:368,
				e:395
			},{
				s:1000,
				e:0
			}],function(o){
				var arr=["left","top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".cancels",[{
				min:20000,
				max:21000
			},{
				min:20000,
				max:21000
			}],[{
				s:368,
				e:566
			},{
				s:1000,
				e:0
			}],function(o){
				var arr=["left","top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".moneys",[{
				min:20000,
				max:21000
			},{
				min:20000,
				max:21000
			}],[{
				s:368,
				e:736
			},{
				s:1000,
				e:0
			}],function(o){
				var arr=["left","top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".model5_again",[{
				min:20000,
				max:21000
			},{
				min:20000,
				max:21000
			}],[{
				s:400,
				e:60
			},{
				s:0,
				e:1
			}],function(o){
				var arr=["left","opacity"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".model5_wrap",[{
				min:26000,
				max:27000
			}],[{
				s:0,
				e:-200
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		
		doMove(top,".model_6",[{
				min:26000,
				max:27000
			}],[{
				s:150,
				e:50
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		
		/****section11****/
		doMove(top,".section_11",[{
				min:32800,
				max:33800
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".left_bg",[{
				min:34500,
				max:35500
			}],[{
				s:0,
				e:-443
			}],function(o){
				var arr=["left"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".right_bg",[{
				min:34500,
				max:35500
			}],[{
				s:0,
				e:-443
			}],function(o){
				var arr=["right"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		
		doMove(top,".weixin1",[{
				min:36500,
				max:37500
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$(".d1").addClass("active1");
					$(".d2").addClass("active2");
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$(".d1").removeClass("active1");
					$(".d2").removeClass("active2");
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".weixin2",[{
				min:38000,
				max:39000
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
						$(o.obj).find(".hands").addClass("active");
					});
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
						$(o.obj).find(".hands").removeClass("active");
					});
				}
		});
		
		doMove(top,".weixin3",[{
				min:39500,
				max:40500
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"],obj=[".r_hand",".shops"],i=0;
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					var fn=function(){
						$(obj[i]).show();
						if(i>=obj.length){return;}
						i++;
						
						fn.timer=setTimeout(fn,1000);
						
					}
					setTimeout(fn,1000);
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".weixin4",[{
				min:41000,
				max:42000
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".weixin5",[{
				min:42500,
				max:43500
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".weixin6",[{
				min:44000,
				max:45000
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".weixin7",[{
				min:45500,
				max:46500
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$(".ipad_in").fadeIn("slow");
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$(".ipad_in").fadeOut("slow");
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".weixin8",[{
				min:47000,
				max:48000
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".weixin9",[{
				min:48500,
				max:49500
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$(".wx9_gif2").addClass("wx9_active");
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$(".wx9_gif2").removeClass("wx9_active");
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".weixin10",[{
				min:50000,
				max:50500
			}],[{
				s:100,
				e:0
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					setTimeout(function(){
						$(".wx11_gif").addClass("wx11_gif2");
					},1000);
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$(".wx11_gif").removeClass("wx11_gif2")
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		
		doMove(top,".why_us",[{
				min:51000,
				max:52000
			}],[{
				s:100,
				e:-20
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"]+"%";
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}else{
					var wrap={};
					
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v+"%";
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"fast");
					});
				}
		});
		
		doMove(top,".reason_wrap",[{
				min:52500,
				max:55000
			}],[{
				s:0,
				e:-(clientHeight-600)
			}],function(o){
				var arr=["top"];
				if(o.t>=o.e){
					var wrap={};
					$(".shadow_bg").show();
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$(".shadow_bg").hide();
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".shadow_bg",[{
				min:55500,
				max:56500
			}],[{
				s:0,
				e:0.7
			}],function(o){
				var arr=["opacity"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		doMove(top,".about_us",[{
				min:55500,
				max:56500
			}],[{
				s:-500,
				e:0
			}],function(o){
				var arr=["bottom"];
				if(o.t>=o.e){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["e"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
					
				}else if(o.t<=o.s){
					var wrap={};
					$.each(arr,function(k,v){
						wrap[arr[k]]=o.tar[k]["s"];
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}else{
					var wrap={};
					$.each(o.now,function(k,v){
						wrap[arr[k]]=v;
						//$(o.obj).css(arr[k],v);
						$(o.obj).stop(true,false).animate(wrap,"slow");
					});
				}
		});
		
		/*****露出气泡****/
		var bubble=function(t){
			
			(function(){
				var arr=[4400,4500,4600,4700,4800,4900];
				var obj=$(".leftInfo").find("div:last"),div=$(".leftInfo").find("div"),i=0;
				$.each(arr,function(k,v){
					if(t>=v){
						div.eq(k).addClass("scale");
					}else{
						div.eq(k).removeClass("scale");
					}
				});
			})();
			(function(){
				var arr2=[12850,13350,13850,14350,14850,15350],plat=$(".mobiles");
				$.each(arr2,function(k,v){
					if(top>=v){
						plat.removeClass("active");
						if((k+1)%2==0){
							var k=Math.floor(k/2);
							plat.eq(k).removeClass("active");
						}else{
							var k=Math.floor(k/2);
							plat.eq(k).addClass("active");
						}
					}
					if(top<arr2[0]){
						plat.removeClass("active");
					}
				});
			})();
			
			(function(){
				var arr2=[21500,22000,22500,23000,23500,24000,24500,25000],plat=$(".t");
				$.each(arr2,function(k,v){
					if(top>=v){
						plat.removeClass("active");
						if((k+1)%2==0){
							var k=Math.floor(k/2);
							plat.eq(k).removeClass("active");
						}else{
							var k=Math.floor(k/2);
							plat.eq(k).addClass("active");
						}
					}
					if(top<arr2[0]){
						plat.removeClass("active");
					}
				});
			})();
			
			(function(){
				var arr=[27500,28000,28500,29000,29500,30000,30500,31000,31500];
				var div=$(".box").find("dl"),i=0;
				$.each(arr,function(k,v){
					if(t>=v){
						div.eq(k).addClass("scale");
					}else{
						div.eq(k).removeClass("scale");
					}
				});
			})();
			
			
			
			
			
		}
		bubble(top);
		
	});
	
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
	
}
scrolling();


var setAttr=function(){
	var obj=$(".pic_wrap,.pic_wrap2,.section_10,.section_11");
	var fn=function(){
		var w=$(window).outerWidth(),h=$(window).outerHeight();
		obj.css({width:w,height:h});
	}
	fn();
	$(window).resize(fn);
}
setAttr();

function GetFixed(id,className,a){
	this.id=$("#"+id);
	this.a=$("."+a);
	this.div=$("."+className);
	this.init.apply(this,arguments);
}
	GetFixed.prototype={
		init:function(){
			if (!this.a.length) {
				return;
			}
			this.addEvent();
			this.resize();
		},
		addEvent:function(){
			var t=this.a.offset().top,that=this;
			
			var fn=function(){
				var top=$(document).scrollTop();
				if(top>=t){
					that.id.css({left:that.div.offset().left,position:"fixed",width:100+"%"});
				}else{
					that.id.css({left:0,position:"absolute"});
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
	new GetFixed("pic_wrap","section_4","section_4");
	new GetFixed("pic_wrap2","section_9","section_9");
	new GetFixed("headers","header","header");
	var item_addClass=function(){
		$(".item,.item2").find("li").each(function(){
			$(this).addClass("transition");
		});
	}
	item_addClass();
function Scrolls(id,l,r,obj,auto){
	this.id=$("#"+id);
	this.ul=this.id.find("ul");
	this.li=this.ul.find("li");
	this.l=this.id.find("div."+l);
	this.r=this.id.find("div."+r);
	this.obj=$(obj);
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
		var _this=this,i=0,done=true,mini=this.ul.width()-$(".item").width(),temp=0,isdone=true;
		var max_num=Math.ceil(this.ul.width()/$(".item").width());
		this.r.hide();
		this.l.bind("click",function(){
			if(!_this.done || !done) return;
			_this.done=!_this.done;
			i++;
			if(i>0){
				_this.r.show();
			}
			_this.ul.animate({left:-$(".item").width()*i},"slow",function(){
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
			if(i<=0){
				_this.r.hide();
				_this.l.show();
			}
			_this.ul.animate({left:-$(".item").width()*i},"slow",function(){
				_this.done=true;
				if(i<max_num-1){
					_this.l.show();
				}
			});
		});
		
		
		var as=this.obj.find("a");
		this.li.click(function(){
			var _i=_this.li.index(this);
			if(temp!=_i){
				temp=_i;
				_this.li.removeClass("active").eq(_i).addClass("active");
				as.fadeOut("slow").eq(_i).fadeIn("slow");
			}
			
		});
		
		
	}

	
}

new Scrolls("scrolls","right_btn","left_btn",".big_pic",false);
new Scrolls("scrolls2","right_btn2","left_btn2",".big_pic2",false);

var slides=function(){
	var div=$(".leftInfo").find("div"),p=$(".leftInfo").find("p");
	div.mousemove(function(evt){
		var e= evt || window.event;
		var top=$(document).scrollTop();
		var x=e.offsetX;
		var y=e.offsetY;
		var i=div.index(this);
		var width=p.eq(i).outerWidth();
		$(this).addClass("zindex").find("p").css({marginLeft:-width/2,top:y-30,left:x}).stop(false,true).fadeIn("slow");
	});
	div.mouseout(function(){
		$(this).removeClass("zindex").find("p").stop(false,true).fadeOut();
	});
}
slides();

var copyRight=function(){
	$(".close,.close_a").click(function(){
		$(".fixed_div").hide();
		$(".found").hide();
		$(".discovery").removeClass("active");
	});
	$(".copy").click(function(){
		$(".fixed_div").show();
		
		$(".found").hide();
		$(".discovery").removeClass("active");
	});
	
	$(".found_wrap").find("div").click(function(){
		$(".discovery").removeClass("active");
		$(".found").hide();
	});
	
	$(".discovery").click(function(){
		$(".fixed_div").hide();
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			$(".found").show();
		}else{
			$(this).removeClass("active");
			$(".found").hide();
		}
	});
	
	var fn=function(){
		var t1=$(".tips1"),t2=$(".tips2"),dd=$(".content_wrap").find("dd"),dt=$(".content_wrap").find("dt");
		t1.click(function(){
			dd.addClass("opacity");
			dt.removeClass("opacity");
			
			$(".first").removeClass("opacity");
		});
		t2.click(function(){
			dt.removeClass("opacity");
			dd.removeClass("opacity");
			$(".tips1").addClass("opacity");
			$(".some_btn").find(".first").removeClass("opacity");
		});
	}
	fn();
	
}
copyRight();

var slide_nav=function(){
	var li=$(".slide_li").find("li.front"),last=$(".slide_li").find("li.lasts"),timer=null;
	li.hover(function(){
		$(this).find("div").show();
	},function(){
		$(this).find("div").hide();
	});
	
	
	last.hover(function(){
		clearTimeout(timer);
		$(this).find("div").show();
	},function(){
		var _this=this;
		timer=setTimeout(function(){
			$(_this).find("div").hide();
		},500);
	});
	
	
}
slide_nav();

function Options(id,cName,model){
	this.id=$("#"+id);
	this.li=this.id.find("."+cName).find("li");
	this.model=this.id.find("."+model);
	this.btn=$(".see_demo");
	this.init();
}
Options.prototype={
	init:function(){
		this.addEvent();
		this.see();
		var that=this;
		this.model.eq(0).css("display","block");
		this.li.eq(0).addClass("active");
	},
	see:function(){
		var _this=this;
		$(".closex").click(function(){
			_this.id.fadeOut();
		});
		this.btn.click(function(){
			_this.id.show();
			_this.index=_this.btn.index(this);
			_this.model.hide().eq(_this.index).show();
			_this.changeState();
		});
	},
	addEvent:function(){
		var _this=this;
		this.li.click(function(){
			_this.index=_this.li.index(this);
			_this.model.hide().eq(_this.index).show();
			_this.changeState();
		});
	},
	changeState:function(){
		this.li.removeClass("active").eq(this.index).addClass("active");
	}
	
}
new Options("demo_wrap","playlist","sp_here");



function scrollsTo(tar){
	$("body,html").animate({scrollTop:tar},1000);
}

var photoPlay=function(o){
	this.id=$(o.id);
	this.left=this.id.find(o.left);
	this.right=this.id.find(o.right);
	this.li=this.id.find("li");
	this.nav=$(o.nav);
	this.closed=this.id.find(o.closed);
	this.init.apply(this,arguments);
	this.index=0;
}
photoPlay.prototype={
	init:function(){
		//var toleft={left:-862,opacity:0},toleft2={left:0,opacity:1};
		this.addEvent();
	},
	addEvent:function(){
		var self=this;
		this.nav.click(function(){
			var i=self.nav.index(this);
			self.index=i;
			self.id.show();
			self.last();
			self.first();
			self.li.hide().eq(self.index).css({left:0,opacity:1}).show();
		});
		
		this.closed.click(function(){
			self.id.hide();
		});
		
		this.right.click(function(){
			self.toleft();
		});
		
		this.left.click(function(){
			self.toright();
		});
		
	},
	last:function(){
		if(this.index>=this.li.length-1){
			this.right.hide();
		}else{
			this.right.show();
		}
		
	},
	first:function(){
		if(this.index==0){
			this.left.hide();
		}else{
			this.left.show();
		}
	},
	toleft:function(){
		
		this.index++;
		this.li.eq(this.index-1).show().css({left:0,opacity:1}).animate({left:-862,opacity:0},1000,"easeInOutExpo");
		
		this.li.eq(this.index).show().css({left:862,opacity:0}).animate({left:0,opacity:1},1000,"easeInOutExpo");
		this.last();
		this.first();
	},
	toright:function(){
		this.index--;
		this.li.eq(this.index+1).show().css({left:0,opacity:1}).animate({left:862,opacity:0},1000,"easeInOutExpo");
		
		this.li.eq(this.index).show().css({left:-862,opacity:0}).animate({left:0,opacity:1},1000,"easeInOutExpo");
		this.last();
		this.first();
	}
	
}

new photoPlay({
	id:"#cangku",
	left:".l_btn",
	right:".r_btn",
	nav:".ld",
	closed:".guanbi"	
});

new photoPlay({
	id:"#shijue",
	left:".l_btn",
	right:".r_btn",
	nav:".ld_two",
	closed:".guanbi"	
});

new photoPlay({
	id:"#dlht",
	left:".l_btn",
	right:".r_btn",
	nav:".p1",
	closed:".guanbi"	
});

new photoPlay({
	id:"#function_list",
	left:".l_btn",
	right:".r_btn",
	nav:".p2",
	closed:".guanbi"	
});


new photoPlay({
	id:"#tese",
	left:".l_btn",
	right:".r_btn",
	nav:".p3",
	closed:".guanbi"	
});



window.onload=function(){
	$(".loadings").fadeOut("slow");
}













