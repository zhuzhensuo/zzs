// Initialize your app
var myApp = new Framework7({
	init:false,
	cache:true,
	template7Pages:true,
	template7Data:{
		'page:detail':{},
		'page:search':{
			'results':[]
		},
		'page:gljgdetail':{},
		'page:ynrsdetail':{}

	}
});
var g_map = null;

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var anotherView = myApp.addView('.another-view',{
	domCache:true
})
//为大页面中的按钮添加点击事件判断点击的是哪个页面
/*
 * page:每个大页面里小按钮的父节点className
 * pagename:每个大页面里各个小页面的公共className
 * initpage: initpage的值必须和你点击的按钮对应的页面的data-page值相同
 *
 */
var eventFn=function(obj){
	var a= $(obj.page+" a.tab-link"),
	div=$(obj.pagename);
	a.on('click', function () {
        var i= a.index(this),
        ele=div.eq(i),
        name=ele.attr('data-page'),
        show = ele.is(':hidden');
       	if(name ==obj.initpage && show){
       		obj.callback && obj.callback(name);
       }
     })
}

var click2load=function(obj){
	var a=$(obj.rootNode).find('a.tab-link'),i=0;
	a.on('click',function(){
		i = a.index(this);
		if(i == obj.now){
			obj.callBack && obj.callBack()
		}
	})

}

var cookie={
	dqfx:{
		'0':{
			arDataIndex:0,
			index:0,
			favor:false
		},
		'1':{
			arDataIndex:0,
			index:1,
			favor:false
		},
		'2':{
			arDataIndex:0,
			index:2,
			favor:false
		},
		'3':{
			arDataIndex:0,
			index:3,
			favor:false
		},
		'4':{
			arDataIndex:0,
			index:4,
			favor:false
		},//地区分析数量规模
		'5':{
			arDataIndex:1,
			index:0,
			favor:false
		},
		'6':{
			arDataIndex:1,
			index:1,
			favor:false
		},//地区分析相关机构
		'7':{
			arDataIndex:2,
			index:0,
			favor:false
		},
		'8':{
			arDataIndex:2,
			index:1,
			favor:false
		},
		'9':{
			arDataIndex:2,
			index:2,
			favor:false
		},
		'10':{
			arDataIndex:2,
			index:3,
			favor:false
		},
		'11':{
			arDataIndex:2,
			index:4,
			favor:false
		},
		'12':{
			arDataIndex:2,
			index:5,
			favor:false
		},//地区分析证券私募
		'13':{
			arDataIndex:3,
			index:0,
			favor:false
		},
		'14':{
			arDataIndex:3,
			index:1,
			favor:false
		},
		'15':{
			arDataIndex:3,
			index:2,
			favor:false
		},
		'16':{
			arDataIndex:3,
			index:3,
			favor:false
		},
		'17':{
			arDataIndex:3,
			index:4,
			favor:false
		},
		'18':{
			arDataIndex:3,
			index:5,
			favor:false
		}//地区分析私募股权
	},
	clfx:{
		'0':{
			arDataIndex:4,
			index:0,
			favor:false
		},
		'1':{
			arDataIndex:4,
			index:1,
			favor:false
		},//策略分析数量规模
		'2':{
			arDataIndex:5,
			index:0,
			favor:false
		},
		'3':{
			arDataIndex:5,
			index:1,
			favor:false
		},//策略分析相关机构
		'4':{
			arDataIndex:6,
			index:0,
			favor:false
		},
		'5':{
			arDataIndex:6,
			index:1,
			favor:false
		},
		'6':{
			arDataIndex:6,
			index:2,
			favor:false
		},
		'7':{
			arDataIndex:6,
			index:3,
			favor:false
		},//策略分析收益分析
		'8':{
			arDataIndex:7,
			index:0,
			favor:false
		},
		'9':{
			arDataIndex:7,
			index:1,
			favor:false
		},
		'10':{
			arDataIndex:7,
			index:2,
			favor:false
		},
		'11':{
			arDataIndex:7,
			index:3,
			favor:false
		},
		'12':{
			arDataIndex:7,
			index:4,
			favor:false
		}//策略分析风险分析
	},
	'jgfx':{
		'0':{
			arDataIndex:8,
			index:0,
			favor:false
		},
		'1':{
			arDataIndex:9,
			index:0,
			favor:false
		},
		'2':{
			arDataIndex:9,
			index:1,
			favor:false
		},
		'3':{
			arDataIndex:10,
			index:0,
			favor:false
		},
		'4':{
			arDataIndex:10,
			index:1,
			favor:false
		},
		'5':{
			arDataIndex:10,
			index:2,
			favor:false
		},
		'6':{
			arDataIndex:10,
			index:3,
			favor:false
		},
		'7':{
			arDataIndex:10,
			index:4,
			favor:false
		},
		'8':{
			arDataIndex:11,
			index:0,
			favor:false
		},
		'9':{
			arDataIndex:11,
			index:1,
			favor:false
		}

	}
}
//var ls=localStorage,baseUrl= '/dove';
//var ls=localStorage,baseUrl=BASE_URL;
//var bu=HAWK_URL;
var ls=localStorage,baseUrl= 'https://alpha.genesisfin.net/dove';
//var bu='http://192.168.21.106:8080';
var bu='http://test.genesisfin.net';
var ss=sessionStorage;
var ajaxFunc=function(url,deferred){
	this.url=url;
	this.dtd=deferred;
	this.init.apply(this,arguments);
}
ajaxFunc.prototype={
	init:function(){
		var self=this;
		return $.ajax({
			type:'get',
			dataType:'json',
			url:self.url,
			success:self.dtd.resolve,
			error:self.dtd.reject
		})
	}
}
var fetchApiDate=function(obj){
	var dtd=$.Deferred();
	var fetchApiDates =function(){
		new ajaxFunc(obj.url,dtd)
		return dtd.promise();
	}
	$.when(fetchApiDates()).done(obj.done).fail(obj.fail);
}

//用一个符号隔开一个年份和月份
function formatDate(arr,sign,b){
    b = b || false;
    return arr = arr.map(function(v,k){
        var year =v.substring(0,4);
        v=v.split(year)[1];
        if(!b){
            v = v.length>1 ? v : '0'+v;
            return [year,v].join(sign || '-');
        }else{
            return year+sign+parseInt(v)+'季度';
        }

    })

}
var getmm=function(value,nodata){
    nodata = nodata || true;
    if(!nodata){
        value = 0;
    }
	if(value==0){
		return{
			max:0,
			min:0
		}
	}else if(value>0){
		return {
			max:value>=1 ? 100 : value >= 0.1 ? 1 : 0.1,
			min:0
		}
	}else if(value<0){
		return {
			max:0,
			min:-1
		}
	}
}
function getWeb(){
    $.ajax({
        url: baseUrl+'/fund/stat/security/rets/getStrategyDic',
        type: 'GET',
        dataType: 'json',
        success:function(res){
        },
        error:function(err) {
            myApp.alert('无网络，请稍后重试！','');
        }
    })
}
getWeb();
function getKey(){
	return {'相对价值': "2", '债券策略': "4", '股票策略': "3", '股票多头': "1", 'CTA/宏观': "5"}
//  return $.ajax({
//      url: baseUrl+'/fund/stat/security/rets/getStrategyDic',
//      async:false,
//      success: (data) => {
//          return data['strategy'];
//      },
//      error: (err) => {
//          return '';
//      }
//  })
}
function returnStrategy(){
	var strategy = ls.getItem('strategy');
	//var jsons=getKey()['responseJSON']['strategy'];
	var jsons=getKey();
	return jsons[strategy];
}
function returnStar(len){
    var str='',star='★';
    for(var i=0;i<=len;i++){
        str+=star;
    }
    return str;
}
//获取一系列类名中有active类的节点的index
var getIndex=function(className){
	var i=null;
	$(className+' a.tab-link').each(function(k,v){
		if($(this).hasClass('active')){
			i = k;
		}
	})
	return i;
}

//接收一个对象数组，然后根据对象的name为echarts动态设置setOption;
 var loadData=function(charts){
 		clearTimeout(this.timer);
   		this.timer=setTimeout(function(){
   			charts.forEach(function(v,k){
   				var id = document.getElementById(v['name']+(k+1));
	   			if(id == null) return;
   				if(v.chart == 'hchart'){
   					$(id).highcharts(v.option)
   				}else{
	   				var barChart=echarts.init(id,'dark');
	   				barChart.resize();
					$(window).resize(barChart.resize);
					barChart.setOption(v.opt);
   				}

			})
   		},50)

   }

 var loadSingleData=function(v,i){
 		var id = document.getElementById(v['name']+i);
 		if(id==null) return;
 		if(v.chart == 'hchart'){
 			$(id).highcharts(v.opt);
 		}else{
 			var barChart=echarts.init(id,'dark');
			barChart.resize();
			$(window).resize(barChart.resize);
			barChart.setOption(v.opt);
 		}

   }

 var allData=getAllData();

 //加入收藏
 function addFavorite(obj,node){
	var name=obj['name'],no=obj['no'],isFavor=cookie[name][no]['favor'],favorWrap=$('.favors'),ars=[];
	if(!isFavor){
		cookie[name][no]['favor']=true;
		$(node).addClass('active');
		var ar=allData[obj['arDataIndex']][obj['index']];
		createChart(ar,obj);
		var cook = JSON.stringify(cookie);
		localStorage.setItem('cookie',cook);
		setPanels();
	}else{
		cookie[name][no]['favor']=false;
		$(node).removeClass('active');
		var ar=allData[obj['arDataIndex']][obj['index']];
		var id = ar.name+'-'+obj.no;
		cancels('#'+id,obj)
	}
	loadIsSee()
}

 function loadIsSee(){
	var cook=JSON.parse(localStorage.getItem('cookie'));
	for(var name in cook){
		var el=$('.'+name+'wrap'),
		len = el.find('.commonChart').size(),
		tmp=el.siblings('.addChart'),
		aLen = $('.'+name+'panel').find('a').size();
		if(len == aLen){
			tmp.hide();
		}else{
			tmp.show();
		}
	}
}

 //控制当前添加图表按钮是否显示
 function btnIsSee(o){
 	var self=$(o.node),len=self.siblings('a:visible').size();
 	if(!len){
		$('.'+o.name+'wrap').siblings('.addChart').hide()
	}else{
		$('.'+o.name+'wrap').siblings('.addChart').show()
	}
 }


 //控制panel里的数据
function addFavorite2(o,i,node){
	$(node).hide();
	$('.'+o.name).eq(parseInt(i)).find('h5 span').addClass('active');
	loadFn();
	loadIsSee()

}
//设置添加图表弹出panel的按钮是否显示
function setPanels(){
	forInObj(function(o){
		$('.'+o.k+'panel').find('a').eq(parseInt(o.no)).hide();
	},function(o){
		$('.'+o.k+'panel').find('a').eq(parseInt(o.no)).show();
	})
}
	setPanels();

//点击收藏创建图表
function createChart(ar,obj){
	var div=$("<div class='commonChart'></div>");
	var id = ar.name+'-'+obj.no;
	var h5=$('<h5>'+ar.title+'<span class="active"></span></h5>');
	h5.find('span').on('click',function(){
		cancels(this,obj);
	})
	var chart= $('<div class="chart" id='+id+'></div>');
	div.append(h5).append(chart);

	$('.'+obj.name+'wrap').append(div);


}
//加载图表
function loadFn(){
	var cook=localStorage.getItem('cookie');
	if(cook!=null){
		loadChart(cook)
	}
}
$('a.gxh-link').on('click',function(){
	loadFn()
});

//取消收藏
function cancels(el,o){
	if(typeof el =='string'){
		$(el).parent().remove();
	}else{
		$(el).parent().parent().remove();
	}
	$('.'+o.name).eq(parseInt(o.no)).find('h5 span').removeClass('active');
	cookie[o.name][o.no].favor=false;
	var cook = JSON.stringify(cookie);
	localStorage.setItem('cookie',cook);
	setPanels();
	loadIsSee()
}

//从localStorage中读取数据，收藏条件为true的创建为chart setOption
 function loadChart(){
	forInObj(function(o){
		var json=allData[o.v.arDataIndex][o.v.index];
		var name = json.name+'-'+o.no;
   		setTimeout(function(){
			var ele=document.getElementById(name);
			if(json.chart=='hchart'){
				$(ele).highcharts(json.opt);
			}else{
				var barChart=echarts.init(ele,'dark');
				$(window).resize(barChart.resize);
				barChart.resize();
				barChart.setOption(json.opt);
			}

   		},50)
	})

  }
 //从localStorage中读取数据，收藏条件为true的默认'收藏按钮'拥有active类名，同时创建图表
function settings(o){
	var setClass=function(){
		$('.'+o.k).eq(parseInt(o.no)).find('h5 span').addClass('active');
	}
	setClass();
	var setFavor=function(){
		var sz=allData[o.v.arDataIndex][o.v.index];
		var obj={arDataIndex:o.v.arDataIndex,index:o.v.index,'name':o.k,'no':o.no}
		createChart(sz,obj);

	}
	setFavor();
}
//从localStorage中读取数据,循环把条件为true的json传入一个函数，条件为false的json传入fn2
function forInObj(fn,fn2){
	var cook = JSON.parse(localStorage.getItem('cookie'));
	cookie = cook || cookie;
	for(var key in cookie){
		for(var key2 in cookie[key]){
			var f = cookie[key];
			if(f[key2].favor){
				fn({
					k:key,
					v:f[key2],
					no:key2
				})
			}else{
				fn2 && fn2({
					k:key,
					v:f[key2],
					no:key2
				})
			}
		}
	}
}
forInObj(settings);

//全屏数据
var zoomAr=[{arIndex:0,index:0},{arIndex:0,index:1},{arIndex:0,index:2},{arIndex:0,index:3},{arIndex:0,index:4}/**地区分析数量规模**/,{arIndex:1,index:0},{arIndex:1,index:1}/**地区分析相关机构**/,{arIndex:2,index:0},{arIndex:2,index:1},{arIndex:2,index:2},{arIndex:2,index:3},{arIndex:2,index:4},{arIndex:2,index:5},{arIndex:3,index:0},{arIndex:3,index:1},{arIndex:3,index:2},{arIndex:3,index:3},{arIndex:3,index:4},{arIndex:3,index:5},{arIndex:4,index:0},{arIndex:4,index:1},{arIndex:5,index:0},{arIndex:5,index:1},{arIndex:6,index:0},{arIndex:6,index:1},{arIndex:6,index:2},{arIndex:6,index:3},{arIndex:7,index:0},{arIndex:7,index:1},{arIndex:7,index:2},{arIndex:7,index:3},{arIndex:7,index:4},{arIndex:8,index:0},{arIndex:9,index:0},{arIndex:9,index:1},{arIndex:10,index:0},{arIndex:10,index:1},{arIndex:10,index:2},{arIndex:10,index:3},{arIndex:10,index:4},{arIndex:11,index:0},{arIndex:11,index:1}];

//加入收藏数据
var favorAr=[
	[{arDataIndex:0,index:0,node:this,'name':'dqfx','no':'0',title:'基金数量增长图'},
	{arDataIndex:0,index:1,node:this,'name':'dqfx','no':'1',title:'数量占比图'},
	{arDataIndex:0,index:2,node:this,'name':'dqfx','no':'2',title:'规模占比图'},
	{arDataIndex:0,index:3,node:this,'name':'dqfx','no':'3',title:'实际运行期分布'},
	{arDataIndex:0,index:4,node:this,'name':'dqfx','no':'4',title:'基金平均规模'},
	{arDataIndex:1,index:0,node:this,'name':'dqfx','no':'5',title:'管理人托管人数量增长图'},
	{arDataIndex:1,index:1,node:this,'name':'dqfx','no':'6',title:'管理人类型占比'},
	{arDataIndex:2,index:0,node:this,'name':'dqfx','no':'7',title:'基金平均收益率变化图'},
	{arDataIndex:2,index:1,node:this,'name':'dqfx','no':'8',title:'地域收益率离散性'},
	{arDataIndex:2,index:2,node:this,'name':'dqfx','no':'9',title:'最大回撤率'},
	{arDataIndex:2,index:3,node:this,'name':'dqfx','no':'10',title:'收益率分布图'},
	{arDataIndex:2,index:4,node:this,'name':'dqfx','no':'11',title:'夏普比率'},
	{arDataIndex:2,index:5,node:this,'name':'dqfx','no':'12',title:'beta系数'},
	{arDataIndex:3,index:0,node:this,'name':'dqfx','no':'13',title:'全部基金数量和股权类基金变化'},
	{arDataIndex:3,index:1,node:this,'name':'dqfx','no':'14',title:'法律形式数量变化'},
	{arDataIndex:3,index:2,node:this,'name':'dqfx','no':'15',title:'法律形式占比'},
	{arDataIndex:3,index:3,node:this,'name':'dqfx','no':'16',title:'基金风格等级分布图'},
	{arDataIndex:3,index:4,node:this,'name':'dqfx','no':'17',title:'基金收益等级分布图'},
	{arDataIndex:3,index:5,node:this,'name':'dqfx','no':'18',title:'基金风险等级分布图'}],
	[{arDataIndex:4,index:0,node:this,'name':'clfx','no':'0',title:'基金数量和证券类基金数量变化'},
	{arDataIndex:4,index:1,node:this,'name':'clfx','no':'1',title:'实际运行期分布'},
	{arDataIndex:5,index:0,node:this,'name':'clfx','no':'2',title:'排名前十的托管人数及地域分类'},
	{arDataIndex:5,index:1,node:this,'name':'clfx','no':'3',title:'排名前十的管理人数量及地域分类'},
	{arDataIndex:6,index:0,node:this,'name':'clfx','no':'4',title:'平均收益率变化图'},
	{arDataIndex:6,index:1,node:this,'name':'clfx','no':'5',title:'最佳最差月度回报'},
	{arDataIndex:6,index:2,node:this,'name':'clfx','no':'6',title:'正收益率占比'},
	{arDataIndex:6,index:3,node:this,'name':'clfx','no':'7',title:'收益分布'},
	{arDataIndex:7,index:0,node:this,'name':'clfx','no':'8',title:'投资品种占比饼状图'},
	{arDataIndex:7,index:1,node:this,'name':'clfx','no':'9',title:'风险总结'},
	{arDataIndex:7,index:2,node:this,'name':'clfx','no':'10',title:'策略风险分析'},
	{arDataIndex:7,index:3,node:this,'name':'clfx','no':'11',title:'beta系数'},
	{arDataIndex:7,index:4,node:this,'name':'clfx','no':'12',title:'夏普比率'}
	],
	[
	{arDataIndex:8,index:0,node:this,'name':'jgfx','no':'0',title:'收益率最优管理人榜单'},
	{arDataIndex:9,index:0,node:this,'name':'jgfx','no':'1',title:'地区管理人数量'},
	{arDataIndex:9,index:1,node:this,'name':'jgfx','no':'2',title:'管理人规模分布图'},
	{arDataIndex:10,index:0,node:this,'name':'jgfx','no':'3',title:'上海及上海部分地区管理人数量统计'},
	{arDataIndex:10,index:1,node:this,'name':'jgfx','no':'4',title:'管理人平均收益分布图'},
	{arDataIndex:10,index:2,node:this,'name':'jgfx','no':'5',title:'管理人管理基金数量分布图'},
	{arDataIndex:10,index:3,node:this,'name':'jgfx','no':'6',title:'非本地区注册管理人注册地区及数量统计'},
	{arDataIndex:10,index:4,node:this,'name':'jgfx','no':'7',title:'非本地区注册管理人注册地区占比'},
	{arDataIndex:11,index:0,node:this,'name':'jgfx','no':'8',title:'失联管理人统计'},
	{arDataIndex:11,index:1,node:this,'name':'jgfx','no':'9',title:'异常机构占比统计'}
	]
];

