$(function(){
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
			var num=this.createRandom(40,30),w=this.id.outerWidth(),perwidth=(w/num).toFixed(9),_this=this,img=this.id.find("img"),tmp=0,pos=[];
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
					fn.timer=setTimeout(func,50);
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
	
	for(var i=0;i<$(".banner").length;i++){
		$(".banner").eq(i).attr("id","banner"+(i+1));
		new Wave({
			id:"#banner"+(i+1),
			li:"li",
			wrap:".wave_wrap"
		});
	}
});