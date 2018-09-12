//地区分析数量规模
var ar=[{
       			title:'基金数量增长图',
       			favor:false,
       			no:0,
       			name:'dqfxslgm',
       			opt:{
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        data:[],
				        top:15
				    },
				    grid: {
				        left: '3%',
				        right: '3%',
				        bottom: '10',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : []
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    color:['#F67E80','#7BDCF9','#0197BF','#FFB001'],
				    series : []
				}
       		},{
       			title:'数量占比图',
       			favor:false,
       			no:1,
       			name:'dqfxslgm',
       			opt:{
					calculable: false,
					tooltip: {
				        trigger: 'item',
				        formatter: "{b} : {c} ({d}%)"
				    },
					series: [{
						type: 'pie',
						radius:['40%','65%'],
						center: ['50%', '50%'],
						data: []
					}]
				}
       		},{
       			title:'规模占比图',
       			no:2,
       			favor:false,
       			name:'dqfxslgm',
       			opt:{
					calculable: false,
					tooltip: {
				        trigger: 'item',
				        formatter: "{b} : {c} ({d}%)"
				    },
					series: [{
						type: 'pie',
						radius:['40%','65%'],
						center: ['50%', '55%'],
						data: []
					}]
					}
       		},{
       			title:'实际运行期分布',
       			favor:false,
       			no:4,
       			name:'dqfxslgm',
       			opt:{
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        data: [],
				        top:15
				    },
				    grid: {
				        left: '0%',
				        right: '3%',
				        bottom: 10,
				        containLabel: true
				    },
				    xAxis:{
				        type: 'value'
				    },
				    yAxis: {
				        type: 'category',
				        data:[]
				    },
				    series: []
				}
       		},{
       			title:'基金平均规模',
       			no:6,
       			name:'dqfxslgm',
       			opt:{
				    legend: {
				        data: [],
				        top:5
				    },
				    grid:{
				    	left:'20%',
				    	bottom:'10%'
				    },
				    color:['#7BDBF8','#0098BF','#F67E7F','#FFB000'],
				    tooltip: {
				        padding: 10,
				        backgroundColor: '#222',
				        borderColor: '#777',
				        borderWidth: 1,
				        formatter: function (obj) {
				            
				        }
				    },
				    xAxis: {
				    	name: '数量',
				    	nameGap:-15,
				        splitLine: {
				            lineStyle: {
				                type: 'dashed'
				            }
				        }
				    },
				    yAxis: {
				    	name: '规模(千万元)',
				    	axisLabel: {
	                        formatter: function (value, index) {
	                            return value / 1000;
	                        }
	                   	},
				        splitLine: {
				            lineStyle: {
				                type: 'dashed'
				            }
				        },
				        scale: true
				    },
				    series: []
				}
       		}]
//地区分析相关机构
var ar2=[{
       			title:'管理人、托管人数量增长图',
       			name:'dqfxxgjg',
       			no:7,
       			favor:false,
       			opt:{
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    legend: {
				        data:[],
				        top:10
				    },
				    color:['#0098BF','#F67E7F'],
				    grid:{
				    	bottom:'10%',
				    	top:'15%'
				    },
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: []
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}'
				        }
				    },
				    series: []
				}
       		},{
       			title:'管理人类型占比',
       			no:8,
       			name:'dqfxxgjg',
       			favor:false,
       			opt:{
					calculable: false,
					tooltip: {
				        trigger: 'item',
				        formatter: "{b} : {c} ({d}%)"
				    },
					series: [{
						type: 'pie',
						radius:['40%','65%'],
						center: ['50%', '50%'],
						data: []
					}]
				}
       		}]
