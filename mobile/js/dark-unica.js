/*
 Highcharts JS v6.0.5 (2018-01-31)

 (c) 2009-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a) {
	"object" === typeof module && module.exports ? module.exports = a : a(Highcharts)
})(function(a) {
	a.createElement("link", {
		href: "https://fonts.googleapis.com/css?family\x3dUnica+One",
		rel: "stylesheet",
		type: "text/css"
	}, null, document.getElementsByTagName("head")[0]);
	a.theme = {
		colors: "#0099BF #F67E7F #f45b5b #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(" "),
		chart: {
			backgroundColor: {
				linearGradient: {
					x1: 0,
					y1: 0,
					x2: 1,
					y2: 1
				},
				stops: [
					[0, "#051B26"],
					[1, "#051B26"]
				]
			},
			style: {
				fontFamily: "Microsoft YaHei,sans-serif"
			},
			plotBorderColor: "#606063"
		},
		title: {
			style: {
				color: "#E0E0E3",
				textTransform: "uppercase",
				fontSize: "16px"
			}
		},
		subtitle: {
			style: {
				color: "#E0E0E3",
				textTransform: "uppercase"
			}
		},
		xAxis: {
			gridLineColor: "#132F3D",
			labels: {
				style: {
					color: "#E0E0E3",
					fontSize:'12px'
				},
				step:2
			},
			lineColor: "#385261",
			minorGridLineColor: "#505053",
			tickColor: "#132F3D",
			title: {
				style: {
					color: "#A0A0A3",

				}
			},
            crosshair: true
		},
		yAxis: {
			gridLineColor: "#132F3D",
			labels: {
				style: {
					color: "#E0E0E3"
				}
			},
			lineColor: "#385261",
			minorGridLineColor: "#505053",
			tickColor: "#132F3D",
			tickWidth: 1,
			title: {
				style: {
					color: "#A0A0A3"
				}
			}
		},
		tooltip: {
			backgroundColor: "rgba(37, 45, 48, 0.6)",
            borderColor:'none',
			style: {
				color: "#F0F0F0",
                fontSize:14,
                lineHeight:22
			},
            //shared:true,
		},

		plotOptions: {
			series: {
				dataLabels: {
					color: "#B0B0B3"
				},
				marker: {
					lineColor: "#333"
				},
				borderColor:'none'
			},
			boxplot: {
				fillColor: "#505053"
			},
			candlestick: {
				lineColor: "white"
			},
			errorbar: {
				color: "white"
			}
		},
		legend: {
			itemStyle: {
				color: "#E0E0E3"
			},
			itemHoverStyle: {
				color: "#FFF"
			},
			itemHiddenStyle: {
				color: "#606063"
			}
		},
		credits: {
			style: {
				color: "#666"
			}
		},
		labels: {
			style: {
				color: "#132F3D"
			}
		},
		drilldown: {
			activeAxisLabelStyle: {
				color: "#F0F0F3"
			},
			activeDataLabelStyle: {
				color: "#F0F0F3"
			}
		},
		navigation: {
			buttonOptions: {
				symbolStroke: "#DDDDDD",
				theme: {
					fill: "#505053"
				}
			}
		},
		rangeSelector: {
			buttonTheme: {
				fill: "#505053",
				stroke: "#000000",
				style: {
					color: "#CCC"
				},
				states: {
					hover: {
						fill: "#132F3D",
						stroke: "#000000",
						style: {
							color: "white"
						}
					},
					select: {
						fill: "#000003",
						stroke: "#000000",
						style: {
							color: "white"
						}
					}
				}
			},
			inputBoxBorderColor: "#505053",
			inputStyle: {
				backgroundColor: "#333",
				color: "silver"
			},
			labelStyle: {
				color: "silver"
			}
		},
		navigator: {
			handles: {
				backgroundColor: "#666",
				borderColor: "#AAA"
			},
			outlineColor: "#CCC",
			maskFill: "rgba(255,255,255,0.1)",
			series: {
				color: "#7798BF",
				lineColor: "#A6C7ED"
			},
			xAxis: {
				gridLineColor: "#505053"
			}
		},
		scrollbar: {
			barBackgroundColor: "#808083",
			barBorderColor: "#808083",
			buttonArrowColor: "#CCC",
			buttonBackgroundColor: "#606063",
			buttonBorderColor: "#606063",
			rifleColor: "#FFF",
			trackBackgroundColor: "#404043",
			trackBorderColor: "#404043"
		},
		legendBackgroundColor: "rgba(0, 0, 0, 0.5)",
		background2: "#505053",
		dataLabelsColor: "#B0B0B3",
		textColor: "#C0C0C0",
		contrastTextColor: "#F0F0F3",
		maskColor: "rgba(255,255,255,0.3)"
	};
	a.setOptions(a.theme)
});