//为echart下各种按钮绑定事件
var bindBtnEvent=function(){
	//全屏事件
	$('.zoomIcon').each(function(k){
		$(this).on('click',function(){
			zoom(zoomAr[k],this);
		})
	})
	//加入收藏事件
	$('.addfavor').each(function(k){
		$(this).on('click',function(){
			var ar=favorAr[0].concat(favorAr[1]).concat(favorAr[2]);
			var obj = ar[k];
			addFavorite(obj,this);
		})
	});

	//个性化dqfxpanel中a点击事件
	$('.dqfxpanel a').each(function(k){
		$(this).on('click',function(){
			var obj = favorAr[0][k];
			addFavorite(obj,this);
			addFavorite2(obj,k,this);
		})
	})
	//个性化clfxpanel中a点击事件
	$('.clfxpanel a').each(function(k){
		$(this).on('click',function(){
			var obj=favorAr[1][k];
			addFavorite(obj,this);
			addFavorite2(obj,k,this);
		})
	})

	//个性化jgfxpanel中a点击事件
	$('.jgfxpanel a').each(function(k){
		$(this).on('click',function(){
			var obj=favorAr[2][k];
			addFavorite(obj,this);
			addFavorite2(obj,k,this);
		})
	})

}
bindBtnEvent();


function zoom(obj,self){
	var fatherwrap=$(self).parent().parent(),w=$(window).width(),h=$(window).height(),oChart=$(self).parent().siblings('div'),top=oChart.offset().top-$(window).scrollTop(),id=allData[obj['arIndex']][obj['index']].name+'id',o=allData[obj['arIndex']][obj['index']],opt=o.opt;
	var div = $('<div class="chartwrap chartwrapcss3" style="height:'+w+'px;width:'+h+'px;top:'+top+'px"><h5>'+o.title+'</h5><span></span><iframe  scrolling="no" border="0" frameborder="0" src="zoom.html" height="100%" width="100%"></iframe></div>');
	div.css({'left':-((h/2)-(w/2)),'top':(h/2)-(w/2)});
	$('body').append(div);
	if(o.chart=='hchart'){
		ls.setItem('hc','1');
	}else{
		ls.setItem('hc','0');
	}
	ls.setItem('opt',JSON.stringify(opt));
	div.find('span').on('click',function(){
		//var t = oChart.offset().top-$(window).scrollTop();
		div.addClass('chartwrapcss4')/*.animate({width:oChart.outerWidth(),height:oChart.outerHeight(),left:0,top:t})*/.on('webkitAnimationEnd',function(){
			div.remove();
		});
		$(this).hide();
	})

}



 //地区分析页面开始
myApp.onPageInit('dqfx',function(e){
	ss.removeItem('top')
	var initval=null,value='';
	var province=getProvice();
	var cnmap=$('#map').vectorMap({
			map: 'cn_mill',
			backgroundColor: '#07202D',
			enableZoom:false,
			showTooltip: false,
			color: '#469DC0',
			colors:{
				setFill:"white"
			},
			regionsSelectable:false,
			selectedColor: 'white',
			selectedRegions:null,
			onLoad:function(event){

			},
			onRegionClick:function(ele,code,region){
				cnmap.deselect('');
				selectInit(code);

			},
			onResize:function(event,width,height){

			}

		});

	//初始化地区
	var initArea=function(){
		//获取各省份名称
		var getArea=function(){
			var dtd=$.Deferred();
			new ajaxFunc(baseUrl+'/fund/stat/area/areaDistribute',dtd);
			return dtd.promise();
		}
		$.when(getArea()).done(function(res){
			var i=0;
			var ar= res.data,select=$('.areachoose');
				ar = ar.sort(function(a,b){
	                return b.fundNum-a.fundNum;
	            });
				ar.forEach(function(v,k){
					var code = v['areaCode'];
					province.forEach(function(b,a){
						var no = b['number'];
						if(code == no){
							var op=$("<option name='"+b['name']+"' value='"+code+"'>"+b['name']+"</option>");
							select.append(op);
						}
					})
				})
				cityinit();

		})
	}
	initArea();

	//点击地图切换select值
	var selectInit=function(code){
		ls.setItem('no',code)
		$('.areachoose option').each(function(v,k){
			if(code == k.value){
				$(k).prop('selected',true);
				apiFn();
			}
		})
	}

	//获取默认加载的地区
	var cityinit=function(){
			var val=$('select.areachoose option:selected').text();
			province.forEach(function(v,k){
				if(v.name == val){
					cnmap.deselect('')
					cnmap.select(v.number)
					var ls=localStorage;
					ls.setItem('no',v.number)
					apiFn();
				}
			})
	}
		//select改变地区
		$('.areachoose').bind('change',function(){
			cityinit();
		})

	//选择不同地区重新请求数据
   var apiFn =function(){
   		//地区分析数量规模
   		fetchdata();
	   	fetchslzb();
		fetchgmzb();
		fetchcxq();
		fetchdqfxslgmseven();

		//地区分析相关机构

		fetchmanage();
		manageType();

		//地区分析证券私募
		fetchpjsy();
		fetchzf();
		fetchdqfxzqsmfour();
		fetchdqfxzqsmfive();
		fetchdqfxzqsmsix();
		fetchdqfxzqsmseven();

		//地区分析私募股权
		fetchdqfxsmgq();
		fetchdqfxsmgqtwo();
		fetchdqfxsmgqthree();
		fetchdqfxsmgqfour();
		fetchdqfxsmgqfive();
		fetchdqfxsmgqsix();
   }

  var dqfxfirstpage=function(){
  	fetchdata();
   	fetchslzb();
	fetchgmzb();
	fetchcxq();
	fetchdqfxslgmseven();
  }

  loadData(ar);

  //地区分析数量规模-基金数量增长图
var fetchdata=function(){
		var v=ls.getItem('no');
		var dtd = $.Deferred();
		var fetchdatas=function(){
			new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/funds/target/list?recentQrts=12',dtd)
			return dtd.promise();
		}
		$.when(fetchdatas()).done(function(res){
			var obj = res.data;
			ar[0]['opt']['legend']['data']=obj.rows;
			obj.cols = formatDate(obj.cols,'-');
			ar[0]['opt']['xAxis'][0]['data']=obj.cols;
			var series = ar[0]['opt']['series'] =[]

			obj.vals.forEach(function(v,k){
				series.push({
		            name:obj.rows[k],
		            type:'bar',
		            stack: '广告',
		            data:v
		        })

			})
			loadSingleData(ar[0],1);
		})

	}
	//地区分析数量规模-数量占比
	var fetchslzb=function(){
		var v=ls.getItem('no');
		var dtd = $.Deferred();
		var fetchslzbs=function(){
			new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/funds/fundType',dtd)
			return dtd.promise();
		}
		$.when(fetchslzbs()).done(function(res){
			var obj = res.data;
			ar[1]['opt']['series'][0]['data']=[];
			obj.vals.forEach(function(v,k){
				ar[1]['opt']['series'][0]['data'].push({value:v,name:obj.cols[k]})
			})

			loadSingleData(ar[1],2);
		});
	}
	//地区分析数量规模-规模占比
	var fetchgmzb=function(){
		var v=ls.getItem('no');
		var dtd = $.Deferred();
		var fetchgmzbs=function(){
			new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/scale/fundType',dtd)
			return dtd.promise();
		}
		$.when(fetchgmzbs()).done(function(res){
			var obj = res.data;
			ar[2]['opt']['series'][0]['data']=[];
			obj.vals.forEach(function(v,k){
				ar[2]['opt']['series'][0]['data'].push({value:v,name:obj.cols[k]})
			})
			loadSingleData(ar[2],3);
		});
	}

	//地区分析数量规模-存续期分布图
	var fetchcxq=function(){
		var v=ls.getItem('no');
		var dtd = $.Deferred();
		var fetchcxqs=function(){
			new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/duration/fundType',dtd)
			return dtd.promise();
		}
		$.when(fetchcxqs()).done(function(res){
			var obj = res.data;
			ar[3]['opt']['legend']['data']=obj.rows;
			ar[3]['opt']['yAxis']['data']=obj.cols;
			ar[3]['opt']['series']=[]
			obj.vals.forEach(function(v,k){
				var plain={
					name:obj.rows[k],
					type: 'bar',
					stack: '总量',
					label: {
		                normal: {
		                    show: true,
		                    position: 'insideRight',
		                    color:'none'
		                }
		            },
		            data:v
				}
				ar[3]['opt']['series'].push(plain)
			})
			loadSingleData(ar[3],4);
		});

	}

	//地区分析数量规模-基金平均规模
	var fetchdqfxslgmseven=function(){

		var v=ls.getItem('no');
		var fetchdqfxslgmsevenjjgm=function(){
			var dtd=$.Deferred();
			new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/scaleAnys/fundType',dtd)
			return dtd.promise()
		}

		$.when(fetchdqfxslgmsevenjjgm()).done(function(res){
			var data=res.data;
			var xdata =[],serieData=[],wrapdata=[],legenddata=[],namedata=['fundQty','scale','avgScale','fundType'];
		    data.forEach(function(v,k){
		    	legenddata.push(v.fundType)
		        xdata[k]=[];
		        namedata.forEach(function(val,key){
		            if(key==2){
		                xdata[k].push(v[val]*1000);
		            }else{
		                xdata[k].push(v[val]);
		            }


		        })
		    })
		    xdata.forEach(function(v,k){
		        wrapdata[k]=[];
		        wrapdata[k].push(v);

		    })
		    ar[4].opt.legend.data=legenddata;
			ar[4].opt.series=serieData;
		    wrapdata.forEach(function(v,k){
		        serieData.push({
		            name: legenddata[k],
		            data: wrapdata[k],
		            type: 'scatter',
		            symbolSize: function (data) {
		                return Math.sqrt(data[2]) / 5e2;
		            },
		            label: {
		                emphasis: {
		                    show: true,
		                    formatter: function (param) {
		                        return param.data[3];
		                    },
		                    position: 'top'
		                }
		            },
		            itemStyle: {
		                normal: {
		                    shadowBlur: 10,
		                    shadowColor: 'rgba(120, 36, 50, 0.5)',
		                    shadowOffsetY: 5

		                }
		            }
		        })
		    })


			loadSingleData(ar[4],5);
		})

	}


var schema = [
    {index: 0, text: '股权形式'},
    {index: 1, text: '基金数量'},
    {index: 2, text: '基金规模'},
    {index: 3, text: '平均规模'}
];

	function cb(){
		eventFn({
			page:'.secondpage',
			pagename:'.dqfxpage',
			initpage:'slgm',
			callback:function(name){
				loadData(ar);
			}
		})
	}
	cb();


var cb2=function(){
	eventFn({
		page:'.secondpage',
		pagename:'.dqfxpage',
		initpage:'xgjg',
		callback:function(name){
			loadData(ar2)
		}
	})
}
cb2()

//地区分析相关机构-管理人托管人数量增长图
var fetchmanage=function(){
	var dtd=$.Deferred();
	var v=ls.getItem('no');
	var fetchmanages=function(){
		new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/mngTruQty/timeSeq?recentQrts=12',dtd)
		return dtd.promise();
	}
	$.when(fetchmanages()).done(function(res){
		var data=res.data;
		var xdata=series=legenddata=[];
		xdata=data.cols.map(function(v,k){
			return v;
		})
		xdata=formatDate(xdata,'-');
		legenddata=data.rows.map(function(v,k){
			return v;
		})
		data.vals.forEach(function(v,k){
			series.push({
	            name:legenddata[k],
	            type:'line',
	            data:v,
	            markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        })
		})
		var obj=ar2[0]['opt'];
		obj.legend.data=legenddata;
		obj.xAxis.data=xdata;
		obj.series=series;

		loadSingleData(ar2[0],1);
	})
}
//地区分析相关机构-管理人类型占比
var manageType=function(){
	var v=ls.getItem('no');
	var dtd = $.Deferred();
	var manageTypes=function(){
		new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/mngrs/fundType',dtd)
		return dtd.promise();
	}
	$.when(manageTypes()).done(function(res){
		var obj=res.data;
		ar2[1]['opt']['series'][0].data=[];
		obj.vals.forEach(function(v,k){
			ar2[1]['opt']['series'][0].data.push({
				value:v,
				name:obj.cols[k]
			})
		})
		loadSingleData(ar2[1],2);
	})
}
var datas=datas2 = [];

var cb3=function(){
	eventFn({
		page:'.secondpage',
		pagename:'.dqfxpage',
		initpage:'yjfx',
		callback:function(name){
			loadData(ar3)
		}
	})
}
cb3()

//地区分析证券私募-基金平均收益率变化图
var fetchpjsy=function(){
	var v=ls.getItem('no');
	var dtd=$.Deferred();
	var fetchpjsys=function(){
		new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/security/ror/list?recentMonths=12',dtd)
		return dtd.promise();
	}
	$.when(fetchpjsys()).done(function(res){
		var data=res.data;
		var serieData1 = legenddata = xdata =series=[];
		if(typeof data == 'undefined'){

		}else{
			legenddata = data.rows.map(function(v,k){
		        return v;
		    });
		    xdata = data.cols.map(function(v,k){
		        return v;
		    })
		    xdata = formatDate(xdata,'-')
		    data.vals.forEach(function(v,k){
		        series.push({
		            name:legenddata[k],
		            type:'line',
		            data:v,
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        })
		    })
			var obj=ar3[0]['opt'];
			obj['legend']['data']=legenddata;
			obj['series']=series;
			obj.xAxis.data=xdata;
			loadSingleData(ar3[0],1);
		}

	})

}
//地区分析证券私募-地域收益率离散性
var fetchzf=function(){
	var v=ls.getItem('no');

	var fetchzfs=function(){
		var dtd=$.Deferred();
		new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/security/ror/disperse?recentMonths=6',dtd)
		return dtd.promise();
	}

	$.when(fetchzfs()).done(function(res){
		var data=res.data;

	    var axisdata =[],boxdata=[],posi=['lower','q1','median','q3','upper'];
	    data.forEach(function(v,k){
	        axisdata.push(v.reportFreq);
	        var box = boxdata[k]=[];
	        posi.forEach(function(a,b){
	            for(var key in v){
	                if(key == a){
	                    box.push(v[key]);
	                }

	            }

	        })
	    })
	    axisdata = formatDate(axisdata,'-')
	    var series=[
	        {
	            name: 'boxplot',
	            type: 'boxplot',
	            data: boxdata,
	            tooltip: {
	                formatter: function (param) {
	                    return [
	                        param.name,
	                        '上边缘: ' + Math.floor(param.data[5]*10000)/100 + '%',
	                        '上四分: ' + Math.floor(param.data[4]*10000)/100 + '%',
	                        '中位数: ' + Math.floor(param.data[3]*10000)/100 + '%',
	                        '下四分: ' + Math.floor(param.data[2]*10000)/100 + '%',
	                        '下边缘: ' + Math.floor(param.data[1]*10000)/100 + '%'
	                    ].join('<br/>')
	                }
	            }
	        }
	    ]
	    var obj=ar3[1]['opt'];
	    obj.xAxis={
            type: 'category',
            data: axisdata,
            boundaryGap: true,
            nameGap:30,
            splitArea: {
                show: false
            },
            axisLabel: {
                formatter:function(params){
                    return params
                }
            },
            splitLine: {
                show: false
            }
        }
	    obj.yAxis={
            type: 'value',
            splitArea: {
                show: true
            }
        }
	    obj.series=series
	    loadSingleData(ar3[1],2);
	})
}


//地区分析证券私募-最大回撤率
var fetchdqfxzqsmfour=function(){
	var dtd = $.Deferred();
	var v=ls.getItem('no');
	var fetchdqfxzqsmfours=function(){
		new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/security/maxdraw/list?recentMonths=12',dtd)
		return dtd.promise();
	}

	$.when(fetchdqfxzqsmfours()).done(function(res){
		var data=res.data;
		var xdata =series=[];
	    xdata =data.cols.map(function(v,k){
	        return v;
	    })
	    xdata = formatDate(xdata,'-')
	    series.push({
	        name:'最大回撤率',
	        type:'line',
	        data:data.vals,

	        markLine: {
	            data: [
	                {type: 'average', name: '平均值'}
	            ]
	        }
	    })
	    var obj=ar3[2]['opt'];
	    obj.legend.data=['最大回撤率'];
	    obj.color=['#F67E7F','#009ABB','#FDB500'];
	    obj.xAxis.data=xdata;
	    obj.series=series;
	    loadSingleData(ar3[2],3);
	})
}
//地区分析证券私募-收益率分布图
var fetchdqfxzqsmfive=function(){
	var dtd=$.Deferred(),v=ls.getItem('no');
	var fetchdqfxzqsmfives=function(){
		new ajaxFunc(baseUrl+'/fund/stat/area/'+v+'/security/ror/latest',dtd)
		return dtd.promise();
	}
	$.when(fetchdqfxzqsmfives()).done(function(res){
		var obj=res.data,ydata = ar3[3].opt.yAxis.data= [],seriesdata = ar3[3].opt.series= [],seriesdata2 = [obj.vals];
		//ydata = obj.cols;
		obj.cols = obj.cols.reverse();
		obj.cols.forEach(function(v,k){
			ydata.push(v);
		})
		ar3[3].opt.color=['#F67E7F'];
		seriesdata.push({
			name: '',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            data: obj.vals
		})
		loadSingleData(ar3[3],4);
	})
}
//地区分析证券私募-夏普比率
	var fetchdqfxzqsmsix =function(){
		var v=ls.getItem('no');
		fetchApiDate({
			url:baseUrl+'/fund/stat/area/'+v+'/security/waveSharpBeta',
			done:function(res){
				var obj=res.data;
				var tmp = ar3[4].opt.series=[],value=null,values=null;
			    if(obj == null){
			        value = 0;
			        values = getmm(value,false);
			    }else{
			        value = obj.sharpRatio;
			        values = getmm(value);
			    }
				tmp.push({
			        name:'',
			        type: 'gauge',
			        min:values.min,
					max:values.max,
			        detail: {formatter:'{value}',offsetCenter:[0,'60%'],fontSize:25},
			        axisLine: {
	                    lineStyle: {
	                        color: [[0.2,'#7CDBF9'], [0.8,'#0098BF'], [1,'#F24F50']]
	                    }
	                },
			        data: [{value:value.toFixed(4), name:''}],
			        radius:'90%',
                	center:['50%','55%']
			    });

				loadSingleData(ar3[4],5);

			}
		})
	}
	//地区分析证券私募-beta系数
	var fetchdqfxzqsmseven =function(){
		var v=ls.getItem('no');
		fetchApiDate({
			url:baseUrl+'/fund/stat/area/'+v+'/security/waveSharpBeta',
			done:function(res){
				var obj=res.data;
				var tmp = ar3[5].opt.series=[],value=null,values=null;
			    if(obj == null){
			        value = 0;
			        values = getmm(value,false);
			    }else{
			        value = obj.beta;
			        values = getmm(value);
			    }
				tmp.push({
			        name:'',
			        type: 'gauge',
			        min:values.min,
					max:values.max,
			        detail: {formatter:'{value}',offsetCenter:[0,'60%'],fontSize:25},
			        axisLine: {
	                    lineStyle: {
	                        color: [[0.2,'#7CDBF9'], [0.8,'#0098BF'], [1,'#F24F50']]
	                    }
	                },
			        data: [{value:value.toFixed(4), name:''}],
			        radius:'90%',
                	center:['50%','55%']
			    });
				loadSingleData(ar3[5],6);
			}
		})
	}

eventFn({
	page:'.secondpage',
	pagename:'.dqfxpage',
	initpage:'smgq',
	callback:function(name){
		loadData(ar4)
	}
})
//地区分析私募股权1
var fetchdqfxsmgq=function(){
	var v=ls.getItem('no');
	fetchApiDate({
		url:baseUrl+'/fund/stat/area/'+v+'/equity/listFunds?recentMonths=12',
		done:function(res){
			var obj=res.data,legenddata = ar4[0].opt.legend.data = [],xdata = ar4[0].opt.xAxis[0].data= [],seriesdata = ar4[0].opt.series=[];
			var time = formatDate(obj.cols,'年',true);
			time.forEach(function(v,k){
				xdata.push(v)
			})
			obj.rows.forEach(function(v,k){
				legenddata.push(v);
			})
			obj.vals.forEach(function(v,k){
				seriesdata.push({
		            name:legenddata[k],
		            type:'bar',
		            data:v
		        })
			})

			loadSingleData(ar4[0],1);
		}
	})
}
//地区分析私募股权2
var fetchdqfxsmgqtwo=function(){
	var v=ls.getItem('no');
	fetchApiDate({
		url:baseUrl+'/fund/stat/area/'+v+'/equity/lawType/funds/list?recentMonths=12',
		done:function(res){
			var obj=res.data,legenddata = ar4[1].opt.legend.data = [],xdata = ar4[1].opt.xAxis[0].data= [],seriesdata = ar4[1].opt.series=[];
			var time =formatDate(obj.cols,'-');
			time.forEach(function(v,k){
				xdata.push(v)
			})
			obj.rows.forEach(function(v,k){
				legenddata.push(v);
				seriesdata.push({
		            name:v,
		            type:'bar',
		            stack: '广告',
		            data:obj.vals[k]
		        });
			})
			loadSingleData(ar4[1],2);
		}
	})
}
//地区分析私募股权3
var fetchdqfxsmgqthree=function(){
	var v=ls.getItem('no');
	fetchApiDate({
		url:baseUrl+'/fund/stat/area/'+v+'/equity/lawType/funds/latest',
		done:function(res){
			var obj=res.data,seriesdata = ar4[2].opt.series[0].data=[];
			obj.cols.forEach(function(v,k){
				seriesdata.push({
					name:v,
					value:obj.vals[k]
				})
			})
			loadSingleData(ar4[2],3);
		}
	})
}
//地区分析私募股权4
var fetchdqfxsmgqfour=function(){
	var v=ls.getItem('no');
	fetchApiDate({
		url:baseUrl+'/fund/stat/area/'+v+'/equity/styleRank/funds/latest',
		done:function(res){
			var obj=res.data,ydata = ar4[3].opt.yAxis.data= [],seriesdata = ar4[3].opt.series= [],seriesdata2 = [obj.vals];
		//ydata = obj.cols;
			obj.cols.forEach(function(v,k){
				ydata.push(returnStar(k));
			})
			seriesdata.push({
				name: '',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'right'
	                }
	            },
	            data: obj.vals
			})
			loadSingleData(ar4[3],4);
		}
	})
}