//地区分析证券私募
var ar3=[{
	title:'基金平均收益率变化图',
	name:'dqfxyjfx',
	no:9,
	favor:false,
	opt:{
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        data:[],
	        top:15
	    },
	     grid: {
	        bottom: '10%',
	    },
	    xAxis:  {
	        type: 'category',
	        boundaryGap: false,
	        data: []
	    },
	    yAxis: {
	        type: 'value',
	        axisLabel: {
	            formatter: '{value}'
	        }
	    },
	    color:['#0098BF','#F67E7F','#FFB000'],
	    series: []
	}
},{
	title:'地域收益率离散性',
	no:10,
	name:'dqfxyjfx',
	favor:false,
	opt:{
	    tooltip: {
	        trigger: 'item',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    grid: {
	        left: '10%',
	        right: '5%',
	        bottom: '10%',
	        top:'5%'
	    },
	    xAxis: {
	        type: 'category',
	        data:null,
	        boundaryGap: true,
	        nameGap: 30,
	        splitArea: {
	            show: false
	        },
	        axisLabel: {
	            formatter: ''
	        },
	        splitLine: {
	            show: false
	        }
	    },
	    yAxis: {
	        type: 'value',
	        splitArea: {
	            show: true
	        }
	    },
	    series: [
	        {
	            name: 'boxplot',
	            type: 'boxplot',
	            data:null,
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
	        },
	        {
	            name: 'outlier',
	            type: 'scatter',
	            data:null
	        }
	    ]
	}
},{
	title:'最大回撤率',
	no:12,
	name:'dqfxyjfx',
	opt:{
	    tooltip: {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:[],
	        top:15
	    },
	      grid: {
		        bottom: '10%',
		    },
	    xAxis:  {
	        type: 'category',
	        boundaryGap: false,
	        data: []
	    },
	    yAxis: {
	        type: 'value',
	        axisLabel: {
	            formatter: '{value}'
	        }
	    },
	    series: []
	}
},{
	title:'收益分布',
	no:13,
	name:'dqfxyjfx',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        top:'3%',
	        containLabel: true
	    },
	    xAxis:  {
	        type: 'value'
	    },
	    yAxis: {
	        type: 'category',
	        data: []
	    },
	    series: []
	}
},{
		title:'夏普比率',
		no:14,
		name:'dqfxyjfx',
		opt:{
		    series: [
		        {
		            name: '业务指标',
		            type: 'gauge',
		            detail: {formatter:'{value}'},
		            axisLine: {            // 坐标轴线
	                    lineStyle: {       // 属性lineStyle控制线条样式
	                        color: [[0.2,'#7CDBF9'], [0.8,'#0098BF'], [1,'#F24F50']]
	                    }
	                },
		            data: [{value: 50, name: '完成率'}]
		        }
		    ]
		}
	},{
		title:'beta系数',
		no:15,
		name:'dqfxyjfx',
		opt:{
		    series: [
		        {
		            name: '业务指标',
		            type: 'gauge',
		            detail: {formatter:'{value}'},
		            data: [{value: 50, name: '完成率'}]
		        }
		    ]
		}
	}]
