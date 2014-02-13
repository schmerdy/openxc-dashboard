$(document).ready(function(){
	
	s1 = [0];

	engine_speed_gauge = $.jqplot('engine_speed',[s1],{
		grid: {
			background: "transparent"
		},
		seriesDefaults: {
			renderer: $.jqplot.MeterGaugeRenderer,
			rendererOptions: {
				label: 'RPM x 1000',
				intervalOuterRadius: 120,
				ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
				intervals:[9, 11],
				intervalColors:['#000000', '#cc6666']
			}
		}
	});

	s2 = [0];

	vehicle_speed_gauge = $.jqplot('vehicle_speed',[s2],{
		grid: {
			background: "transparent"
		},
		seriesDefaults: {
			renderer: $.jqplot.MeterGaugeRenderer,
			rendererOptions: {
				label: 'km/h',
//				intervalOuterRadius: 150,
//				intervals:[35, 65, 130],
//				intervalColors:['#66cc66', '#E7E658', '#cc6666'],
				ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]
			}
		}
	});

	s3 = [0];

	fuel_level_gauge = $.jqplot('fuel_level',[s3],{
		grid: {
			background: "transparent"
		},
		seriesDefaults: {
			renderer: $.jqplot.MeterGaugeRenderer,
			rendererOptions: {
				label: 'Fuel %',
				min: 0,
				max: 100,
				intervalOuterRadius: 65,
				ticks: [0,25,50,75,100],
				intervals:[10, 100],
				intervalColors:['#cc6666', '#FFFFFF']
			}
		}
	});

	var get_data = function() {
		var req = new XMLHttpRequest();
		req.open("GET","/api/car",true);
		req.onreadystatechange=function() {
			if (req.readyState==4 && req.status==200) {
				//console.log(req.responseText);
				var data = JSON.parse(req.responseText);
				// vehicle speed
				var newData = new Array();
				newData.push([1,data["vehicle_speed"]["value"]]);
				vehicle_speed_gauge.series[0].data = newData;
				vehicle_speed_gauge.resetAxesScale();
				vehicle_speed_gauge.replot();

				//engine_speed
				var newData = new Array();
				newData.push([1,data["engine_speed"]["value"] / 1000]);
				engine_speed_gauge.series[0].data = newData;
				engine_speed_gauge.resetAxesScale();
				engine_speed_gauge.replot();
				
				//fuel_level
				var newData = new Array();
				newData.push([1,data["fuel_level"]["value"]]);
				fuel_level_gauge.series[0].data = newData;
				fuel_level_gauge.resetAxesScale();
				fuel_level_gauge.replot();

				// windshield_wiper_status
				if (data["windshield_wiper_status"] == "False" || data["ignition_status"] == "off") {
					$("#windshield_wiper_status").attr("src","static/img/transparent.png");
				} else {
					$("#windshield_wiper_status").attr("src","static/img/windshield_wiper.png");
				}
				// headlamp_status
				if (data["headlamp_status"] == "False" || data["ignition_status"] == "off") {
					$("#headlamp_status").attr("src","static/img/transparent.png");
				} else {
					$("#headlamp_status").attr("src","static/img/headlamp.png");
				}
				// high_beam_status
				if (data["high_beam_status"] == "False" || data["ignition_status"] == "off") {
					$("#high_beam_status").attr("src","static/img/transparent.png");
				} else {
					$("#high_beam_status").attr("src","static/img/high_beam.png");
				}
				// parking_brake_status
				if (data["parking_brake_status"] == "False" || data["ignition_status"] == "off") {
					$("#parking_brake_status").attr("src","static/img/transparent.png");
				} else {
					$("#parking_brake_status").attr("src","static/img/parking_brake.png");
				}

				// transmission_gear_position
				if (data["ignition_status"] == "off") {
					$("#transmission_gear_position").text("");
				} else {
					$("#transmission_gear_position").text({
						"neutral": "N",
						"reverse": "R",
						"park": "P",
						"first": "1",
						"second": "2",
						"third": "3",
						"fourth": "4",
						"fifth": "5",
						"sixth": "6",
						"seventh": "7",
						"eighth": "8"
					}[data["transmission_gear_position"]]);
				}

				// ignition_status
				$('#ignition_status').attr("src","static/img/ignition_" + data["ignition_status"] + ".png");

				// auto-refresh
				get_data();
			}
		};
		req.send(null);
	};

	get_data();
	//get_engine_speed();

});