//地区分析私募股权5
var fetchdqfxsmgqfive=function(){
	var v=ls.getItem('no');
	fetchApiDate({
		url:baseUrl+'/fund/stat/area/'+v+'/equity/retRank/funds/latest',
		done:function(res){
			var obj=res.data,ydata = ar4[4].opt.yAxis.data= [],seriesdata = ar4[4].opt.series= [],seriesdata2 = [obj.vals];
		//ydata = obj.cols;
		obj.cols.forEach(function(v,k){
			ydata.push(returnStar(k));
		})
		seriesdata.push({
				name: '',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'right'
	                }
	            },
	            data: obj.vals
		})
		loadSingleData(ar4[4],5);
		}
	})
}

//地区分析私募股权6
var fetchdqfxsmgqsix=function(){
	var v=ls.getItem('no');
	fetchApiDate({
		url:baseUrl+'/fund/stat/area/'+v+'/equity/riskRank/funds/latest',
		done:function(res){
			var obj=res.data,ydata = ar4[5].opt.yAxis.data= [],seriesdata = ar4[5].opt.series= [],seriesdata2 = [obj.vals];
		//ydata = obj.cols;
		obj.cols.forEach(function(v,k){
			ydata.push(returnStar(k));
		})
		seriesdata.push({
				name: '',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'right'
	                }
	            },
	            data: obj.vals
		})
		loadSingleData(ar4[5],6);
		}
	})
}

//地区分析下拉刷新
var ptrcontent=$$('.pull-to-refresh-content');
ptrcontent.on('refresh',function(){
	location.reload();
})



})