//地区分析私募股权页面
var ar4=[{
	title:'全部基金数量和股权类基金变化',
	no:16,
	name:'dqfxsmgq',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:[],
	        top:15
	    },
	   	grid:{
	   		left:'15%',
	   		right:'5%',
	   		bottom:'10%'
	   	},
	   	color:['#0098BF','#F67E7F'],
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : []
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : []
	}
},{
	title:'法律形式数量变化',
	no:17,
	name:'dqfxsmgq',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:[],
	        top:15
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : []
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : []
	}
},{
	title:'法律形式占比',
	no:18,
	name:'dqfxsmgq',
	opt:{
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    series : [
	        {
	            name: '',
	            type: 'pie',
	            radius : ['40%','65%'],
            	center: ['50%', '50%'],
	            data:[],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	}
},{
	title:'基金风险等级分布图',
	name:'dqfxsmgq',
	no:19,
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        top:'5%',
	        containLabel: true
	    },
	    xAxis:  {
	        type: 'value'
	    },
	    color:['#FFB000'],
	    yAxis: {
	        type: 'category',
	        data: []
	    },
	    series: []
	}
},{
	title:'基金收益等级分布图',
	name:'dqfxsmgq',
	no:20,
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        top:'5%',
	        containLabel: true
	    },
	    xAxis:  {
	        type: 'value'
	    },
	    yAxis: {
	        type: 'category',
	        data: []
	    },
	    color:['#0098BF'],
	    series: []
	}
},{
	title:'基金风格等级分布图',
	no:21,
	name:'dqfxsmgq',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        top:'5%',
	        containLabel: true
	    },
	    xAxis:  {
	        type: 'value'
	    },
	    yAxis: {
	        type: 'category',
	        data: []
	    },
	    color:['#F67E7F'],
	    series: []
	}
}]
//策略分析数量规模数据
	var clfxslgmar=[{
		title:'基金总数和证券类基金数量变化',
		favor:false,
		no:0,
		name:'clfxslgm',
		opt:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:[],
		        top:15
		    },
		    color:['#0098BF','#F67E7F'],
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : []
		}
	},{
		title:'实际运行期分布',
		no:1,
		favor:false,
		name:'clfxslgm',
		opt:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data: [],
		        top:15
		    },
		    grid: {
		        left: '0%',
		        right: '3%',
		        bottom: '2%',
		        containLabel: true
		    },
		    xAxis:  {
		        type: 'value'
		    },
		    yAxis: {
		        type: 'category',
		        data:[]
		    },
		    series: []
		}
	}]
	var clfxxgjgar=[{
		title:'排名前十的托管人数量及地域分类',
		no:2,
		favor:false,
		name:'clfxxgjg',
		opt:{
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        y: 'left',
		        x: 'left',
		        data:[]
		    },
		    series: [
		        {
		            name:'',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '30%'],
					center:['50%','62%'],
		            label: {
		                normal: {
		                    position: 'inner'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            color:['#00BB37','#E78E47','#7469EE'],
		            data:[]
		        },
		        {
		            name:'',
		            type:'pie',
		            radius: ['40%', '55%'],
		            center:['50%','62%'],
		            data:[]
		        }
		    ]
		}
	},{
		title:'排名前十的管理人数量及地域分类',
		favor:false,
		no:3,
		name:'clfxxgjg',
		opt:{
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        y: 'left',
		        x: 'left',
		        data:[]
		    },
		    series: [
		        {
		            name:'',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '30%'],
		            label: {
		                normal: {
		                    position: 'inner'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            center:['50%','62%'],
		            color:['#00BB37','#E78E47','#7469EE'],
		            data:[]
		        },
		        {
		            name:'',
		            type:'pie',
		            radius: ['40%', '55%'],
		            center:['50%','62%'],
		           
		            data:[]
		        }
		    ]
		}
	}]
	
	//策略分析收益分析数据
	var clfxsyfxar=[{
		title:'平均收益率变化图',
		favor:false,
		no:4,
		name:'clfxsyfx',
		opt:{
		    tooltip: {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:[],
		        top:15
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: []
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value}'
		        }
		    },
		     grid: {
		        left: '5%',
		        right: '3%',
		        bottom: '3%',
		        containLabel: true
		    },
		    series: []
		}
	},{
		title:'最佳最差月度回报',
		no:5,
		favor:false,
		name:'clfxsyfx',
		opt:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:[],
		        top:15
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    color:['#F67E7F','#0098BF'],
		    series : []
		}
	},{
		title:'正收益率占比',
		no:6,
		name:'clfxsyfx',
		opt:{
			legend:{
				data:['dddd'],
				top:15
			},
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'',
		            type:'bar',
		            barWidth: '60%',
		            data:[]
		        }
		    ]
		}
	},{
		title:'收益分布',
		no:7,
		name:'clfxsyfx',
		opt:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data: [],
		        top:7
		    },
		    grid: {
		        left: '0%',
		        right: '3%',
		        bottom: '0%',
		        containLabel: true
		    },
		    xAxis:  {
		        type: 'value'
		    },
		    yAxis: {
		        type: 'category',
		        data:[]
		    },
		    series: []
		}
	}]
	var clfxfxfxar=[{
		title:'投资品种占比饼状图',
		no:8,
		name:'clfxfxfx',
		opt:{
			calculable: true,
			tooltip: {
		        trigger: 'item',
		        formatter: "{b} : {c} ({d}%)"
		    },
			series: [{
				type: 'pie',
				radius:['40%','65%'],
				center: ['50%', '50%'],
				data: []
			}]
		}
	},{
		title:'风险总结',
		no:9,
		name:'clfxfxfx',
		opt:{
			tooltip : {
	            trigger: 'axis',
	            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	            }
	        },
		    legend: {
	            data:[],
	            top:15
	        },
	        grid: {
	            left: '3%',
	            right: '4%',
	            bottom: '3%',
	            containLabel: true
	        },
	        xAxis : [
	            {
	                type : 'category',
	                data : []
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value'
	            }
	        ],
	        series:[]
		}
	},{
		title:'策略风险分析',
		no:10,
		name:'clfxfxfx',
		opt:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
	            data: [],
	            top:15
	        },
        radar: {
            shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#06202D',
                    borderRadius: 3,
                    padding:0
                }
            },
            radius:'60%',
            center:['50%','60%'],
            splitArea: {
                areaStyle: {
                    color: ['#08202C'],
                    // shadowColor: 'rgba(0, 0, 0, 0.3)',
                    //shadowBlur: 10
                }
            },
            splitLine : {
                show : true,
                lineStyle : {
                    width : 1,
                    color : '#153A4D' // 图表背景网格线的颜色
                }
            },
            indicator: []
        },
        series: [{
            name: '行业因子风险分析',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : []
        }]
		}
	},{
		title:'beta系数',
		no:11,
		name:'clfxfxfx',
		opt:{
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series: []
		}
	},{
		title:'夏普比率',
		no:12,
		name:'clfxfxfx',
		opt:{
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series: []
		}
	}]
	
	var jgfxglrbdar=[{
		title:'收益率最优管理人榜单',
		name:'jgfxglrbd',
		opt:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:[],
		        top:15
		    },
		   	grid:{
		   		left:'15%',
		   		right:'5%',
		   		bottom:'10%'
		   	},
		   	color:['#0098BF','#F67E7F'],
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : []
		}
	}]
	
	var jgfxslgmar=[{
		title:'地区管理人数量',
		chart:'hchart',
		name:'jgfxslgm',
		opt:{
	        chart: {
	            type: 'bar',
	           // useHTML:true,
	           // floating:true,
	            height:'65%',
	            marginTop:5,
	            style:{
	
	            }
	        },
	        legend:{
	          //enabled:true
	            y:20,
	            floating: true,
	            useHTML:true,
	            style:{
	
	            }
	        },
	        reversed:true,
	        grid:{
	
	        },
	        title: {
	            text: '',
	            align:'left',
	            //floating:true,
	            useHTML:false,
	            
	        },
	        xAxis: [],
            yAxis: {},
	        plotOptions: {
	            series: {
	                stacking: 'normal',
	                pointHeight:'20px',
	            }
	        },
	        tooltip: {
	            formatter: function () {
	                return '<p><b>' + this.point.category + '</b><br/>' +
	                    '管理人数量: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0)+'</p>';
	            },
	            //useHTML:true,
	            style:{
	
	            }
	        },
	        credits: {
	            enabled:false
	        },
	        series: []
	    }
	},{
		title:'管理人规模分布图',
		name:'jgfxslgm',
		opt:{
	        tooltip : {
	            trigger: 'axis',
	            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	            }
	        },
	        legend: {
	            data:[],
	            top:15
	        },
	        grid: {
	            left: '3%',
	            right: '4%',
	            bottom: '3%',
	            top:'22%',
	            containLabel: true
	        },
	        xAxis : [
	            {
	                type : 'category',
	                data : []
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value'
	            }
	        ]
	    }
	}]
	var jgfxdqfxar=[{
		title:'上海及上海部分地区管理人数量统计',
		name:'jgfxdqfx',
		opt:{
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    legend: {
		        data: [],
		        top:15
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value'
		    },
		    yAxis: {
		        type: 'category',
		        data: []
		    },
		    color:['#0197BF','#F67E80','#7BDCF9','#FFB001'],
		    series: []
		}
	},{
		title:'管理人平均收益分布图',
		name:'jgfxdqfx',
		opt:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data: [],
		        top:15
		    },
		    grid: {
		        left: '0%',
		        right: '3%',
		        bottom: 10,
		        containLabel: true
		    },
		    xAxis:{
		        type: 'value'
		    },
		    yAxis: {
		        type: 'category',
		        data:[]
		    },
		    color:['#0197BF','#F67E80','#7BDCF9','#FFB001'],
		    series: []
		}
	},{
		title:'管理人管理基金数量分布图',
		name:'jgfxdqfx',
		opt:{
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data: [],
		        top:15
		    },
		    grid: {
		        left: '0%',
		        right: '3%',
		        bottom: 10,
		        containLabel: true
		    },
		    xAxis:{
		        type: 'value'
		    },
		    yAxis: {
		        type: 'category',
		        data:[]
		    },
		    color:['#0197BF','#F67E80','#7BDCF9','#FFB001'],
		    series: []
		}
	},{
		title:'非本地区注册管理人注册地区及数量统计',
		name:'jgfxdqfx',
		opt:{
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        top:'10%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'管理人数量',
		            type:'bar',
		            barWidth: '60%',
		            data:[]
		        }
		    ]
		}
	},{
		title:'非本地区注册管理人注册地区占比',
		name:'jgfxdqfx',
		opt:{
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    grid:{
		    	top:'0',
		    	bottom:'10%'
		    },
		    legend: {
		        y: 'left',
		        x: 'left',
		        data:[]
		    },
		    series: [
		        {
		            name:'',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '30%'],
					center:['50%','30%'],
		            label: {
		                normal: {
		                    position: 'inner'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            color:['#00BB37','#E78E47','#7469EE'],
		            data:[]
		        },
		        {
		            name:'',
		            type:'pie',
		            radius: ['40%', '55%'],
		            center:['50%','30%'],
		            data:[]
		        }
		    ]
		}
	}]
	var jgfxyctjar=[{
		title:'异常管理人统计',
		name:'jgfxyctj',
		opt:{
			calculable: false,
			color:['#0098BF','#F67E7F'],
			tooltip: {
		        trigger: 'item',
		        formatter: "{b} : {c} ({d}%)"
		    },
			series: [{
				type: 'pie',
				radius:['40%','65%'],
				center: ['50%', '50%'],
				data: []
			}]
		}
	},{
		title:'异常机构占比统计',
		name:'jgfxyctj',
		opt:{
			color:['#0098BF','#F67E7F'],
	        tooltip : {
	            trigger: 'axis',
	            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	            }
	        },
	        legend: {
	            data:[],
	            top:15
	        },
	        grid: {
	            left: '3%',
	            right: '4%',
	            bottom: '3%',
	            top:'22%',
	            containLabel: true
	        },
	        xAxis : [
	            {
	                type : 'category',
	                data : []
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value'
	            }
	        ]
	    }
	}]
var yjfxar=[{
	title:'基金回报',
	name:'yjfx',
	opt:{
	    xAxis: {
	        type: 'category',
	        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid:{
	    	top:'5%'
	    },
	    yAxis: {
	        type: 'value'
	    },
	    tooltip : {
	        trigger: 'axis',
	        
	    },
	    series: [{
	        data: [820, 932, 901, 934, 1290, 1330, 1320],
	        type: 'line'
	    }]
	}
},{
	title:'基金回撤',
	name:'yjfx',
	opt:{
	    xAxis: {
	        type: 'category',
	        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    yAxis: {
	        type: 'value'
	    },
	    tooltip : {
	        trigger: 'axis',
	        
	    },
	    series: [{
	        data: [820, 932, 901, 934, 1290, 1330, 1320],
	        type: 'line'
	    }]
	}
},{
	title:'年化标准差',
	name:'yjfx',
	opt:{
		tooltip : {
        	trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    xAxis: {
	        type: 'category',
	        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	    },
	    yAxis: {
	        type: 'value'
	    },
	    tooltip : {
	        trigger: 'axis',
	        
	    },
	    series: [{
	        data: [820, 932, 901, 934, 1290, 1330, 1320],
	        type: 'line'
	    }]
	}
}]

var jzfxar=[{
	title:'回归分析',
	name:'jzfx',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:[],
	        top:15
	    },
	    grid: {
	        left: '3%',
	        right: '3%',
	        bottom: '10',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : []
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    color:['#F67E80','#7BDCF9','#0197BF','#FFB001'],
	    series : []
	}
},{
	title:'压力测试',
	name:'jzfx',
	opt:{
		tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
	    legend: {
            data:[],
            top:15
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : []
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series:[]
	}
},{
	title:'风格漂移',
	name:'jzfx',
	opt:{
	    xAxis: {
	        type: 'category',
	        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	    },
	    yAxis: {
	        type: 'value'
	    },
	    tooltip : {
	        trigger: 'axis',
	        
	    },
	    series: [{
	        data: [820, 932, 901, 934, 1290, 1330, 1320],
	        type: 'line'
	    }]
	}
},{
	title:'风格敞口',
	name:'jzfx',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	    
	    },
	    legend: {
	        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['周一','周二','周三','周四','周五','周六','周日']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'邮件营销',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            name:'联盟广告',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            name:'视频广告',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[150, 232, 201, 154, 190, 330, 410]
	        },
	        {
	            name:'直接访问',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[320, 332, 301, 334, 390, 330, 320]
	        },
	        {
	            name:'搜索引擎',
	            type:'line',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            areaStyle: {normal: {}},
	            data:[820, 932, 901, 934, 1290, 1330, 1320]
	        }
	    ]
	}
},{
	title:'行业敞口',
	name:'jzfx',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	    
	    },
	    legend: {
	        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['周一','周二','周三','周四','周五','周六','周日']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'邮件营销',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            name:'联盟广告',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            name:'视频广告',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[150, 232, 201, 154, 190, 330, 410]
	        },
	        {
	            name:'直接访问',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[320, 332, 301, 334, 390, 330, 320]
	        },
	        {
	            name:'搜索引擎',
	            type:'line',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            areaStyle: {normal: {}},
	            data:[820, 932, 901, 934, 1290, 1330, 1320]
	        }
	    ]
	}
}]