//策略分析页面
myApp.onPageInit('clfx',function(){
	var opt={
		calculable: false,
		tooltip: {
	        trigger: 'item',
	        formatter: "{b} : {c} ({d}%)"
	    },
		series: [{
			type: 'pie',
			radius:['50%','75%'],
			center: ['50%', '50%'],
			data:[]
		}]
	}
	var colors=['#7BDCF9','#0197BF','#F67E80','#FFB001','#C7D05D'],name='';
	var setDefaultsStrategy=function(){}
	//初始化select，动态创建option
	var clinit = function(){
		var dtd=$.Deferred();
		var clinits=function(){
			new ajaxFunc(baseUrl+'/fund/stat/security/rets/funds/strategy',dtd);
			return dtd.promise();
		}
		$.when(clinits()).done(function(res){
			var obj=res.data,option=null,i=0,defaults=3,color=colors[defaults-1];
			//var jsons=getKey()['responseJSON']['strategy'];
			var jsons=getKey();
			for(var key in jsons){
				if(jsons[key] == defaults){
					defaults = key;
					ls.setItem('strategy',key);
				}
			}
			opt['series'][0]['data']=[];
			ls.setItem('color',color);
			obj.cols.forEach(function(v,k){
				if(v == defaults){
					option = $("<option value="+v+" selected>"+v+"</option>");
				}else{
					option = $("<option value="+v+">"+v+"</option>");
				}

				$(".clselect").append(option);
				var plain={
					value:obj.vals[k],
					name:v
				}
				opt.series[0].data.push(plain);
				setTimeout(getSelectedval,5000);
			})

		})
	}
	clinit();
	var initFn=function(){
		getSelectedval();
		getOneobj();
		getclfx();
		bindEvent();
	}

	//点击饼图当前饼为选中状态
	var foreach=function(o,value){
		fetchApiFn();
		o.forEach(function(v,k){
			v.selected=false;
			if(v.name == value){
				v['selected']=true;
			}
		})
	}

	//点击饼图重新请求数据
	var fetchApiFn=function(){
		//策略分析数量规模
		fetchclslgm();
		fetchclslgmthree();

		//策略分析相关机构

		//策略分析收益分析
		fetchclfxsyfx();
		fetchclfxsyfxtwo();
		fetchclfxsyfxthree();
		fetchclfxsyfxfive();

		//策略分析风险分析
		fetchclfxfxfx();
		fetchclfxfxfxtwo();
		fetchclfxfxfxthree();
		fetchclfxfxfxfour();
		fetchclfxfxfxfive();
	}
	//apiFn()

	var clfxFirstPage=function(){
		fetchclslgm();
		fetchclslgmthree();
	}
	//获取select值
	var getSelectedval=function(){
		var value=$('.clselect').val();
		ls.setItem('strategy',value);
		var o=opt['series'][0]['data'];
		foreach(o,value);
	}

	//给策略选择select添加事件
	var selectEvent=function(){
		var selecnode=$('.clselect');
		selecnode.on('change',function(){
			var i=this.selectedIndex;
			getSelectedval();
			getclfx();
			ls.setItem('color',colors[i]);
		})
	}
	selectEvent();

	//获取策略饼图对象
	var getOneobj=function(){
		var chart=echarts.init(document.getElementById('clfxpie'),'dark');
		chart.resize();
		window.onresize=chart.resize;
		 return chart;
	}
	//为饼图绑定点击事件
	var bindEvent=function(){
		var chart = getOneobj();
		ls.setItem('last',0);
		chart.on('click',function(e){
			var value=e.name;
			ls.setItem('strategy',value);
			var o=opt['series'][0]['data'];
			foreach(o,value);
			setSelection(value);
			getclfx();
			ls.setItem('color',e.color);
			if(e.dataIndex==4){
				ls.setItem('last',1);
			}else{
				ls.setItem('last',0);
			}
		})
	}

	//为饼图重置数据
	var getclfx=function(){
		var chart = getOneobj();
		chart.setOption(opt)

	}
	//点击饼图改变select值
	var setSelection=function(value){
		$('.clselect option').each(function(k,v){
			if(value == v.value){
				$(v).prop('selected',true)
			}
		})
	}

	//判断是否点击策略分析按钮
	$$('.clfx-link').on('click','a',function(){
		setTimeout(function(){
			var clfx=$("#clfx");
			if(!clfx.is(":hidden")){
				initFn();
				clfxFirstPage();
			}
		},40)

	})

	var fetchApiDate=function(obj){
		var dtd=$.Deferred();
		var fetchApiDates =function(){
			new ajaxFunc(obj.url,dtd)
			return dtd.promise();
		}
		$.when(fetchApiDates()).done(obj.done);
	}

	//策略分析相关机构1
	var fetchclfxxgjg=function(){
		var dtd=$.Deferred();
		var fetchclfxxgjgs=function(){
			new ajaxFunc(baseUrl+'/fund/stat/security/risk/organ/tru/funds',dtd)
			return dtd.promise();
		}
		$.when(fetchclfxxgjgs()).done(function(res){
			var obj=res.data;
			clfxxgjgar[0].opt.legend.data=[];
			clfxxgjgar[0].opt.series[0].data=[];
			clfxxgjgar[0].opt.series[1].data=[];

			var equal=function(){
				var copy=[];
				obj.forEach(function(v,k){
					var o=$.extend({},v);
					copy.push(o)
				})
				var jisuan=function(){
					var ar={};
					while(true){
						if(copy.length == 0){
							return ar;
						}
						var first=copy.shift();
						if(typeof ar[first.areaName] == 'undefined'){
							ar[first.areaName]={
								value:first.value
							}
						}else{
							ar[first.areaName].value+=first.value
						}
					}

				}
				return jisuan();
			}
			var getObj= equal();
			clfxxgjgar[0].opt.series[0].data=[];
			for(var key in getObj){
				var plain={
					value:getObj[key].value,
					name:key
				}
				clfxxgjgar[0].opt.series[0].data.push(plain)
			}
			obj.forEach(function(v,k){
				var plain={
					value:v.value,
					name:v.name
				}
				clfxxgjgar[0].opt.legend.data.push(v.name);
				clfxxgjgar[0].opt.series[1].data.push(plain);

			})
			eventFn({
				page:'.clfxsecondpage',
				pagename:'.clfxpage',
				initpage:'clfxxgjg',
				callback:function(name){
					loadData(clfxxgjgar)
				}
			})

		})
	}
	fetchclfxxgjg();

	//策略分析相关机构2
	var fetchclfxxgjgtwo=function(){
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/risk/organ/mng/funds',
			done:function(res){
				var obj=res.data;
				clfxxgjgar[1].opt.legend.data=[];
				clfxxgjgar[1].opt.series[0].data=[];
				clfxxgjgar[1].opt.series[1].data=[];

				var equal=function(){
					var copy=[];
					obj.forEach(function(v,k){
						var o=$.extend({},v);
						copy.push(o)
					})
					var jisuan=function(){
						var ar={};
						while(true){
							if(copy.length == 0){
								return ar;
							}
							var first=copy.shift();
							if(typeof ar[first.areaName] == 'undefined'){
								ar[first.areaName]={
									value:first.value
								}
							}else{
								ar[first.areaName].value+=first.value
							}
						}

					}
					return jisuan();
				}
				var getObj= equal();
				clfxxgjgar[1].opt.series[0].data=[];
				for(var key in getObj){
					var plain={
						value:getObj[key].value,
						name:key
					}
					clfxxgjgar[1].opt.series[0].data.push(plain)
				}
				obj.forEach(function(v,k){
					var plain={
						value:v.value,
						name:v.name
					}
					clfxxgjgar[1].opt.legend.data.push(v.name);
					clfxxgjgar[1].opt.series[1].data.push(plain);

				})

			}
		})
	}
	fetchclfxxgjgtwo();

	eventFn({
		page:'.clfxsecondpage',
		pagename:'.clfxpage',
		initpage:'clfxsyfx',
		callback:function(){
			loadData(clfxsyfxar)
		}
	})
	//策略分析收益分析1
	var fetchclfxsyfx=function(){
		var dtd=$.Deferred();
		var strategy = returnStrategy();
		var fetchclfxsyfxs=function(){
			new ajaxFunc(baseUrl+'/fund/stat/security/rets/strategy/'+strategy+'/avgROR/timeSeq?recentMonths=12',dtd);
			return dtd.promise();
		}
		$.when(fetchclfxsyfxs()).done(function(res){
				var data=res.data;
				var ar=series=xdata=[],color=['#7ADCF9','#00BB36','#F57F7D','#FFB001'],last=ls.getItem('last');
    xdata=formatDate(data.cols,'-');
    ar = data.rows;
    color[0]=localStorage.getItem('color');
    if(last==1){
        ar = ar.reverse();
        data.vals = data.vals.reverse();
    }
    data.vals.forEach(function(v,k){
        series.push({
            name:ar[k],
            type:'line',
            data:v
        })
    })
	var obj=clfxsyfxar[0].opt;
	obj.legend.data=ar;
	obj.color=color;
	obj.xAxis={
		data:xdata
	}
	obj.series=series;
		loadSingleData(clfxsyfxar[0],1);
		})
	}
	fetchclfxsyfx();

	//策略分析收益分析2
	var fetchclfxsyfxtwo=function(){
		var strategy = returnStrategy();
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/rets/strategy/'+strategy+'/bestAndWorstMonthROR/timeSeq?recentMonths=12',
			done:function(res){
				var obj=res.data;
				clfxsyfxar[1]['opt']['legend']['data']=obj.rows;
				var xdata=formatDate(obj.cols,'-');
				clfxsyfxar[1]['opt']['xAxis'][0]['data']=xdata;
				clfxsyfxar[1]['opt']['series']=[];
				obj.vals.forEach(function(v,k){
					clfxsyfxar[1]['opt']['series'].push({
			            name:obj.rows[k],
			            type:'bar',
			            data:v
			        })
				})
				loadSingleData(clfxsyfxar[1],2);
			}
		})
	}
	//fetchclfxsyfxtwo()

	//策略分析收益分析3
	var fetchclfxsyfxthree=function(){
		var strategy=returnStrategy();
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/rets/strategy/'+strategy+'/posRORRatio/timeSeq?recentMonths=12',
			done:function(res){
				var obj=res.data,strategyNm=localStorage.getItem('strategy'),color=localStorage.getItem('color');

				var xdata=formatDate(obj.cols,'-');
				clfxsyfxar[2].opt.xAxis[0].data=xdata;
				clfxsyfxar[2].opt.series=[];
				clfxsyfxar[2].opt.legend.data=[strategyNm];
				clfxsyfxar[2].opt.series.push({
					 name:strategyNm,
		            type:'bar',
		            barWidth: '60%',
		            data:obj.vals
				})
				clfxsyfxar[2].opt.color=[color];
				loadSingleData(clfxsyfxar[2],3);
			}
		})
	}

	//策略分析收益分析-收益分布
	var fetchclfxsyfxfive=function(){
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/rets/funds/strategy/ror',
			done:function(res){
				var obj=res.data;
				clfxsyfxar[3].opt.legend.data=obj.rows;
				clfxsyfxar[3].opt.yAxis.data=obj.cols;
				var tmp = clfxsyfxar[3].opt.series=[];
				obj.vals.forEach(function(v,k){
					tmp.push({
						name: obj.rows[k],
			            type: 'bar',
			            stack: '总量',
			            label: {
			                normal: {
			                    show: true,
			                    position: 'insideRight',
			                    color:'none'
			                }
			            },
			            data:v
					})
				})
				loadSingleData(clfxsyfxar[3],4);
			}
		})
	}
	eventFn({
		page:'.clfxsecondpage',
		pagename:'.clfxpage',
		initpage:'clfxslgm',
		callback:function(name){
			loadData(clfxslgmar);
		}
	})
	//策略分析数量规模-基金数量和证券类基金数量变化
	var fetchclslgm=function(){
		fetchApiDate({
			url:baseUrl+'/fund/stat/securityFunds/timeSeq?recentQrts=12',
			done:function(res){
				var obj=res.data;
				clfxslgmar[0]['opt']['legend'].data=obj.rows;
				var xdata=formatDate(obj.cols,'年',true)
				clfxslgmar[0]['opt']['xAxis'][0]['data']=xdata;
				clfxslgmar[0]['opt']['series']=[];
				obj.vals.forEach(function(v,k){
					var plain={
						name:obj.rows[k],
						type:'bar',
						data:v
					}
					clfxslgmar[0]['opt']['series'].push(plain);

				})
				loadSingleData(clfxslgmar[0],1);
			}
		})
	}
	fetchclslgm();

	//策略分析数量规模-存续期分布图
	var fetchclslgmthree=function(){
		var strategy=returnStrategy();
		var dtd = $.Deferred();
		var fetchclslgmthrees=function(){
			new ajaxFunc(baseUrl+'/fund/stat/security/risk/strategy/'+strategy+'/duration',dtd)
			return dtd.promise();
		}
		$.when(fetchclslgmthrees()).done(function(res){
			var obj = res.data;
			clfxslgmar[1]['opt']['legend']['data']=['证券类'];
			clfxslgmar[1]['opt']['yAxis']['data']=obj.cols;
			clfxslgmar[1]['opt']['series']=[]
			var plain={
				name:'证券类',
				type: 'bar',
				stack: '总量',
				label: {
	                normal: {
	                    show: true,
	                    position: 'right'
	                }
	            },
	            data:obj.vals
			}
			clfxslgmar[1]['opt']['series'].push(plain)
			loadSingleData(clfxslgmar[1],2);
		});
	}

	eventFn({
		page:'.clfxsecondpage',
		pagename:'.clfxpage',
		initpage:'clfxfxfx',
		callback:function(name){
			loadData(clfxfxfxar);
		}
	})
	//策略分析风险分析1
	var fetchclfxfxfx=function(){
		var strategy=returnStrategy();
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/risk/strategy/'+strategy+'/invVariety',
			done:function(res){
				var obj=res.data;
				clfxfxfxar[0]['opt']['series'][0]['data']=[];
				obj.vals.forEach(function(v,k){
					clfxfxfxar[0]['opt']['series'][0]['data'].push({value:v,name:obj.cols[k]})
				})
				loadSingleData(clfxfxfxar[0],1);
			}
		})
	}
	fetchclfxfxfx();
	//策略分析风险分析2

	var fetchclfxfxfxtwo=function(){
		var strategy=ls.getItem('strategy')
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/risk/summary',
			done:function(res){
				var data=res.data,series=legenddata=xdata=[];
			    legenddata = data.rows;
			    xdata=data.cols;
			    xdata.length=5;
			    data.vals.forEach(function(v,k){
			        v.length=5;
			        series.push({
			            name:legenddata[k],
			            type:'bar',
			            data:v
			        })
			    })
			    var obj=clfxfxfxar[1]['opt'];
			    obj.legend.data=legenddata;
			    obj.color=['#0098BF','#F67E7F'];
			    obj.xAxis[0].data=xdata;
			    obj.series=series;

				loadSingleData(clfxfxfxar[1],2);

			}
		})
	}
	//策略分析风险分析3
	var fetchclfxfxfxthree =function(){
		var strategy=returnStrategy();
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/risk/strategy/'+strategy+'/styleFactor',
			done:function(res){
				var data=res.data;
				var series=legenddata=indicatordata=[];

    legenddata = data.rows || [localStorage.getItem('strategy')];
    indicatordata=data.cols.map(function(v,k){
        return {name:v}
    })
    for(var i=0;i<1;i++){
        series.push({
            value:data.vals,
            name:legenddata[i]
        })
    }
    var obj=clfxfxfxar[2].opt;
    obj.tooltip.show=true;
    obj.color=[localStorage.getItem('color')];
    obj.legend.data=legenddata
   	obj.radar.indicator=indicatordata;
   	obj.series[0].data=series;

	loadSingleData(clfxfxfxar[2],3);

			}
		})
	}

	//策略分析风险分析4
	var fetchclfxfxfxfour =function(){
		var strategy=returnStrategy();
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/risk/strategy/'+strategy+'/riskFactorDashboard',
			done:function(res){
				var data=res.data,series=[],ar=[],str='';
    				var tmp = clfxfxfxar[3].opt.series=[];
					var value=null,values=null;
			    if(data == null){
			        value = 0;
			        values = getmm(value,false);
			    }else{
			        value = data.beta;
			        values = getmm(value);
			    }
				tmp.push({
			        name:'',
			        type: 'gauge',
			        min:values.min,
					max:values.max,
			        detail: {formatter:'{value}',offsetCenter:[0,'60%'],fontSize:25},
			        axisLine: {
	                    lineStyle: {
	                        color: [[0.2,'#7CDBF9'], [0.8,'#0098BF'], [1,'#F24F50']]
	                    }
	                },
			        data: [{value:value.toFixed(4), name:''}],
			        radius:'90%',
                	center:['50%','55%']
			    });

				loadSingleData(clfxfxfxar[3],4);

			}
		})
	}

	//策略分析风险分析5
	var fetchclfxfxfxfive =function(){
		var strategy=returnStrategy();
		fetchApiDate({
			url:baseUrl+'/fund/stat/security/risk/strategy/'+strategy+'/riskFactorDashboard',
			done:function(res){
				var data=res.data,series=[],ar=[],str='';
				var values=getmm(value);
				var tmp = clfxfxfxar[4].opt.series=[];
				var value=null,values=null;
			    if(data == null){
			        value = 0;
			        values = getmm(value,false);
			    }else{
			        value = data.sharpRatio;
			        values = getmm(value);
			    }
				tmp.push({
			        name:'',
			        type: 'gauge',
			        min:values.min,
					max:values.max,
			        detail: {formatter:'{value}',offsetCenter:[0,'60%'],fontSize:25},
			        axisLine: {
	                    lineStyle: {
	                        color: [[0.2,'#7CDBF9'], [0.8,'#0098BF'], [1,'#F24F50']]
	                    }
	                },
			        data: [{value:value.toFixed(4), name:''}],
			        radius:'90%',
                	center:['50%','55%']
			    });
				loadSingleData(clfxfxfxar[4],5);

				var name=['卡玛比率','夏普比率','卡帕比率','阿尔法系数','特雷诺比率','年化波动率','索提诺比率','贝塔系数','拟合优度','下行风险'];
			    for(var key in data){
			        ar.push(data[key]);
			    }
			    ar.forEach(function(v,k){			    					str+="<td><span>"+name[k]+"</span><i>"+ar[k].toFixed(4)+"</i></td>";
			    });

				$('.charttable table tr').html(str);
			}
		})
	}


})
function handleSearch(oThis){
	var str = '',value = oThis.value.replace(/\s/g,'')
	$('.searchcondition').find('a').each(function(k,v){
		if($(v).hasClass('active')){
			str = $(v).attr('href').replace('#','')
		}
	})
	if(str == 'jg'){
		curpage = 'jjcp';
		fetchApiDate({
			url:bu+'/api/v1/hawk/funds?searchType=C&searchVal='+value,
			done:function(res){
				var datas = res.records;
				total = res.total;
				window.renderTemplate(datas,res.total);
				ls.setItem('keyword',value);
				ss.setItem('method','C');
				ss.removeItem('top');
				mainView.router.loadPage('search.html');
			}
		})
	}else if(str == 'jj'){
		curpage = 'jjcp';
		fetchApiDate({
			url:bu+'/api/v1/hawk/funds?searchType=F&searchVal='+value,
			done:function(res){
				var datas = res.records;
				total = res.total;
				window.renderTemplate(datas,res.total);
				ls.setItem('keyword',value);
				ss.setItem('method','F');
				ss.removeItem('top');
				mainView.router.loadPage('search.html');
			}
		})
	}else if(str == 'ry'){
		curpage = 'ynrs';
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/87/api/v1/company/employees',
			done:function(res){
				var datas = res.personRecords;
				total = res.total;
				renderTemplate(datas,res.total);
				ls.setItem('keyword',value);
				ss.removeItem('top');
				mainView.router.loadPage('search.html');
			}
		})
	}
}
//基金产品
myApp.onPageInit('searchs',function(){
	curpage = '';
	var toDetailPage = function(){
		$('.hotsuggests').on('click','a',function(){
			loadPage('746665',1)
		})
	}
	toDetailPage();
});
//机构分析
myApp.onPageInit('jgfx',function(e){
	$('a.jgfx-link').on('click',function(){
		setTimeout(function(){
			var jgfx=$("#jgfx");
			if(!jgfx.is(":hidden")){
				jgfxFirstPage();
				initFn();
			}
		},40)
	})

	var initFn=function(){
		fetchjgfxglrbd();
	}

	var getTop10=function(){
		fetchApiDate({
			url:baseUrl+'/fund/mngr/anys/rorTop10/select',
			done:function(data){
				var slt=$('.jgselect');
				data.forEach(function(v,k){
					var option=$("<option value="+v.value+">"+v.label+"</option>");
					slt.append(option);
				})
				ls.setItem('areaCode','000000');
			}
		});
	}
	getTop10();

	var bindevent=function(){
		var slt=$('.jgselect');
		slt.on('change',function(){
			var v=this.value;
			ls.setItem('areaCode',v);
			jgfxFirstPage();
			fetchjgfxglrbd2();
		})
	}
	bindevent();

	var jgfxFirstPage=function(){
		fetchjgfxglrbd();
	}
	jgfxFirstPage();

	eventFn({
		page:'.jgfxsecondpage',
		pagename:'.jgfxpage',
		initpage:'jgfxglrbd',
		callback:function(name){
			loadData(jgfxglrbdar);
		}
	})

	eventFn({
		page:'.jgfxsecondpage',
		pagename:'.jgfxpage',
		initpage:'jgfxyctj',
		callback:function(name){
			loadData(jgfxyctjar);
		}
	})

	//机构分析管理人榜单
	function fetchjgfxglrbd(){
		var v=ls.getItem('areaCode');
		fetchApiDate({
			url:baseUrl+'/fund/mngr/anys/area/'+v+'/rorTop10',
			done:function(res){
				var data = res.data,legenddata=['当期收益率','当期规模'],adata=[],bdata=[],all=[],obj=jgfxglrbdar[0].opt,series=obj.series=[];
				adata = data.map(function(v,k){
					return v.ror;
				});
				bdata = data.map(function(v,k){
					return v.scale;
				});
				all=[adata,bdata];
				obj.legend.data=legenddata;
				obj.xAxis[0].data=['1月'];

				all.forEach(function(v,k){
					series.push({
						name:legenddata[k],
			            type:'bar',
			            data:v
					})
				})
				loadSingleData(jgfxglrbdar[0],1);
			}
		})
	}
	//年收益年规模
	var fetchjgfxglrbd2=function(){
		var v=ls.getItem('areaCode');
		fetchApiDate({
			url:baseUrl+'/fund/mngr/anys/area/'+v+'/rorTop10',
			done:function(res){
				var data = res.data,str="",ar=[],obj={"reportFreq":0,"ror":0,"scale":0},times=4;
				try{
	                data.forEach(function(v,k){
	                	var o={
	                        mngrName:null,
	                        yearror:null,
	                        yearscale:null,
	                   };
	                    var yearrorar=[],yearscalear=[];
	                    o.mngrName=v.mngrName || '';

	                    o.ror=v.ror.toFixed(2) || 0;
	                    if(!v.children){
	                        v.children=[];
	                        for(var i=0;i<times;i++){
	                            v.children.push(obj);
	                        }
	                    }
	                    if(v.children.length<times){
	                        var len=times-v.children.length;
	                        for(var i=0;i<len;i++){
	                            v.children.push(obj);
	                        }
	                    }
	                    v.children.forEach(function(val,key){
	                        yearrorar.push(val.ror.toFixed(2));
	                        yearscalear.push(val.scale.toFixed(2));
	                    })
	                    yearrorar = yearrorar.join(', ');
	                    yearscalear = yearscalear.join(', ');
	                    o.yearscale=yearscalear || 0;
	                    o.yearror=yearrorar || 0;
	                    ar.push(o);
	                });

	                ar.forEach(function(v,k){
	                	str+="<tr><th>"+v.mngrName+"</th><td data-sparkline='"+v.yearror+"'></td><td data-sparkline='"+v.yearscale+"'></td></tr>";
	                })
	                $('#tbody-sparkline').empty();
	                $('#tbody-sparkline').append(str);
	                setTimeout(getMiniChart,0);
                }catch(e){return}
			}
		});
	}
	fetchjgfxglrbd2();

	var getMiniChart=function(){
        Highcharts.SparkLine = function (a, b, c) {
            var hasRenderToArg = typeof a === 'string' || a.nodeName,
                options = arguments[hasRenderToArg ? 1 : 0],
                defaultOptions = {
                    chart: {
                        renderTo: (options.chart && options.chart.renderTo) || this,
                        backgroundColor: null,
                        borderWidth: 0,
                        type: 'area',
                        margin: [2, 0, 2, 0],
                        width: 120,
                        height: 20,
                        style: {
                            overflow: 'visible'
                        },
                        skipClone: true
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: []
                    },
                    yAxis: {
                        endOnTick: false,
                        startOnTick: false,
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        tickPositions: [0]
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        backgroundColor: "#eee",
                        borderColor:'#333',
                        borderWidth: 1,
                        shadow: false,
                        hideDelay: 0,
                        shared: true,
                        radius:10,
                        padding: 10,
                        positioner: function (w, h, point) {
                            return { x: point.plotX - w / 2, y: point.plotY - h };
                        },
                        useHTML:false,
                        style: {
                            color: "#000",
                            fontSize:13,
                            lineHeight:22,
                            zIndex:10000,

                        }
                    },
                    plotOptions: {
                        series: {
                            animation: false,
                            lineWidth: 1,
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            marker: {
                                radius: 1,
                                states: {
                                    hover: {
                                        radius: 2
                                    }
                                }
                            },
                            fillOpacity: 0.25
                        },
                        column: {
                            negativeColor: '#F67E7F',
                            borderColor: 'red'
                        }
                    }
                };
            options = Highcharts.merge(defaultOptions, options);
            return hasRenderToArg ?
                new Highcharts.Chart(a, options, c) :
                new Highcharts.Chart(options, b);
        };
        var start = +new Date(),
            $tds = $('td[data-sparkline]'),
            fullLen = $tds.length,
            n = 0;
        // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
        // can take some seconds, so we split the input into chunks and apply them in timeouts
        // in order avoid locking up the browser process and allow interaction.
        function doChunk() {
            var time = +new Date(),
                i,
                len = $tds.length,
                $td,
                stringdata,
                arr,
                data,
                chart;
            for (i = 0; i < len; i += 1) {
                $td = $($tds[i]);
                stringdata = $td.data('sparkline');
                arr = stringdata.split('; ');
                data = $.map(arr[0].split(', '), parseFloat);
                chart = {};
                if (arr[1]) {
                    chart.type = arr[1];
                }
                $td.highcharts('SparkLine', {
                    series: [{
                        data: data,
                        pointStart: 1
                    }],

                    tooltip: {

                        headerFormat: '<span>' + $td.parent().find('th').html() +' </span><br/>',
                        pointFormat: '<span>Q{point.x}：{point.y}</span>'
                    },
                    chart: chart
                });
                n += 1;
                // If the process takes too much time, run a timeout to allow interaction with the browser
                if (new Date() - time > 500) {
                    $tds.splice(0, i + 1);
                    setTimeout(doChunk, 0);
                    break;
                }
                // Print a feedback on the performance

            }
        }
        doChunk();
    }


	//机构分析地区分析
	eventFn({
		page:'.jgfxsecondpage',
		pagename:'.jgfxpage',
		initpage:'jgfxdqfx',
		callback:function(name){
			loadData(jgfxdqfxar);
		}
	})

	var getcity=function(){
		fetchApiDate({
			url:baseUrl+'/fund/mngr/ljz/regAndBusMngrs',
			done:function(res){
				var data = res.areaData,select = $('.jgselect2');
				data.forEach(function(v,k){
					var opt = $('<option value='+v.code+'>'+v.name+'</option>')
					select.append(opt);
				})
				initarea();
			}
		})
	}
	getcity();

	var initarea=function(){
		var val=$('.jgselect2').val();
		var fn=function(){
			ls.setItem('areano',val);
			initFn();
		}
		fn();
	}
	$('.jgselect2').change(function(){
		initarea();
	});
	var initFn=function(){
		fetchjgfxdqfx2()
		fetchjgfxdqfx3()
		fetchjgfxdqfx4()
		fetchjgfxdqfx5()
	}

	//上海及上海部分地区管理人数量统计
	var fetchjgfxdqfx=function(){
		fetchApiDate({
			url:baseUrl+'/fund/mngr/ljz/regAndBusMngrs',
			done:function(res){
				var data = res.data, obj = jgfxdqfxar[0].opt,lengenddata=[],ydata=[],series=[];
				data.rows.forEach(function(v,k){
					lengenddata.push(v);
					var opt={
						name:v,
						type:'bar',
						data:data.vals[k]
					}
					series.push(opt)
				})
				ydata = data.cols;
				obj.legend.data = lengenddata;
				obj.yAxis={
					type: 'category',
					data:ydata
				}
				obj.series = series;
				loadSingleData(jgfxdqfxar[0],'1')
			}
		})
	}
	fetchjgfxdqfx();

	//管理人平均收益分布图
	var fetchjgfxdqfx2=function(){
		var areaCode =ls.getItem('areano');
		fetchApiDate({
			url:baseUrl+'/fund/mngr/ljz/area/'+areaCode+'/avgRor',
			done:function(res){
				var data=res.data,obj = jgfxdqfxar[1].opt,legenddata=[],ydata=[];
				legenddata = data.rows;
				obj.series = []
				obj.legend.data=legenddata;
				ydata = data.cols
				obj['yAxis']['data']=ydata;
				data.vals.forEach(function(v,k){
					var plain={
						name:data.rows[k],
						type: 'bar',
						stack: '总量',
						label: {
			                normal: {
			                    show: true,
			                    position: 'insideRight',
			                    color:'none'
			                }
			            },
			            data:v
					}
					obj['series'].push(plain)
				})
				loadSingleData(jgfxdqfxar[1],'2');
			}
		})
	}

	//管理人管理基金数量分布图
	var fetchjgfxdqfx3=function(){
		var areaCode =ls.getItem('areano');
		fetchApiDate({
			url:baseUrl+'/fund/mngr/ljz/area/'+areaCode+'/avgRor',
			done:function(res){
				var data=res.data,obj = jgfxdqfxar[2].opt,legenddata=[],ydata=[];
				legenddata = data.rows
				obj.series =[]
				obj.legend.data=legenddata;
				ydata = data.cols
				obj['yAxis']['data']=ydata;
				data.vals.forEach(function(v,k){
					var plain={
						name:data.rows[k],
						type: 'bar',
						stack: '总量',
						label: {
			                normal: {
			                    show: true,
			                    position: 'insideRight',
			                    color:'none'
			                }
			            },
			            data:v
					}
					obj['series'].push(plain)
				})
				loadSingleData(jgfxdqfxar[2],'3');
			}
		})
	}

	//非本地区注册管理人注册地区及数量统计
	var fetchjgfxdqfx4=function(){
		var areaCode =ls.getItem('areano');
		fetchApiDate({
			url:baseUrl+'/fund/mngr/ljz/area/'+areaCode+'/outReg/bar',
			done:function(res){
				var data=res.data,obj = jgfxdqfxar[3].opt;
				obj.xAxis[0].data = data.cols;
				obj.series[0].data = data.vals;
				loadSingleData(jgfxdqfxar[3],'4');
			}
		})
	}
	//非本地区注册管理人注册地区占比
	var fetchjgfxdqfx5=function(){
		var areaCode =ls.getItem('areano');
		fetchApiDate({
			url:baseUrl+'/fund/mngr/ljz/area/'+areaCode+'/outReg/pie',
			done:function(res){
				var obj=res.data,objopt = jgfxdqfxar[4].opt,outerar=[],copy=[],copy2=[];
			    obj.forEach(function(v,k){
			        var o=$.extend({},v);
			        copy.push(o)

			    })
			    var equal=function(){
			        var jisuan=function(){
			            var ar={};
			            while(true){
			                if(copy.length === 0){
			                    return ar;
			                }
			                var first=copy.shift();
			                if(typeof ar[first.province] === 'undefined'){
			                    ar[first.province]={
			                        mngrs:first.mngrs
			                    }
			                }else{
			                    ar[first.province].mngrs+=first.mngrs
			                }
			            }

			        }
			        return jisuan();
			    }
			    var getObj= equal(),innerar=[];
			    for(var key in getObj){
			        innerar.push({
			            value:getObj[key]['mngrs'],
			            name:key
			        })
			    }
			    for(var key in innerar){
			        var o=$.extend({},innerar[key]);
			        o.arr=[];
			        copy2.push(o)
			    }

			    copy2.forEach(function(v,k){
			        obj.forEach(function(a,b){
			            if(a.province == v.name){
			                v.arr.push({value:a.mngrs,name:a.city});
			            }
			        })
			    });
			    var arrs = copy2.map(function(v,k){return v.arr});
			    arrs.forEach(function(v,k){
			        v.forEach(function(a){
			            outerar.push(a)
			        })
			    });
			    objopt.series = [
            {
                name:'省份',
                center:['50%','50%'],
                type:'pie',
                selectedMode: 'single',
                radius: [0, '45%'],

                label: {
                    normal: {
                        position: 'inner',
                        show:false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:innerar
            },
            {
                name:'城市',
                center:['50%','50%'],
                type:'pie',
                radius: ['55%', '80%'],
                label: {
                    normal:{

                        backgroundColor: 'transparent',
                        //borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        color:'white',
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },

                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data:outerar
            }
        ]
				loadSingleData(jgfxdqfxar[4],'5');
			}
		})
	}

	var cbs=function(){
		eventFn({
			page:'.jgfxsecondpage',
			pagename:'.jgfxpage',
			initpage:'jgfxslgm',
			callback:function(name){
				loadData(jgfxslgmar);
			}
		})
	}
	cbs();
	var fetchjgfxslgm1=function(){
		fetchApiDate({
			url:baseUrl+'/fund/mngr/anys/areaQtyTop5',
			done:function(res){
				var data=res.data;
				var series=[],ydata=[],xdata=[],obj=jgfxslgmar[0].opt;
			    ydata = data.cols;
			    xdata=[{
			        categories: ydata,
			        reversed: false,
			        labels: {
			            step: 1
			        }
			    }, { // mirror axis on right side
			        opposite: true,
			        reversed: false,
			        categories: ydata,
			        linkedTo: 0,
			        labels: {
			            step: 1
			        }
			    }];
			    data.vals.forEach(function(v,k){
			        if(k==0){
			            v = v.map(function(val,key){
			                return -val;
			            })
			        }
			        series.push({
			            name: data.rows[k],
			            data:v,
			            showInLegend: true
			        })
			    });
			    obj.xAxis=xdata;
			    obj.yAxis={
			    	title:{
			        	text:null
		            },
		            labels: {
		                formatter: function () {
		                    return (Math.abs(this.value));
		                }
		            }
			    }

			    obj.series=series;
			    loadSingleData(jgfxslgmar[0],'1')
			}
		})
	}
	fetchjgfxslgm1();

	var fetchjgfxslgm2=function(){
		fetchApiDate({
			url:baseUrl+'/fund/mngr/anys/fundType/scale',
			done:function(res){
				var data=res.data,series=[],legenddata=[],xdata=[],obj=jgfxslgmar[1].opt;
			    legenddata = data.rows;
			    xdata=data.cols;
			    data.vals.forEach(function(v,k){
			        series.push({
			            name:legenddata[k],
			            type:'bar',
			            data:v
			        })
			    });
			    obj.legend.data=legenddata;
			    obj.xAxis=[{
		            type : 'category',
		            data : xdata
		        }]
			    obj.series=series;
			    loadSingleData(jgfxslgmar[1],2);
			}
		});
	}
	fetchjgfxslgm2();

	var fetchjgfxyctj1=function(){
		fetchApiDate({
			url:baseUrl+'/fund/mngr/anys/loseContact',
			done:function(res){
				var data = res.data,obj=jgfxyctjar[0].opt;
				obj['series'][0]['data']=[];
				data.vals.forEach(function(v,k){
					obj['series'][0]['data'].push({value:v,name:data.cols[k]})
				})
				loadSingleData(jgfxyctjar[0],1);
			}
		})
	}
	fetchjgfxyctj1();

	var fetchjgfxyctj2=function(){
		fetchApiDate({
			url:baseUrl+'/fund/mngr/anys/abnormal/timeSeq?recentMonths=12',
			done:function(res){
				var data=res.data,series=[],legenddata=[],xdata=[],obj=jgfxyctjar[1].opt;
			    legenddata = data.rows;
			    xdata=formatDate(data.cols,'-');
			    data.vals.forEach(function(v,k){
			        series.push({
			            name:legenddata[k],
			            type:'bar',
			            data:v
			        })
			    })
			    obj.legend.data=legenddata
			    obj.xAxis=[{
		            type : 'category',
		            data : xdata
		        }]
			    obj.series=series;
			    loadSingleData(jgfxyctjar[1],2);
			}
		});
	}
	fetchjgfxyctj2();




})

myApp.onPageInit('gxh', function (page) {

	var addEvent=function(){
		$('.favors').find('h4').each(function(k,v){
			var bro=$(this).siblings('div');
			$(this).on('click',function(){
				if(!$(this).hasClass('active')){
					$(this).addClass('active');
					bro.addClass('actives')
				}else{
					$(this).removeClass('active');
					bro.removeClass('actives')
				}
			})
		})
	}
	addEvent()
	//加载页面时判断添加图表按钮是否显示
	loadIsSee();

	var addCharts=function(){
		var el = $('.addChart');
		el.on('click',function(){
			var i=el.index(this);
			$('.panelwrap').hide().eq(i).show();
		})
	}
	addCharts();
});

//历史记录
var historyRecord=[],curpage='';

//各种标签的事件绑定
var tagEventBind=function(){
	//点击历史记录或热门搜索
	var a = $('.searchtag').find('a');
	$('.searchtag').on('click','a',function(){
		var keyword = $(this).text();
		ls.setItem('keyword',keyword);
		$('.searchinput').val(keyword).focus();
		addHistory(keyword);

	})
	//点击查询方式
	$('.no-gutter').on('click','a',function(){
		setTimeout(function(){
			$('.searchbtn').trigger('focus')
		},100)
	})
	//点击清空历史记录
	$('.record-clear').on('click',function(){
		if(historyRecord.length>0){
			myApp.confirm('','是否清空历史记录？',function(){
				$('.searchtags').empty();
				historyRecord=[];
				ls.removeItem('history')
			});
		}


	})
}

//筛选条件查询
var filterCondition=function(){
	var type=[],strategy=[],star=[];
	var param = $('.strategy,.star').find('a');
	$('.fundType').on('click',function(){
		var type = $(this).attr('id'),a=$('.strategy').find('a');
		a.removeClass('active')
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			a.show();
		}else{
			$(this).addClass('active').siblings('a').removeClass('active');
			a.each(function(){
				if($(this).hasClass(type+'fund')){
					$(this).show()
				}else{
					$(this).hide();
				}
			})
		}
		spliceParam()
	})
	param.on('click',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active')
		}else{
			$(this).addClass('active')
		}
		spliceParam()
	})
	var spliceParam = function(){
		ss.removeItem('top');
		type=[],strategy=[],star=[];
		$('.fundType').each(function(){
			var k = $(this);
			if(k.hasClass('active')){
				var word = k.attr('no');
				type.push(word)
			}
		})
		$('.strategy').find('a').each(function(){
			var k = $(this);
			if(k.hasClass('active')){
				var word = k.attr('no');
				strategy.push(word)
			}
		})
		$('.star').find('a').each(function(){
			var k = $(this);
			if(k.hasClass('active')){
				var word = k.attr('no');
				star.push(word)
			}
		})
		type = type.join(',');
		strategy = strategy.join(',');
		star = star.join(',');
		var keyword = $('.searchbtn2').val();
		var el=$('.byjj2');

		if(el.hasClass('active')){
			getSearchDatas({
				keyword:keyword,
				type:type,
				strategy:strategy,
				star:star,
				refresh:true
			})
		}else{
			getSearchDatas2({
				keyword:keyword,
				type:type,
				strategy:strategy,
				star:star,
				refresh:true
			})
		}
	}

}
filterCondition();

//添加到历史记录
var addHistory = function(record){
	var cookie = ls.getItem('history');
	$('.searchtags').empty();
	if(cookie == null){
		if(record == undefined || record == '') return
		historyRecord.unshift(record);
	}else{
		cookie = JSON.parse(cookie);
		delete cookie['undefined']
		historyRecord = Object.keys(cookie);
		var has = historyRecord.some(function(v,k){
			return v === record
		})
		if(!has){
			if(historyRecord.length<=10){
				historyRecord.unshift(record)
			}else{
				historyRecord.shift();
				historyRecord.unshift(record)
			}
		}
	}
	historyRecord.forEach(function(v,k){
		if(v != undefined){
			var a = $("<a href='#'>"+v+"</a>");
			$('.searchtags').append(a);
		}
	})
	var str ={}
	historyRecord.forEach(function(v){
		str[v]={}
	})
	str = JSON.stringify(str);
	ls.setItem('history',str)
}

//为搜索框添加实时查询
var searchbox=function(page){
	$('.searchclose').on('click','span',function(){
		$('.searchinput').val('').focus();
		$('.search-condition,.searchclose').hide();
	})
	$('.searchbtn').on('input focus',function(){
		var keyword = $(this).val().trim();
		if(keyword == ''){
			$('.search-condition,.searchclose').hide();
		}else{
			$('.search-condition,.searchclose').show();
			
			if(curpage == 'gljg'){
				clearTimeout(this.timer);
				this.timer=setTimeout(function(){
					getGljgDatas({
						organType:'sm',
						keyword:keyword,
					});
				},500)
			}else if(curpage == 'ynrs'){
				clearTimeout(this.timer)
				this.timer = setTimeout(function(){
					getYnrsDatas({
						keyword:keyword,
					})
				})
			}else{
				var el=$('.byjj');
				if(el.hasClass('active')){
					clearTimeout(this.timer);
					this.timer=setTimeout(function(){
						getSearchData({
							keyword:keyword,
						})
					},500)
				}else{
					clearTimeout(this.timer);
					this.timer=setTimeout(function(){
						getSearchData2({
							keyword:keyword
						})
					},500)

				}
			}

		}
	})
}

var searchAction=function(el){
	var record = el.value.trim();
	var ele = $('.byjj2');
	handleMethod(ele)
	ls.setItem('keyword',record);
	addHistory(record);
	ss.removeItem('top');
	mainView.router.reloadPage('search.html');
	$('.filterCondition').find('a').removeClass('active');
	foreachNode();

}
$('body').click(function(e){
	var target = e.target;
	if(target.tagName.toLowerCase() != 'a'|| target.className.indexOf('back')>-1){
		$('.search-condition,.searchclose').hide();
	}
})

//通过基金查询
var getSearchData=function(data){
	fetchApiDate({
		url:bu+'/api/v1/hawk/funds?searchType=F&searchVal='+data.keyword,
		done:function(res){
			var datas = res.records,jj=$('#byjj');
			total = res.total;
			renderTemplate(datas,res.total);
			data.callBack && data.callBack();
			jj.empty()
			datas.forEach(function(v,k){
				var a=$('<a href="#" onclick="gosearchpage(this,1)">'+v['fundName']+'</a>');
				jj.append(a);
			})
		},fail:function(err){
			console.log(err);
		}
	})
}
//通过机构查询
var getSearchData2=function(data){
	fetchApiDate({
		url:bu+'/api/v1/hawk/funds?searchType=C&searchVal='+data.keyword,
		done:function(res){
			var datas = res.records,jj=$('#byjg'),name=[];
			total = res.total;
			renderTemplate(datas,res.total);
			data.callBack && data.callBack();
			jj.empty()
			datas.forEach(function(v,k){
				name.push(v['mngOrg']);
			})
			name = Array.from(new Set(name));
			name.forEach(function(v,k){
				var a=$('<a href="#" onclick="gosearchpage(this)">'+v+'</a>');
				jj.append(a);
			})
		}
	})
}
	
//获取管理机构数据
var getGljgDatas=function(data){
	fetchApiDate({
		//url:bu+'/api/v1/company/companys?organType=sm',
		url:`${bu}/api/v1/company/companys?organType=${data.organType}&keyword=${data.keyword}&size=${data.size || 10}&pages=${data.page || 1}`,
		done:function(res){
			var datas = res.records,jj=$('#gljg');
			renderTemplate(datas,res.total);
			jj.empty()
			datas.forEach(function(v,k){
				var a=$('<a href="#" onclick="gosearchpage(this,1)">'+v['companyName']+'</a>');
				jj.append(a);
			})
			if(data.refresh){
				mainView.router.reloadPage('search.html');
			}
			data.callBack && data.callBack(res.total)
		}
	})
}

//获取业内人士数据
var getYnrsDatas=function(data){
	fetchApiDate({
		url:'http://yapi.ci.genesisfin.net/mock/87/api/v1/company/employees',
		done:function(res){
			var datas = res.personRecords,jj=$('#ynrs');
			renderTemplate(datas,res.total);
			jj.empty()
			datas.forEach(function(v,k){
				var a=$('<a href="#" onclick="gosearchpage(this,1)">'+v['pName']+'</a>');
				jj.append(a);
			})
			if(data.refresh){
				mainView.router.reloadPage('search.html');
			}
			data.callBack && data.callBack(res.total)
		}
	})
}

var getGljgDatas2=function(data){
	fetchApiDate({
		url:`${bu}/api/v1/company/companys?organType=${data.organType}&keyword=${data.keyword}&size=${data.size || 10}&pages=${data.page || 1}`,
		done:function(res){
			var datas = res.records,jj=$('#gljg2');
			renderTemplate(datas,res.total);
			jj.empty();
			datas.forEach(function(v,k){
				var a=$('<a href="#" onclick="reloadpage(this)">'+v['companyName']+'</a>');
				jj.append(a);
			})
			if(data.refresh){
				mainView.router.reloadPage('search.html');
			}
			data.callBack && data.callBack(res.total)
		}
	})
}

var getYnrsDatas2=function(data){
	fetchApiDate({
		url:'http://yapi.ci.genesisfin.net/mock/87/api/v1/company/employees',
		done:function(res){
			var datas = res.personRecords,jj=$('#ynrs2');
			renderTemplate(datas,res.total);
			jj.empty();
			datas.forEach(function(v,k){
				var a=$('<a href="#" onclick="reloadpage(this)">'+v['pName']+'</a>');
				jj.append(a);
			})
			if(data.refresh){
				mainView.router.reloadPage('search.html');
			}
			data.callBack && data.callBack(res.total)
		}
	})
}

//search列表页通过基金查询
var getSearchDatas=function(data){
	fetchApiDate({
		url:bu+'/api/v1/hawk/funds?searchType=F&searchVal='+data.keyword+'&assetClass='+(data.type || '')+'&fundStrategy='+(data.strategy || '')+'&fundRating='+(data.star || '')+'&size='+(data.item || 10),
		done:function(res){
			var datas = res.records,jj=$('#byjj2');
			renderTemplate(datas,res.total);
			jj.empty()
			datas.forEach(function(v,k){
				var a=$('<a href="#" onclick="reloadpage(this)">'+v['fundName']+'</a>');
				jj.append(a);
			})
			if(data.refresh){
				mainView.router.reloadPage('search.html');
			}
			data.callBack && data.callBack(res.total)
		}
	})
}
//search列表页通过机构查询
var getSearchDatas2=function(data){
	fetchApiDate({
		url:bu+'/api/v1/hawk/funds?searchType=C&searchVal='+data.keyword+'&assetClass='+(data.type || '')+'&fundStrategy='+(data.strategy || '')+'&fundRating='+(data.star || '')+'&size='+(data.item || 10),
		done:function(res){
			var datas = res.records,jj=$('#byjg2'),name=[];
			renderTemplate(datas,res.total);
			jj.empty()
			datas.forEach(function(v,k){
				name.push(v['mngOrg']);
			})
			name = Array.from(new Set(name));
			name.forEach(function(v,k){
				var a=$('<a href="#" onclick="reloadpage(this)">'+v+'</a>');
				jj.append(a);
			})
			if(data.refresh){
				mainView.router.reloadPage('search.html')
			}
			data.callBack && data.callBack(res.total)
		}
	})
}
var handleMethod=function(el){
	if(el.hasClass('active')){
		ss.setItem('method','F')
	}else{
		ss.setItem('method','C')
	}
}
myApp.onPageAfterAnimation('searchpage',function(){
	ss.removeItem('top');
})
myApp.onPageAfterAnimation('gxh',function(){
	$('.gxhview').removeClass('gxhview2');
})
function renderTemplate(data,all){
	myApp.template7Data['page:search']={
		total:all,
		results:data
	}

}
myApp.onPageInit('searchpage',function(e){
	var page = e.query.page
	curpage = page;
	addHistory();
	searchbox();
	tagEventBind();

	//根据不同页面设置初始状态
	var handlePage=function(){
		if(curpage == 'gljg'){
			$('.jjcp').remove();
			$('.ynrs').remove();
		}else if(curpage == 'ynrs'){
			$('.jjcp').remove();
			$('.gljg').remove();
		}else{
			$('.ynrs').remove();
			$('.gljg').remove();
		}
	}
	handlePage();
	var searchEvent = function(){
		var el =$('.searchbar-start'),href=el.attr('href')
		el.click(function(){
			var ele = $('.byjj');
			handleMethod(ele);
			var keyword = $('.searchinput').val().trim();
			if(keyword == ''){
				$(this).attr('href','#');
			}else{
				$(this).attr('href',href);
				ls.setItem('keyword',keyword);
				$('.searchinput').val(keyword);
				addHistory(keyword);
			}
		})
	}
	searchEvent();

	//热门搜索
	var hotSearch=function(){
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/68/api/v1/hawk/popularSearch',
			done:function(data){
				data.forEach(function(v){
					var a=$('<a href="#">'+v.searchKey+'</a>');
					$('.hotsearchs').append(a);
				})
			}
		})
	}
	hotSearch()
	fundFavorUsual();
	afn();

})