var ccfxar=[{
	title:'总风险因子',
	name:'ccfx',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:[],
	        top:15
	    },
	    color:['#0098BF','#F67E7F'],
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : []
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : []
	}
},{
	title:'行业因子风险敞口（Top5)',
	name:'ccfx',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:[],
	        top:15
	    },
	    color:['#0098BF','#F67E7F'],
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : []
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : []
	}
},{
	title:'风格因子风险敞口（Top5)',
	name:'ccfx',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:[],
	        top:15
	    },
	    color:['#0098BF','#F67E7F'],
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : []
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : []
	}
},{
	title:'行业因子风险贡献',
	name:'ccfx',
	opt:{
	    color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'直接访问',
	            type:'bar',
	            barWidth: '60%',
	            data:[10, 52, 200, 334, 390, 330, 220]
	        }
	    ]
	}
},{
	title:'行业因子边际风险贡献',
	name:'ccfx',
	opt:{
	    color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'直接访问',
	            type:'bar',
	            barWidth: '60%',
	            data:[10, 52, 200, 334, 390, 330, 220]
	        }
	    ]
	}
},{
	title:'行业因子风险敞口',
	name:'ccfx',
	opt:{
	    tooltip : {},
	    legend: {
            data: [],
            top:15
        },
	    radar: {
	        shape: 'circle',
	        name: {
	            textStyle: {
	                color: '#fff',
	                backgroundColor: '#06202D',
	                borderRadius: 3,
	                padding:0
	            }
	        },
	        radius:'70%',
	        center:['50%','50%'],
	        splitArea: {
	            areaStyle: {
	                color: ['#08202C'],
	                // shadowColor: 'rgba(0, 0, 0, 0.3)',
	                //shadowBlur: 10
	            }
	        },
	        splitLine : {
	            show : true,
	            lineStyle : {
	                width : 1,
	                color : '#153A4D' // 图表背景网格线的颜色
	            }
	        },
	        indicator: []
	    },
	    series: [{
	        name: '行业因子风险分析',
	        type: 'radar',
	        // areaStyle: {normal: {}},
	        data : []
	    }]
	}
},{
	title:'基金与行业因子的相关性',
	name:'ccfx',
	opt:{
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        top:'5%',
	        containLabel: true
	    },
	    xAxis:  {
	        type: 'value'
	    },
	    color:['#FFB000'],
	    yAxis: {
	        type: 'category',
	        data: []
	    },
	    series: []
	}
}]

var getAllData=function(){
	return [ar,ar2,ar3,ar4,clfxslgmar,clfxxgjgar,clfxsyfxar,clfxfxfxar,jgfxglrbdar,jgfxslgmar,jgfxdqfxar,jgfxyctjar];
}