var reloadpage=function(node){
	var search = myApp.template7Data['page:search'];
	var record = $(node).text().trim(),tmpAr=[];
	tmpAr = search.results.filter(function(v){
		return v.fundName == record || v.companyName == record
	})
	search.results = tmpAr
	search.total = tmpAr.length
	ls.setItem('keyword',record)
	var el = $('.byjj2');
	handleMethod(el)
	addHistory(record);
	ss.removeItem('top');
	mainView.router.reloadPage('search.html');
	$('.filterCondition').find('a').removeClass('active');
	foreachNode();

}
var gosearchpage=function(node,no){
	var keyword = $(node).text().trim();
	ls.setItem('keyword',keyword);
	addHistory(keyword);
	var el=$('.byjj');
	handleMethod(el);
	if(curpage == 'gljg'){
		getGljgDatas({
			keyword:keyword,
			organType:'sm',
			callBack:function(){
				mainView.router.loadPage('search.html')
				ss.removeItem('top')
			}
		})
	}else if(curpage == 'ynrs'){
		getYnrsDatas({
			keyword:keyword,
			callBack:function(){
				mainView.router.loadPage('search.html')
				ss.removeItem('top')
			}
		})
	}else{
		if(no){
			getSearchData({
				keyword:keyword,
				callBack:function(){
					mainView.router.loadPage('search.html')
					ss.removeItem('top')
				}
			})
		}else{
			getSearchData2({
				keyword:keyword,
				callBack:function(){
					mainView.router.loadPage('search.html')
					ss.removeItem('top')
				}
			})
		}
	}
}
var afn=function(){
	var node = $('.searchResult')[0]
	node.onclick=function(event){
		var e = event || window.event;
		var target = e.srcElement || e.target;
		if(target.tagName.toLowerCase() == 'span'){
			fundFavor(target);
		}
	}
	$('.title').on('click','span',function(){
		fundFavor(this);
	})
}
	afn();

function fundFavorUsual(){
	var result = myApp.template7Data['page:search'].results;
	window.fundFavor=function(node){
		var id=$(node).attr('fundid'),page=$(node).attr('page');
		//alert(id);
		var has= $(node).hasClass('active')
		if(has){
			$(node).removeClass('active')
			cancelfundFavor(id,page)
		}else{
			$(node).addClass('active')
			addfundFavor(id,page)
		}
	}
	var cancelfundFavor=function(id){
		var fc=ls.getItem('fundCookie')
		fc = JSON.parse(fc);
		delete fc[id];
		fc = JSON.stringify(fc);
		ls.setItem('fundCookie',fc)
		foreachNode(id);
		transform2Data();
	}

	window.detailFavor=function(id){
		var fc = JSON.parse(ls.getItem('fundCookie')) || {}
		var allkey = Object.keys(fc);
		var has = allkey.some(function(v){ return v == id}),spans = $('.title').find('span');
		if(has){
			spans.addClass('active')
		}else{
			spans.removeClass('active')
		}
	}

	window.foreachNode=function(id){
		var fc = JSON.parse(ls.getItem('fundCookie')) || {}
		var allkey = Object.keys(fc);
		$('.fundlist').each(function(){
			var span = $(this).find('span'),fundid = span.attr('fundid'),page=span.attr('page')
			var has = allkey.some(function(v){ return fundid== id})
			if(allkey.indexOf(fundid) > -1){
				span.addClass('active')
			}else{
				span.removeClass('active')
			}
		})
		if(id){
			detailFavor(id);
		}

	}
	var addfundFavor=function(id,page){
		var fc = JSON.parse(ls.getItem('fundCookie')) || {}
		//把json字符串转成json，然后保存json的所有的key
		var allkey = Object.keys(fc);
		var has = allkey.some(function(v){ return v == id})
		if(!has){
			if(result.length){
				if(page == 'gljg'){
					var match = result.filter(function(v){ return v['id'] == id})
				}else if(page == 'ynrs'){
					var match = result.filter(function(v){ return v['pId'] == id})
				}else{
					var match = result.filter(function(v){ return v['fundId'] == id})
				}
				fc[id]=match[0]
				var str = JSON.stringify(fc)
				ls.setItem('fundCookie',str);
				foreachNode(id);
				transform2Data();
			}else{
				fetchApiDate({
					url:'http://yapi.ci.genesisfin.net/mock/68/api/v1/hawk/fund?fundId='+id,
					done:function(data){
						var matchObject={
							fundName:data.fundName,
							inceptionDate:data.inceptionDate,
							mngOrg:data.mngOrg,
							assetClass:data.assetClass,
							fundId:id
						}
						fc[id]=matchObject;
						var str = JSON.stringify(fc)
						ls.setItem('fundCookie',str);
						foreachNode(id);
						transform2Data();
					}
				})
			}
		}
	}
}

myApp.onPageInit('search',function(e){
	var page = e.query.page;
	handlePage();
	var item=$('.fundlist').length;
	item+=10;
	var total = myApp.template7Data['page:search'].total;
	var method = ss.getItem('method');
	var keyword = ls.getItem('keyword');
	$('.searchinput').val(keyword);
	fundFavorUsual();
	afn();
	foreachNode()
	//根据不同页面设置初始状态
	function handlePage(){
		if(curpage == 'gljg'){
			$('.jjcp2').remove();
			$('.ynrs2').remove();
			$('.byjjcp').remove();
			$('.byynrs').remove();
		}else if(curpage == 'ynrs'){
			$('.jjcp2').remove();
			$('.gljg2').remove();
			$('.byjjcp').remove();
			$('.bygljg').remove();
		}else{
			$('.gljg2').remove();
			$('.ynrs2').remove();
			$('.bygljg').remove();
			$('.byynrs').remove();
		}
	}

	$('.search-condition,.searchclose').hide();
	$('.searchclose').on('click','span',function(){
		$('.searchinput').val('').focus();
		$('.search-condition,.searchclose').hide();
	})
	$('.no-gutter').on('click','a',function(){
		setTimeout(function(){
			$('.searchbtn2').trigger('focus')
		},100)
	})
	$('.searchbtn2').on('input focus',function(){
		var keyword = $(this).val().trim();
		if(keyword == ''){
			$('.search-condition,.searchclose').hide();
		}else{
			$('.search-condition,.searchclose').show();
			var el=$('.byjj2');
			if(curpage == 'gljg'){
				clearTimeout(this.timer)
				this.timer=setTimeout(function(){
					getGljgDatas2({
						keyword:keyword,
						organType:'sm',
						page:1,
						size:10
					})
				},500)
			}else if(curpage == 'ynrs'){
				clearTimeout(this.timer)
				this.timer=setTimeout(function(){
					getYnrsDatas2({
						keyword:keyword
					})
				},500)
			}else{
				if(el.hasClass('active')){
					clearTimeout(this.timer)
					this.timer=setTimeout(function(){
						getSearchDatas({
							keyword:keyword
						})
					},500)

				}else{
					clearTimeout(this.timer)
					this.timer=setTimeout(function(){
						getSearchDatas2({
							keyword:keyword
						})
					},500)
				}
			}

		}
	})
	var loading=false;
	if(total<=10){
		$$('.infinite-scroll-preloader').remove();
		return;
	}
	var top = ss.getItem('top');
	if(top){
		$('.infinite-scroll').scrollTop(top);
	}
	$$('.infinite-scroll').on('infinite',function(e){
		if(loading) return;
		loading = true;
		var top = $('.searchResult').outerHeight();
		ss.setItem('top',top)
		var type=[],strategy=[],star=[];
		$('.fundType').each(function(){
			var k = $(this);
			if(k.hasClass('active')){
				var word = k.attr('no');
				type.push(word)
			}
		})
		$('.strategy').find('a').each(function(){
			var k = $(this);
			if(k.hasClass('active')){
				var word = k.attr('no');
				strategy.push(word)
			}
		})
		$('.star').find('a').each(function(){
			var k = $(this);
			if(k.hasClass('active')){
				var word = k.attr('no');
				star.push(word)
			}
		})
		type = type.join(',');
		strategy = strategy.join(',');
		star = star.join(',');
		var keyword = ls.getItem('keyword');
		var method = ss.getItem('method') || 'F';
		if(curpage == 'gljg'){
			getGljgDatas2({
				keyword:keyword,
				organType:'sm',
				size:item,
				refresh:true,
				callBack:function(all){
					if(item>=all){
						myApp.detachInfiniteScroll($$('.infinite-scroll'));
      					// 删除加载提示符
      					$$('.infinite-scroll-preloader').remove();
      					return;
					}
					item+=10;
					loading=false;
				}
			})
		}else{
			if(method === 'F'){
				getSearchDatas({
					keyword:keyword,
					type:type,
					strategy:strategy,
					star:star,
					item:item,
					refresh:true,
					callBack:function(all){
						if(item>=all){
							myApp.detachInfiniteScroll($$('.infinite-scroll'));
	      					$$('.infinite-scroll-preloader').remove();
	      					return;
						}
						item+=10;
						loading=false;
					}
				})
			}else{
				getSearchDatas2({
					keyword:keyword,
					type:type,
					strategy:strategy,
					star:star,
					item:item,
					refresh:true,
					callBack:function(all){
						if(item>=all){
							myApp.detachInfiniteScroll($$('.infinite-scroll'));
	      					// 删除加载提示符
	      					$$('.infinite-scroll-preloader').remove();
	      					return;
						}
						item+=10;
						loading=false;
					}
				})
			}
		}

	})
})

var fundCollection=[];
var transform2Data=function(){
	var fc = ls.getItem('fundCookie'),str='';
		fundCollection=[]
		fc = JSON.parse(fc);
		for(var key in fc){
			fundCollection.push(fc[key])
		}
		fundCollection.forEach(function(v){
			if(v.hasOwnProperty('id')){
				str += '<div class="fundlist"><span page="gljg" class="active" fundid="'+v.id+'"></span><a href="#" class="gxh2detail"><div class="row no-gutter"><div class="col-40 lefts"><h3>'+v.companyName+'</h3><p>'+(v.companyType || "")+'</p></div><div class="col-60 rights"><div class="row time"><div class="col-40">成立日期</div><div class="col-60">'+v.establishDate+'</div></div><div class="row place"><div class="col-40">公司地址</div><div class="col-60">'+(v.companyAddress || "")+'</div></div></div></div></a></div>';
			}else if(v.hasOwnProperty('pId')){
				str +='<div class="byynrs"><div class="fundlist"><span page="ynrs" class="active" fundid="'+v.pId+'"></span><a href="#" class="gxh2detail"><div class="row no-gutter"><div class="col-30 lefts"><img src="images/timg.jpg" /></div><div class="col-70 rights"><dl><dt>姓名："'+v.pName+'"</dt><dd>曾任'+v.position+'，'+v.pIntro+'</dd></dl></div></div></a></div></div>';
			}else{
				str +='<div class="fundlist"><span class="active" fundid="'+v.fundId+'"></span><a href="#" class="gxh2detail"><div class="row no-gutter"><div class="col-40 lefts"><h3>'+v.fundName+'</h3><p>'+v.fundId+'</p></div><div class="col-60 rights"><div class="row time"><div class="col-40">成立时间</div><div class="col-60">'+v.inceptionDate+'</div></div><div class="row place"><div class="col-40">管理机构</div><div class="col-60">'+v.mngOrg+'</div></div></div></div></a></div>';
			}
		})
		$('.gxhpage').html(str);
}
	transform2Data();

$('.gxhpage').on('click','a.gxh2detail',function(){
	var id = $(this).siblings('span').attr('fundid'),page=$(this).siblings('span').attr('page');
	loadPage(id,'',page)
})
function loadPage2(id){
	var views = myApp.getCurrentView().selector
	if(views == '.view-main'){
		mainView.router.back();
		setTimeout(function(){
			loadPage(id,1);
		},500)
	}else{
		anotherView.router.back();
		setTimeout(function(){
			loadPage(id,0);
		},500)
	}


}
//产品信息点击产品名称
function loadPage3(id,view){
	var curview = myApp.getCurrentView().selector;
	if(curview == '.another-view'){
		view = 0;
	}else{
		view = 1;
	}
	fetchApiDate({
		url:bu+'/api/v1/hawk/fund?fundId='+id,
		done:function(data){
				var detailpage = myApp.template7Data['page:detail'];
				for(var key in data){
					detailpage[key] = data[key];
				}
				var corp=['address','address2','companyAssetSize','companyCode','companyId','companyName','companyProfile','companyStatus','registerNumber']
				if(detailpage.corp == null){
					detailpage.corp={}
					corp.forEach(function(v){
						detailpage.corp[v] = '无'
					})
				}
				if(view){
					mainView.router.loadPage('detail.html?fundId='+id)
					anotherView.router.back();
				}else{
					anotherView.router.loadPage('detail.html?fundId='+id)
					if(/^(detail).html/i.test(mainView.url)){
						mainView.router.back();
					}

				}
			}
	})
}
function loadPage(id,view,nowpage){
	if(curpage == 'gljg' || (nowpage && (nowpage == 'gljg'))){
		var i = 0,total = 15;//max = 14
		var detailpage = myApp.template7Data['page:gljgdetail'];
		//机构信息
		fetchApiDate({
			url:`${bu}/api/v1/company/companyInfo?companyId=${id}`,
			done:function(data){
				for(var key in data){
					detailpage[key] = data[key];
				}
				i++;
				handleLoad();
			}
		})
		//机构变更记录
		fetchApiDate({
			url:`${bu}/api/v1/company/changeRecords?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['changeRecords'] = data.records
			}
		})
		//基金产品
		fetchApiDate({
			url:`${bu}/api/v1/company/funds?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['funds'] = data['funds']
				i++;
				handleLoad();
			},
			fail:function(){
				i++;
				handleLoad();
			}
		})
		//协会公示信息
		fetchApiDate({
			url:`${bu}/api/v1/company/amacInfo?companyId=${id}`,
			done:function(data){
				for(var key in data){
					detailpage[key] = data[key];
				}
				i++;
				handleLoad();
			},
			fail:function(){
				i++;
				handleLoad();
			}
		})
		//人员信息
		fetchApiDate({
			//+id
			url:`${bu}/api/v1/company/employees?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['personRecords'] = data['personRecords']
				var personRecords = detailpage.personRecords;
				total = total + personRecords.length;
				personRecords.forEach(function(v,k){
					fetchApiDate({
						// +v.pId
						url:`${bu}/api/v1/company/personCompany?personId=${v.pId}`,
						done:function(datas){
							v['assumeStockholder'] = datas.assumeStockholder;
							v['assumeLegalPerson'] = datas.assumeLegalPerson;
							v['employCompany'] = datas.employCompany;
							i++;
							handleLoad();
						}
					})
				})
			},
			fail:function(){
				i++;
				handleLoad();
			}
		})
		//对外投资
		fetchApiDate({
			url:`${bu}/api/v1/company/investments?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['invest'] = data.records;
				i++;
				handleLoad();
			}
		})
		//疑似关系
		fetchApiDate({
			url:`${bu}/api/v1/company/probableRelation?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['probableRelation'] = data.records;
				i++;
				handleLoad();
			}
		})
		//股权结构
		fetchApiDate({
			url:`${bu}/api/v1/company/equityStructure?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['equityStructure'] = data.records;
				i++;
				handleLoad();
			}
		})
		//失信信息
		fetchApiDate({
			url:`${bu}/api/v1/company/dishonests?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['dishonest'] = data.records;
				i++;
				handleLoad();
			}
		})
		//法院公告
		fetchApiDate({
			url:`${bu}/api/v1/company/courtAnnounces?companyId=${id}&page=1&size=5`,
			done:function(data){
				detailpage['courtAnnounce'] = data.records;
				i++;
				handleLoad();
			}
		})
		//判决文书
		fetchApiDate({
			url:`${bu}/api/v1/company/verdicts?companyId=${id}&page=1&size=5`,
			done:function(data){
				detailpage['verdict'] = data.records;
				i++;
				handleLoad();
			}
		})
		//经营异常
		fetchApiDate({
			url:`${bu}/api/v1/company/abnormalOps?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['abnormalop'] = data.records;
				i++;
				handleLoad();
			}
		})
		//动产抵押
		fetchApiDate({
			url:`${bu}/api/v1/company/chattelMortgages?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['chattelmortgage'] = data.records;
				i++;
				handleLoad();
			}
		})
		//行政处罚
		fetchApiDate({
			url:`${bu}/api/v1/company/admPenals?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['admpenal'] = data.records;
				i++;
				handleLoad();
			}
		})
		//新闻舆情
		fetchApiDate({
			url:`${bu}/api/v1/company/companyNews?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['companynews'] = data.records;
				i++;
				handleLoad();
			}
		})
		//招聘信息
		fetchApiDate({
			url:`${bu}/api/v1/company/recruitments?companyId=${id}&size=5&page=1`,
			done:function(data){
				detailpage['recruits'] = data['records'];
				i++;
				handleLoad();
			}
		})

		var handleLoad = function(){
			if(i>=total){
				if(view){
					mainView.router.loadPage('gljgdetail.html?fundId='+id);
					anotherView.router.back()
				}else{
					anotherView.router.loadPage('gljgdetail.html?fundId='+id);
					if(/gljgdetail.html/i.test(mainView.url)){
						mainView.router.back()
					}
				}

			}
		}

	}else if(curpage == 'ynrs' || (nowpage && (nowpage == 'ynrs'))){
		var i=0,total = 3;
		var detailpage = myApp.template7Data['page:ynrsdetail']
		//基金信息
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/87/api/v1/company/personInfo',
			done:function(data){
				for(var key in data){
					detailpage[key] = data[key]
				}
				i++;
				handleLoad();
			}
		})
		//企业关系
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/87/api/v1/company/personCompany',
			done:function(data){
				for(var key in data){
					detailpage[key] = data[key]
				}
				i++;
				handleLoad();
			}
		})
		//合作伙伴
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/87/api/v1/company/mainEmployees',
			done:function(data){
				detailpage['partnerRecords'] = data['partnerRecords']
				i++;
				handleLoad();
			}
		})
		var handleLoad = function(){
			if(i>=total){
				if(view){
					mainView.router.loadPage('ynrsdetail.html?fundId='+id);
					anotherView.router.back()
				}else{
					anotherView.router.loadPage('ynrsdetail.html?fundId='+id);
					if(/ynrsdetail.html/i.test(mainView.url)){
						mainView.router.back()
					}
				}
			}
		}
	}else{
		fetchApiDate({
			url:bu+'/api/v1/hawk/fund?fundId='+id,
			done:function(data){
				var detailpage = myApp.template7Data['page:detail'];
				for(var key in data){
					detailpage[key] = data[key];
				}
				var corp=['address','address2','companyAssetSize','companyCode','companyId','companyName','companyProfile','companyStatus','registerNumber']
				if(detailpage.corp == null){
					detailpage.corp={}
					corp.forEach(function(v){
						detailpage.corp[v] = '无'
					})
				}
				console.log(detailpage)
				if(view){
					mainView.router.loadPage('detail.html?fundId='+id)
					anotherView.router.back();
				}else{
					anotherView.router.loadPage('detail.html?fundId='+id)
					if(/^(detail).html/i.test(mainView.url)){
						mainView.router.back();
					}

				}
			}
		})
	}

}
myApp.onPageInit('detail',function(e){
	var view = myApp.getCurrentView().selector
	if(view == '.another-view'){
		$('.gxhview').addClass('gxhview2');
	}
	var id = e.query.fundId;
	fundFavorUsual();
	detailFavor(id)
	afn();
	click2load({
		rootNode:'.detailroot',
		now:1,
		callBack:function(){
			yjfxall();
		}
	})
	var setStar=function(){
		var td=$('td.starclass'),num = parseInt(td.text()),star='';
		for(var i=1;i<=num;i++){
			star+='<i class="active"></i>';
		}
		td.html(star);
	}
	setStar();

	var changeDict=function(){
		var dict={
			'10':'公募基金',
			'8':'私募基金',
			'19':'稳健成长型',
			'11':'成长型',
			'14':'价值投资型',
			'13':'积极成长型',
			'22':'中小企业成长型',
			'16':'平衡型',
			'7':'指数型',
			'20':'优化指数型',
			'18':'收益型',
			'0':'其他',
			'21':'增值型',
			'15':'价值优化型',
			'12':'分红型',
			'17':'商品型',
			'25':'契约型',
			'23':'公司型',
			'24':'合伙型',
			'1':'活动',
			'0':'美金',
			'5':'人民币',
			'7':'港币'
		}
		var convert=function(data){
			var str = $(data.el).text().toString();
			var v = dict[str]
			$(data.el).text(v);
		}
		convert({
			el:'.assetClass'
		})
		convert({
			el:'.state'
		})
		convert({
			el:'.currency'
		})
		convert({
			el:'.investType'
		})
	}
	changeDict();

	var yjfxall=function(){
		setTimeout(function(){
			fetchyjfxjjhb();
			fetchyjfxjjhc();
			fetchyjfxnhbzc();
		},100)

	}
	//业绩分析基金回报
	var fetchyjfxjjhb=function(){
		//var obj = yjfxar[0].opt;
		fetchApiDate({
			url:bu+'/api/v1/hawk/fundReturn?fundId='+id,
			done:function(data){
				var jjhb=data.filter(function(v){
					return v.analyType == 'performance'
				})
				if(!jjhb.length){
					$('#yjfx1').hide().siblings('.nodata').show();
					return;
				}
				jjhb = jjhb[0]['analyData']
				var opt = yjfxar[0].opt,xdata=[],ydata=[];
				xdata = jjhb['x'];
				ydata = jjhb['y'].map(function(v){
					return v.toFixed(2)
				})
				opt.xAxis.data = xdata;
				opt.series[0].data = ydata
				loadSingleData(yjfxar[0],'1')
			},
			fail:function(err){

			}
		})

	}
	//业绩分析基金回撤
	var fetchyjfxjjhc=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/fundReturn?fundId='+id,
			done:function(data){
				var jjhb=data.filter(function(v){
					return v.analyType == 'deviationCharts'
				})
				if(jjhb[0].analyData == null){
					$('#yjfx3').hide().siblings('.nodata').show();
					return;
				}
				jjhb = jjhb[0]['analyData']
				var opt = yjfxar[2].opt,xdata=[],ydata=[];
				xdata = jjhb['x'];
				ydata = jjhb['y'].map(function(v){
					return v.toFixed(2)
				})
				opt.xAxis.data = xdata;
				opt.series[0].data = ydata
				loadSingleData(yjfxar[2],'3')
			},
			fail:function(){

			}
		})

	}
	//业绩分析年化标准差
	var fetchyjfxnhbzc=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/fundReturn?fundId='+id,
			done:function(data){
				var jjhb=data.filter(function(v){
					return v.analyType == 'drawdownCharts'
				})
				if(jjhb[0].analyData == null){
					$('#yjfx2').hide().siblings('.nodata').show();
					return;
				}
				jjhb = jjhb[0]['analyData']
				var opt = yjfxar[1].opt,xdata=[],ydata=[];
				xdata = jjhb['x'];
				ydata = jjhb['y'].map(function(v){
					return v.toFixed(2)
				})
				opt.xAxis.data = xdata;
				opt.series[0].data = ydata
				loadSingleData(yjfxar[1],'2')
			},
			fail:function(){

			}
		})

	}
	//风险与收益
	var rishAndProfit=function(){
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/68/api/v1/hawk/fundBenchmark?fundId='+id,
			done:function(data){
				if(!data.dataDate.length){
					$('.tables1').hide().siblings('.nodata').show();
					return;
				}
				var str='',ar=[],th='<td width="20%"></td>';
				var firstth=$('<tr></tr>');
				data.dataDate.forEach(function(v,k){
					th+='<td width="20%">'+v+'</td>';
				})
				firstth.html(th);
				$('.fxysy').append(firstth)
				data.benchmarkName.forEach(function(v,k){
					ar[k]=[];
					data.value.forEach(function(a,b){
						ar[k].push(a[k])
					})
				})
				ar.forEach(function(v,k){
					v.unshift(data.benchmarkName.shift())
					var tr=$("<tr></tr>"),td=''
					v.forEach(function(a,b){
						a = isNaN(Number(a)) ? a : a.toFixed(2)
						td+="<td>"+a+"</td>";
					})
					tr.html(td);
					$('.fxysy').append(tr)
				})
			},
			fail:function(){

			}
		})
	}
	rishAndProfit();
	//相关性
	var xgx=function(){
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/68/api/v1/hawk/fundRelevant?fundId='+id,
			done:function(data){
				if(!data.rows.length){
					$('.tables2').hide().siblings('.nodata').show();
					return;
				}
				var str='',ar=[],th='<td></td>';
				var firstth=$('<tr></tr>');
				data.cols.forEach(function(v,k){
					th+='<td>'+v+'</td>';
				})
				firstth.html(th);
				$('.xgx').append(firstth)
				data.rows.forEach(function(v,k){
					ar[k]=[];
					data.value.forEach(function(a,b){
						ar[k].push(a[k])
					})
				})
				ar.forEach(function(v,k){
					v.unshift(data.rows.shift())
					var tr=$("<tr></tr>"),td=''
					v.forEach(function(a,b){
						a = isNaN(Number(a)) ? a : a.toFixed(2)
						td+="<td>"+a+"</td>";
					})
					tr.html(td);
					$('.xgx').append(tr);
				})
			},
			fail:function(){

			}
		})
	}
	xgx();


	click2load({
		rootNode:'.detailroot',
		now:2,
		callBack:function(){
			jzfxall();
		}
	})

	var jzfxall=function(){
		setTimeout(function(){
			jzfxhgfx()
			jzfxylcs()
			jzfxfgpy()
			jzfxfgck()
			jzfxhyck();
		},100)
	}
	//净值分析回归分析
	var jzfxhgfx=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/fundEvalues?fundId='+id,
			done:function(data){
				var xdict={'股票风格模型':'Stock Style Model','股票CAPM模型':'Equity CAPM','股票三因子模型':'Equity 3-Factor','股票择时模型':'Equity Market Timing'}
				var legenddict={
					'超额收益':'alpha',
					'金融':'ZX_FINANCE',
					'周期':'ZX_CYCLE',
					'消费':'ZX_CONSUMPTION',
					'成长':'ZX_GROWTH',
					'稳定':'ZX_STABILITY',
					'无风险利率':'rf_mean',
					'择时因子':'Timing Factor',
					'价值因子':'Value Factor',
					'规模因子':'Scale Factor',
					'市场因子':'Market Factor (HS300)'
				}
				if(!data.length){
					$('#jzfx1').hide().siblings('.nodata').show();
					return;
				}
				var xdata=[],legenddata=[],seriesdata=[],datas=[],opt=jzfxar[0].opt;
				data.forEach(function(v){
					for(var index in xdict){
						if(v.chartName == xdict[index]){
							xdata.push(index)
						}
					}
					v.factList.forEach(function(a){
						for(var key in legenddict){
							if(a.factorName == legenddict[key]){
								legenddata.push(key);
								a.factorName = key
							}
						}

					})
				})
				legenddata = Array.from(new Set(legenddata));
				legenddata.forEach(function(v,k){
					var plain={
						name:v,
						data:[]
					}
					seriesdata.push(plain)
				})
				data.forEach(function(v,k){
					var key = v.factList.map(function(a){
						return a.factorName
					})
					legenddata.forEach(function(a,b){
						var has = key.some(function(v1){
							return v1 == a
						})
						if(!has){
							v.factList.push({
								factorName:a,
								value:''
							})
						}
					})
				})
				seriesdata.forEach(function(v,k){
					var name = v.name
					data.forEach(function(a,b){
						var fctAnalyze = a.factList
						fctAnalyze.forEach(function(v2,k2){
							if(name == v2.factorName){
								if(!isNaN(Number(v2.value))){
									//v['data'].push(v2.factorValue.toFixed(2))
								}
								v['data'].push(v2.value)

							}
						})
					})
				})
				var colors = ['#d5896c','#c56564','#46bda5','#54a0d1','#996fc4','#6975cd','#809ace','#597eca','#d19c55','#ccc958','#84ba5a'];
    var stylePointFlag = 'style';
				var plotBands = series.length > 3 ? [{
	                color: 'rgba(119, 96, 179, 0.19)',
	                from: 2.5,
	                to: 3.5
	            }] : [];
		        $('#jzfx1').highcharts({
		            chart: {
		                type: 'column'
		            },
		            title:{
		            	text:''
		            },
		            colors:colors,
		            xAxis: {
		                categories:xdata
		            },
		            yAxis: {
		                title: {
		                    text: '回报(%)'
		                }
		            },
		            tooltip: {
		                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.2f} %</b><br/>',
		                shared: true
		            },
		            plotOptions: {
		                series: {
		                    maxPointWidth:80,
		                    stacking: 'normal',
		                    dataLabels:{
		                        enabled:true,
		                        color:'#ECF1F7',
		                        style:{
		                            textOutline: false,
		                        },
		                        format:'{y:.2f} %'
		                    }
		                }
		            },
		            series: seriesdata
		       	});
			},
			fail:function(){

			}
		})
	}
	//净值分析压力测试
	var jzfxylcs=function(){
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/68/api/v1/hawk/fundPressurTest?fundId='+id,
			done:function(data){
				if(!data.Value.length){
					$('#jzfx2').hide().siblings('.nodata').show();
					return;
				}
				var opt = jzfxar[1].opt,xdata=[],legenddata=[],seriesdata=[];
				xdata = data.knowledgeTest;
				var ar=[]
				legenddata = data.type;
				data.Value.forEach(function(v,k){
					v = v.map(function(val){ return val.toFixed(2)})
					seriesdata.push({
						name: legenddata[k],
			            type: 'bar',
			            barGap: 0,
			            data:v
					})
				})
				opt.legend.data=legenddata;
				opt.xAxis[0].data=xdata;
				opt.series = seriesdata
				loadSingleData(jzfxar[1],'2')
			},
			fail:function(){

			}
		})

	}
	//净值分析风格漂移
	var jzfxfgpy=function(){
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/68/api/v5/hawk/styleDrift?returnMonths=12&fundId='+id,
			done:function(data){
				if(!data.type.length){
					$('#jzfx3').hide().siblings('.nodata').show();
					return;
				}
				var categories = {"中盘价值":0,"中盘成长":1,"价值策略":2,"大盘价值":3,"大盘成长":4,"大盘策略":5,"小盘价值":6,"小盘成长":7,"成长策略":8,"混合策略":9};
				var categories2 = {0:"中盘价值",1:"中盘成长",2:"价值策略",3:"大盘价值",4:"大盘成长",5:"大盘策略",6:"小盘价值",7:"小盘成长",8:"成长策略",9:"混合策略","中盘价值":0,"中盘成长":1,"价值策略":2,"大盘价值":3,"大盘成长":4,"大盘策略":5,"小盘价值":6,"小盘成长":7,"成长策略":8,"混合策略":9};
				data = data.type.map(function(res,k){
                    var yLabel = categories[res], x = Date.parse(data.dataDate[k]);
                    return {y:yLabel,x:x};
                });
                Highcharts.chart('jzfx3', {
                	title: {
							text: ''
					},
					subtitle: {
							text: ''
					},
                    chart: {
                        height: 280,
                        type:"line"
                    },
                    credits:{
                   		text: ''
                    },
                    xAxis:{
                        type:'datetime',
                        title:{
                        	text:''
                        }
                    },
                    yAxis: {
                    	title:{
                        	text:''
                        },
                        labels:{
                            formatter:function(){
                                return categories2[this.value];
                            }
                        },
                        allowDecimals:false,
                        tickPixelInterval : 1,
                        max:9
                    },
                    series: [{
                        data: data
                    }],
                    legend: {
                        enabled: false
                    },
                });
			},
			fail:function(){

			}
		})
	}
	//净值分析风格敞口
	var jzfxfgck=function(){
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/68/api/v1/hawk/styleExposure?returnQrts=4&fundId='+id,
			done:function(data){
				if(!data.styleExposure.length){
					$('#jzfx4').hide().siblings('.nodata').show();
					return;
				}
				var opt = jzfxar[3].opt,seriesdata=[];
				opt.xAxis[0].data = data.dataDate;
				opt.legend.data = data.fundStyle;
				data.styleExposure.forEach(function(v,k){
					v = v.map(function(a,b){ return a.toFixed(2)})
					seriesdata.push({
						name:data.fundStyle[k],
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:v
					})
				})
				opt.series = seriesdata;
				loadSingleData(jzfxar[3],'4')
			},
			fail:function(){

			}
		})

	}
	//净值分析行业敞口
	var jzfxhyck=function(){
		fetchApiDate({
			url:'http://yapi.ci.genesisfin.net/mock/68/api/v1/hawk/industryExposure?returnQrts=4&returnNum=10&fundId='+id,
			done:function(data){
				if(!data.IndustryExposure.length){
					$('#jzfx5').hide().siblings('.nodata').show();
					return;
				}
				var opt = jzfxar[4].opt,seriesdata=[];
				opt.xAxis[0].data = data.dataDate;
				opt.legend.data = data.fundIndustry;
				data.IndustryExposure.forEach(function(v,k){
					v = v.map(function(a,b){ return a.toFixed(2)})
					seriesdata.push({
						name:data.fundIndustry[k],
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:v
					})
				})
				opt.series = seriesdata;
				loadSingleData(jzfxar[4],'5')
			},
			fail:function(){

			}
		})

	}


	click2load({
		rootNode:'.detailroot',
		now:3,
		callBack:function(){
			ccfxall();
		}
	})

	var ccfxall=function(){
		setTimeout(function(){
			ccfxzfxyz();
			ccfxhyyz();
			ccfxfgyz();
			ccfxfxgx();
			ccfxhyyzbj();
			ccfxfxck();
			ccfxjjyhy();
		},100)
	}

	//总风险因子
	var ccfxzfxyz=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/hoding/totalRiskContribut?fundId='+id,
			done:function(data){
				if(!data){
					$('#ccfx1').hide().siblings('.nodata').show();
					return;
				}
				var opt = ccfxar[0].opt,seriesdata=[];
				opt.xAxis[0].data = xdata =["总风险","行业","国家","风格","选择风险"]
				opt.legend.data = legenddata = ['主动风险','组合风险']
				var activeRisk = data.activeRisk.map(function(v){
					return v.value.toFixed(2)
				}),portRisk = data.portRisk.map(function(v){
					return v.value.toFixed(2)
				}),alldata=[activeRisk,portRisk]
				xdata.length = activeRisk.length
				alldata.forEach(function(v,k){
					seriesdata.push({
						name:legenddata[k],
			            type:'bar',
			            data:v
					})
				})
				opt.series = seriesdata
				loadSingleData(ccfxar[0],'1')
			},
			fail:function(){

			}
		})

	}

	//行业因子风险敞口（Top5)
	var ccfxhyyz=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/hoding/factorsTop5?fundId='+id+'&factortype=Industry&factorName=riskContribution',
			done:function(data){
				if(!data){
					$('#ccfx2').hide().siblings('.nodata').show();
					return;
				}
				var xdata=data.expoList.map(function(v){
					return v.factorName
				})
				var opt = ccfxar[1].opt,seriesdata=[];
				opt.xAxis[0].data =xdata
				opt.legend.data = legenddata = ['因子暴露','风险贡献'];
				var expoList = data.expoList.map(function(v){
					return v.value.toFixed(2)
				}),riskFactorList = data.riskFactorList.map(function(v){
					return v.value.toFixed(2)
				}),alldata = [expoList,riskFactorList]

				alldata.forEach(function(v,k){
					seriesdata.push({
						name:legenddata[k],
			            type:'bar',
			            data:v
					})
				})
				opt.series = seriesdata
				loadSingleData(ccfxar[1],'2')
			},
			fail:function(){

			}
		})
	}
	//风格因子风险敞口（Top5)
	var ccfxfgyz=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/hoding/factorsTop5?fundId='+id+'&factortype=Style&factorName=riskContribution',
			done:function(data){
				if(!data){
					$('#ccfx3').hide().siblings('.nodata').show();
					return;
				}
				var xdata=data.expoList.map(function(v){
					return v.factorName
				})
				var opt = ccfxar[2].opt,seriesdata=[];
				opt.xAxis[0].data = xdata
				opt.legend.data = legenddata = ['因子暴露','风险贡献'];
				var expoList = data.expoList.map(function(v){
					return v.value.toFixed(2)
				}),riskFactorList = data.riskFactorList.map(function(v){
					return v.value.toFixed(2)
				}),alldata = [expoList,riskFactorList]
				alldata.forEach(function(v,k){
					seriesdata.push({
						name:legenddata[k],
			            type:'bar',
			            data:v
					})
				})
				opt.series = seriesdata
				loadSingleData(ccfxar[2],'3')
			},
			fail:function(){

			}
		})
	}
	//行业因子风险贡献
	var ccfxfxgx=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/hoding/factorsTop7?fundId='+id+'&factortype=Industry&factorName=riskContribution',
			done:function(data){
				if(!data.length){
					$('#ccfx4').hide().siblings('.nodata').show();
					return;
				}
				var opt = ccfxar[3].opt,seriesdata=[];
				opt.xAxis[0].data = data.map(function(v){
					return v.factorName
				})
				seriesdata = data.map(function(v){
					return v.value.toFixed(2)
				})
				opt.series[0]={
					name:'风险贡献',
		            type:'bar',
		            barWidth:'60%',
		            data:seriesdata
				}
				loadSingleData(ccfxar[3],'4')
			},
			fail:function(){

			}
		})

	}

	//行业因子边际风险贡献
	var ccfxhyyzbj=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/hoding/factorsTop7?fundId='+id+'&factortype=Industry&factorName=marginalRiskContribution',
			done:function(data){
				if(!data.length){
					$('#ccfx5').hide().siblings('.nodata').show();
					return;
				}
				var opt = ccfxar[4].opt,seriesdata=[];
				opt.xAxis[0].data = data.map(function(v){
					return v.factorName
				})
				seriesdata = data.map(function(v){
					return v.value.toFixed(3)
				})
				opt.series[0]={
					name:'风险贡献',
		            type:'bar',
		            barWidth: '60%',
		            data:seriesdata
				}
				loadSingleData(ccfxar[4],'5')
			},
			fail:function(){

			}
		})
	}

	//行业因子风险敞口
	var ccfxfxck=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/hoding/factorsTop7?fundId='+id+'&factortype=Industry&factorName=riskContribution',
			done:function(data){
				if(!data.length){
					$('#ccfx6').hide().siblings('.nodata').show();
					return;
				}
				var opt = ccfxar[5].opt,radar = opt.radar.indicator = [],seriesdata=[],factorName=[],factorValue=[];
				opt.legend.data = legenddata =[]
				factorName = data.map(function(v){
					return v.factorName
				}),factorValue = data.map(function(v){
					return v.value.toFixed(3);
				}),mx = Math.max.apply(null,factorValue),
				alldata = [factorValue]
				factorName.forEach(function(v,k){
					radar.push({
						name:v,
						max:mx
					})
				})
				alldata.forEach(function(v,k){
					seriesdata.push({
						value : v,
                		name : legenddata[k]
					})
				})
				opt.series[0].data = seriesdata
				loadSingleData(ccfxar[5],'6')
			},
			fail:function(){
			}
		})

	}

	//基金与行业因子的相关性
	var ccfxjjyhy=function(){
		fetchApiDate({
			url:bu+'/api/v1/hawk/hoding/factorsTop7?fundId='+id+'&factortype=Industry&factorName=portfolioCor',
			done:function(data){
				if(!data.length){
					$('#ccfx7').hide().siblings('.nodata').show();
					return;
				}
				var opt = ccfxar[6].opt;

				opt.yAxis.data = ydata = data.map(function(v){
					return v.factorName
				})
				var yvalue = data.map(function(v){ return v.value.toFixed(2)})
				opt.series[0]={
		            type: 'bar',
		            data: yvalue
				}
				loadSingleData(ccfxar[6],'7')
			},
			fail:function(){
			}
		})
	}
})

myApp.onPageInit('ycjgpage',function(e){
	$('#citySelect').citySelect({
		url:'js/city.min.js',
		prov:'上海',
		city:'浦东新区',
		nodata:'请选择'
	});
});

myApp.onPageInit('gljgdetail',function(e){
	var view = myApp.getCurrentView().selector
	if(view == '.another-view'){
		$('.gxhview').addClass('gxhview2');
	}
	var id = e.query.fundId;
	fundFavorUsual();
	detailFavor(id)
	afn();
	$('.alltab').on('click',function(){
		var el = $(".flowbox");
		if(el.is(':hidden')){
			el.show()
		}else{
			el.hide()
		}
	})
	$('.flowbox a').on('click',function(){
		$('.flowbox').hide();
	})

	var employ = $('.detailemployee').find('.employee');
	var li =$('.detailemployee li');
	li.on('click',function(){
		var i = li.index(this);
		var cur = employ.eq(i);
		if(cur.is(':hidden')){
			cur.show();
		}else{
			cur.hide();
		}
	})
	
	var loadings=false,
	fygg = $('.fyggwrap'),
	pjws = $('.pjwswrap'),
	jyyc = $('.jyycwrap'),
	xwyq = $('.xwyqwrap'),
	xzcf = $('.xzcfwrap'),
	jgxx = $('.jgxxwrap'),
	xwyq = $('.xwyqwrap'),
	wzcf = $('.wzcfwrap'),
	gqjg = $('.gqjgwrap'),
	ysgx = $('.ysgxwrap'),
	dwtz = $('.dwtzwrap'),
	dcdy = $('.dcdywrap'),
	sxxx = $('.sxxxwrap'),
	zpxx = $('.zpxxwrap'),
	jjcp = $('.jjcpwrap');
	var handleInit=function(){
		if(ysgx.children().length == 0){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			ysgx.append(span)
		}
		if(!jjcp.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			jjcp.append(span)
		}
		if(!zpxx.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			zpxx.append(span)
		}
		if(!sxxx.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			sxxx.append(span)
		}
		if(!dcdy.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			dcdy.append(span)
		}
		if(!fygg.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			fygg.append(span)
		}
		if(!pjws.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			pjws.append(span)
		}
		if(!jyyc.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			jyyc.append(span)
		}
		if(!xwyq.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			xwyq.append(span)
		}
		if(!wzcf.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			wzcf.append(span)
		}
		if(!gqjg.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			gqjg.append(span)
		}
		if(!dwtz.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			dwtz.append(span)
		}
		if(!xzcf.children().length){
			var span = $('<div style="text-align:center;">暂无数据</div>')
			xzcf.append(span)
		}
	}
	handleInit();
	
	$$('.infinite-scroll').on('infinite',function(){
		if(loadings) {
			return;
		}
		loadings=true;
		if($('#fygg').hasClass('active')){
			var child = fygg.find('.fyggmodel'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/courtAnnounces?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.fyggpreloader').remove();
						loadings = false;
					}else{
						$$('.fyggpreloader').show();
						var str='';
						data.records.forEach(function(v){
							str += `<div class="modeltit fyggmodel">
								<p class="p">
									<span>当事人：${v.litigantName}</span>
${v.announceDate}</span>
								</p>
								<div class="percent50">
									<div class="row no-gutter fygg">
										<div class="col-50">
											<dl>
												<dt>法庭</dt>
												<dd><span>${v.court}</span></dd>
											</dl>
										</div>
										<div class="col-50">
											<dl>
												<dt>公告种类</dt>
												<dd>${v.announceType}</dd>
											</dl>
										</div>
									</div>
									<div class="modeltit">
										<p class="p">
											<span>公告内容</span>
										</p>
										<div>${v.content}</div>
									</div>
								</div>
							</div>`;
						})
						$('.fyggwrap').append(str)
						loadings=false;
					}
				}
			})
		}else if($('#pjws').hasClass('active')){
			var child = pjws.find('.percent50'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/verdicts?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.pjwspreloader').remove();
						loadings = false;
						return;
					}
					$$('.pjwspreloader').show();
					var str='';
					data.records.forEach(function(v){
						str += `<div class="percent50">
			    					<div class="modeltit">
			    						<p class="p">
			    							<span>企业角色：${v.role}</span>
			    							<span>判决时间：${v.verdictDate}</span>
			    						</p>
					    				<div class="row no-gutter sxxx">
						    				<div class="col-50">
						    					<dl>
						    						<dt>法庭</dt>
						    						<dd><span>${v.court}</span></dd>
						    					</dl>
						    				</div>
						    				<div class="col-50">
						    					<dl>
						    						<dt>判决文书编号</dt>
						    						<dd>${v.verdictCode}</dd>
						    					</dl>
						    				</div>
					    				</div>
			    					</div>
			    					<div class="modeltit">
			    						<p class="p">
			    							<span>裁判文书名称</span>
			    						</p>
					    				<div>
					    					<a href='#'>${v.verdictTitle}</a>
					    				</div>
			    					</div>
			    				</div>`;
					})
					$('.pjwswrap').append(str);
					loadings=false;
				}
			})
		}else if($('#jyyc').hasClass('active')){
			var child = jyyc.find('.jyycmodel'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/abnormalOps?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.jyycpreloader').remove();
						loadings = false
					}else{
						$$('.jyycpreloader').show();
						var str='';
						data.records.forEach(function(v){
							str += `<div class="modeltit jyycmodel">
		    						<p class="p">
		    							<span>录入异常日期：${v.InputDate}</span>
		    							<span>移除异常日期：${v.removeDate}</span>
		    						</p>
				    				<div class="row no-gutter sxxx">
					    				<div class="col-50">
					    					<dl>
					    						<dt>经营异常原因</dt>
					    						<dd>${v.inputReason}</dd>
					    					</dl>
					    				</div>
					    				<div class="col-50">
					    					<dl>
					    						<dt>做出录入决定机关</dt>
					    						<dd>${v.inputOrgan}</dd>
					    					</dl>
					    				</div>
				    				</div>
				    				<div class="row no-gutter sxxx mt3">
				    					<div class="col-50">
					    					<dl>
					    						<dt>移除异常原因</dt>
					   						<dd>${v.removeReason}</dd>
					    					</dl>
					    				</div>
					    				<div class="col-50">
					    					<dl>
					    						<dt>做出移除决定机关</dt>
					    						<dd>${v.removeOrgan}</dd>
					    					</dl>
					    				</div>
				    				</div>
		    					</div>`;
						})
						$('.jyycwrap').append(str);
						loadings = false;
					}
				}
			})
		}else if($('#gljgdetailjbxx').hasClass('active')){
			var child = jgxx.find('.jgxxmodel'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/changeRecords?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.jgxxpreloader').remove();
						loadings = false;
					}else{
						$$('.jgxxpreloader').show();
						var str='';
						setTimeout(function(){
							 data.records.forEach(function(v){
							 	str += `<div class="modeltit jgxxmodel">
			    				<p class="p">
			    					<span>变更项目：${v.projectName}</span>
			    					<span>变更日期：${v.changeDate}</span>
			    				</p>
			    				<div class='row no-gutter alignleft'>
				    				<dl>
				    					<dd><span>变更前：</span><br><font>${v.beforeContent}</font></dd>
				    					<dd><span>变更后：</span><br><font>${v.afterContent}</font></dd>
				    				</dl>
			    				</div>
		    				</div>`;
							 })
							 $('.jgxxwrap').append(str);
							 loadings = false;
						},1000)
					}
				}
			})
		}else if($('#xwyq').hasClass('active')){
			var child = xwyq.find('.newsmodel'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/companyNews?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.xwyqpreloader').remove();
						loadings = false;
					}else{
						$('.xwyqpreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div class="row no-gutter newsmodel">
			    						<div class="col-25">
			    							<div class="photo"><img src="${v.newsPic}" /></div>
			    						</div>
			    						<div class="col-75">
			    							<dl>
			    								<dt><a href="${v.newsUrl}">${v.title}</a></dt>
			    								<dd class="content"><a href="${v.newsUrl}">${v.newsDigest}</a></dd>
			    								<dd class="last">
			    									<span>${v.sourse}</span>
			    									<font>${v.newsDate}</font>
			    								</dd>
			    							</dl>
			    						</div>
			    					</div>`;
							})
							$('.xwyqwrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}else if($('#xzcf').hasClass('active')){
			var child = xzcf.find('.modeltit'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/admPenals?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.xzcfpreloader').remove();
						loadings = false;
					}else{
						$('.xzcfpreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div class="modeltit">
		    						<p class="p">
		    							<span>处罚日期：${v.penalDate}</span>
		    						</p>
				    				<div class="row no-gutter sxxx">
					    				<div class="col-50">
					    					<dl>
					    						<dt>处罚原因</dt>
					    						<dd>${v.penalReason}</dd>
					    					</dl>
					    				</div>
					    				<div class="col-50">
					    					<dl>
					    						<dt>处罚决定</dt>
					    						<dd>${v.penalOrgan}</dd>
					    					</dl>
					    				</div>
				    				</div>
		    					</div>`;
							})
							$('.xzcfwrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}else if($('#gqjg').hasClass('active')){
			var child = gqjg.find('.modeltit'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/equityStructure?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.gqjgpreloader').remove();
						loadings = false;
					}else{
						$('.gqjgpreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div class="modeltit">
			    					<p><a href="#">${v.stockholder}</a></p>
				    				<div class="row no-gutter gqjg">
					    				<div class="col-33">
					    					<dl>
					    						<dt>持股比例</dt>
					    						<dd>${v.shareholdRatio}%</dd>
					    					</dl>
					    				</div>
					    				<div class="col-33">
					    					<dl>
					    						<dt>认缴出资额</dt>
					    						<dd>${v.subscribeAsset}</dd>
					    					</dl>
					    				</div>
					    				<div class="col-33">
					    					<dl>
					    						<dt>认缴出资日期</dt>
					    						<dd>${v.subscribeDate}</dd>
					    					</dl>
					    				</div>
				    				</div>
			    				</div>`;
							})
							$('.gqjgwrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}else if($('#ysgx').hasClass('active')){
			var child = ysgx.find('.modeltit'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/probableRelation?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.ysgxpreloader').remove();
						loadings = false;
					}else{
						$('.ysgxpreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div class="modeltit">
		    						<p class="p">
		    							<span><a href="#">${v.name}</a></span>
											<span>公司</span>
		    						</p>
				    				<div class="ysgx">
				    					<dl class="row no-gutter">
				    						<dt class="col-30"><span>投资公司</span></dt>
				    						<dd class="col-70">${v.relationType}</dd>
				    					</dl>
				    					<dl class="row no-gutter">
				    						<dt class="col-30"><span>被投资公司</span></dt>
				    						<dd class="col-70">${v.companyRole}</dd>
				    					</dl>
				    					<dl class="row no-gutter">
				    						<dt class="col-30"><span>关系</span></dt>
				    						<dd class="col-70">${v.relationCompanyRole}</dd>
				    					</dl>
				    				</div>
		    					</div>`;
							})
							$('.ysgxwrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}else if($('#dwtz').hasClass('active')){
			var child = dwtz.find('.modeltit'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/investments?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.dwtzpreloader').remove();
						loadings = false;
					}else{
						$('.dwtzpreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div class="modeltit">
		    						<p><a href="#">${v.investCompany}</a></p>
				    				<div class="row no-gutter dwtz">
					    				<div class="col-50">
					    					<dl>
					    						<dt>注册资本</dt>
					    						<dd>${v.registCapital}</dd>
					    					</dl>
					    				</div>
					    				<div class="col-50">
					    					<dl>
					    						<dt>企业状态</dt>
					    						<dd>${v.state}</dd>
					    					</dl>
					    				</div>
					    				<div class="col-50">
					    					<dl>
					    						<dt>出资比例</dt>
					    						<dd>${v.ratio}</dd>
					    					</dl>
					    				</div>
					    				<div class="col-50">
					    					<dl>
					    						<dt>成立日期</dt>
					    						<dd>${v.establishDate}</dd>
					    					</dl>
					    				</div>
				    				</div>
		    					</div>`;
							})
							$('.dwtzwrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}else if($('#dcdy').hasClass('active')){
			var child = dcdy.find('.dcdymodel'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/chattelMortgages?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.dcdypreloader').remove();
						loadings = false;
					}else{
						$('.dcdypreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div class="modeltit dcdymodel">
		    						<p class="p">
		    							<span>登记编号：${v.registNo}</span>
		    						</p>
				    				<div class="row no-gutter sxxx">
					    				<div class="col-50">
					    					<dl>
					    						<dt>登记日期</dt>
					    						<dd><span>${v.registDate}</span></dd>
					    					</dl>
					    				</div>
					    				<div class="col-50">
					    					<dl>
					    						<dt>登记机关</dt>
					    						<dd>${v.registOrgan}</dd>
					    					</dl>
					    				</div>
				    				</div>
				    				<div class="row no-gutter sxxx" style="margin-top:10px;">
					    				<div class="col-50">
					    					<dl>
					    						<dt>动产名称</dt>
					    						<dd><span>${v.chattelName}</span></dd>
					    					</dl>
					    				</div>
					    				<div class="col-50">
					    					<dl>
					    						<dt>抵押数额</dt>
					    						<dd>${v.chattelAmount}</dd>
					    					</dl>
					    				</div>
				    				</div>
		    					</div>`;
							})
							$('.dcdywrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}else if($('#sxxx').hasClass('active')){
			var child = sxxx.find('.modeltit'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/dishonests?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.sxxxpreloader').remove();
						loadings = false;
					}else{
						$('.sxxxpreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div>
			    					<div class="modeltit">
			    						<p class="p">
			    							<span>被执行人名称：${v.dishonesterName}</span>
			    							<span>执行时间：${v.executeDate}</span>
			    						</p>
					    				<div class="row no-gutter sxxx">
						    				<div class="col-33">
						    					<dl>
						    						<dt>被执行人证件号</dt>
						    						<dd>${v.dishonesterCode}</dd>
						    					</dl>
						    				</div>
						    				<div class="col-33">
						    					<dl>
						    						<dt>立案时间</dt>
						    						<dd>${v.caseDate}</dd>
						    					</dl>
						    				</div>
						    				<div class="col-33">
						    					<dl>
						    						<dt>案号</dt>
						    						<dd>${v.caseCode}</dd>
						    					</dl>
						    				</div>
					    				</div>
					    				<div class="row no-gutter sxxx mt5">
					    					<div class="col-33">
						    					<dl>
						    						<dt>执行法院</dt>
						    						<dd>${v.executeCourt}</dd>
						    					</dl>
						    				</div>
						    				<div class="col-33">
						    					<dl>
						    						<dt>履行情况</dt>
						    						<dd>${v.fulfilStatus}</dd>
						    					</dl>
						    				</div>
						    				<div class="col-33">
						    					<dl>
						    						<dt>更新时间</dt>
						    						<dd>${v.update}</dd>
						    					</dl>
						    				</div>
					    				</div>
			    					</div>
			    					<div class="modeltit">
			    						<p class="p">
			    							<span>生效法律文书确定的义务</span>
			    						</p>
					    				<div>
					    					${v.caseDuty}
					    				</div>
			    					</div>
		    					</div>`;
							})
							$('.sxxxwrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}else if($('#zpxx').hasClass('active')){
			var child = zpxx.find('.modeltit'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/recruitments?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.zpxxpreloader').remove();
						loadings = false;
					}else{
						$('.zpxxpreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div class="modeltit">
			    						<p class="p">
			    							<span>${v.position}</span>
			    							<span>${v.sourse}　${v.recruitDate}</span>
			    						</p>
					    				<div class="zpxx">
						    				<div>${v.dutyDesc}</div>
						    				<div>学历要求：${v.degree}；经验要求：${v.experience}；薪资水平：${v.pay}</div>
					    				</div>
		    						</div>`;
							})
							$('.zpxxwrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}else if($('#jjcp').hasClass('active')){
			var child = jjcp.find('.fundlist'),
			len = Math.ceil((child.length)/5)+1;
			fetchApiDate({
				url:`${bu}/api/v1/company/funds?companyId=${id}&size=5&page=${len}`,
				done:function(data){
					if(!data.records.length){
						$$('.jjcppreloader').remove();
						loadings = false;
					}else{
						$('.jjcppreloader').show();
						var str = ''
						setTimeout(function(){
							data.records.forEach(function(v){
								str += `<div class="fundlist">
									<a href="#" onclick="loadPage3('${v.fundId}',1)">
										<div class='row no-gutter'>
											<div class="col-40 lefts">
												<h4>${v.fundName}</h4>
												<p>${v.fundCode}</p>
											</div>
											<div class="col-60 rights">
												<div class="row time">
													<div class="col-40">成立时间</div>
													<div class="col-60">${v.inceptionDate}</div>
												</div>
												<div class="row place">
													<div class="col-40">管理机构</div>
													<div class="col-60">${v.mngOrg}</div>
												</div>
											</div>
										</div>
									</a>
								</div>`;
							})
							$('.jjcpwrap').append(str);
							loadings = false;
						},1000)
					}
				}
			})
		}
	})
	
})
myApp.onPageInit('ynrsdetail',function(e){
	var view = myApp.getCurrentView().selector
	if(view == '.another-view'){
		$('.gxhview').addClass('gxhview2');
	}
	var id=e.query.fundId;
	fundFavorUsual();
	detailFavor(id)
	afn();

	var opt={
		calculable: false,
		tooltip: {
	        trigger: 'item',
	        formatter: "{b} : {c} ({d}%)"
	    },

		series: [{
			type: 'pie',
			radius:['0%','65%'],
			center: ['50%', '50%'],
			labelLine:{
                normal:{
                    length:1
                }
            },
			data: [
				{value:10,name:'上饶市'},
				{value:40,name:'黄石市'},
				{value:50,name:'其他'},
			]
		}]
	}

	var barChart=echarts.init(document.getElementById('companypie'),'dark');
	barChart.resize();
	barChart.setOption(opt);
})




myApp.init();
