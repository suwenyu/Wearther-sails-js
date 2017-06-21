module.exports.cron = {
  myFirstJob: {
    schedule: '*/10 * * * * *',
    onTick: function () {

	var apn = require('apn');
	var request = require('request');


	function recomclothes(data){
		gender = 'male';
		occa = '休閒';
		return new Promise(function(resolve , reject){
			today_temp_delta = 0;
			if (today_temp_delta <= 3){
	    		Clothes.find({"warm":{$lte: 0.3}, "sex":gender,"part":"body", "occasion":occa},{'weather_clothes':1}).exec(function (err, body) {
	    			if (err) {
						return res.serverError(err);
					}
					Clothes.find({"warm":{$lte: 0.3}, "sex":gender,"part":"foot"},{'weather_clothes':1}).exec(function (err, foot){
					  if (err) {
					    return res.serverError(err);
					  }
					  // console.log(body.length, foot);
					  var recom_body = "";
					  var recom_foot = "";
					  recom_body += (body[Math.floor(Math.random()*body.length)].weather_clothes) + " ";
					  recom_foot += (foot[Math.floor(Math.random()*foot.length)].weather_clothes) + " ";
					  console.log(recom_body,recom_foot);
					  var accessory = ['帽子'];
					  data['recom_body'] = recom_body;
					  data['recom_foot'] = recom_foot;
					  resolve(data)

					  // resolve('test3');
						//   res.json({
						//   	recom_body:recom_body,
						// 	recom_foot:recom_foot,
						// 	accessory:accessory,
				  //   		// city:city,
						// 	// weather_data:weather_data
						// });
					});
	    		});
	    	}
	    	else if(today_temp_delta <= 7 && today_temp_delta>3){
	    		Clothes.find({"warm":{$lte: 0.3}, "sex":gender,"part":"body","occasion":occa},{'weather_clothes':1}).exec(function (err, body) {
	    			if (err) {
						return res.serverError(err);
					}
					Clothes.find({"warm":{$lte: 0.4 , $lte:0.5}, "sex":gender,"part":"foot"},{'weather_clothes':1}).exec(function (err, foot){
					  if (err) {
					    return res.serverError(err);
					  }
					  // console.log(body.length, foot);
					  var recom_body = [];
					  var recom_foot = [];
					  recom_body.push(body[Math.floor(Math.random()*body.length)].weather_clothes);
					  recom_foot.push(foot[Math.floor(Math.random()*foot.length)].weather_clothes);

					  // console.log(recom_body,recom_foot);

					  	Clothes.find({"warm":{$gte: 0.5 , $lte:1.0}, "sex":gender,"part":"body","occasion":occa},{'weather_clothes':1}).exec(function (err, body) {
		    				
	    					recom_body.push(body[Math.floor(Math.random()*body.length)].weather_clothes);

				  			Clothes.find({"warm":{$gte: 1.1 , $lte:3.0}, "sex":gender,"part":"body"},{'weather_clothes':1}).exec	(function(err,body){
				  				
			  					recom_body.push(body[Math.floor(Math.random()*body.length)].weather_clothes);
			  					console.log(recom_body,recom_foot);
			  					var accessory = ['毛帽', '長襪'];
			  					resolve('test');
			  			// 		res.json({
			  			// 			recom_body:recom_body,
								// 	recom_foot:recom_foot,
								// 	accessory:accessory,
						  //   		// city:city,
								// 	// weather_data:weather_data
								// });
				  			});
						});
						  
					});
	    		});
	    	}
	    	else if(today_temp_delta > 7 && today_temp_delta<=12){
	    		Clothes.find({"warm":0.5 , "sex":gender , "part":"body","occasion":occa},{'weather_clothes':1}).exec(function(err,body){
	    			var recom_body = [];
					var recom_foot = [];
					console.log(body);
					if(body[Math.floor(Math.random()*body.length)]){
						recom_body.push(body[Math.floor(Math.random()*body.length)].weather_clothes);
					}
					Clothes.find({"warm":3 ,  "sex":gender , "part":"body" ,"occasion":occa},{'weather_clothes':1}).exec(function(err,body){
						if(body[Math.floor(Math.random()*body.length)])
							recom_body.push(body[Math.floor(Math.random()*body.length)].weather_clothes);
						
						Clothes.find({"warm":{$gte:4,$lte:6} ,  "sex":gender , "part":"body","occasion":occa},{'weather_clothes':1}).exec(function(err,body){
							if(body[Math.floor(Math.random()*body.length)])
								recom_body.push(body[Math.floor(Math.random()*body.length)].weather_clothes);

							Clothes.find({"warm":0.5 ,"sex":gender, "part":"foot"},{'weather_clothes':1}).exec(function(err,foot){
								if(body[Math.floor(Math.random()*body.length)])
									recom_foot.push(foot[Math.floor(Math.random()*foot.length)].weather_clothes);
								
								var accessory = ['毛帽', '長襪']
								console.log(recom_body,recom_foot);
								resolve('test1');
								// res.json({
								// 	recom_body:recom_body,
								// 	recom_foot:recom_foot,
								// 	accessory:accessory,
						  //   		// city:city,
								// 	// weather_data:weather_data
								// });


							});
						});
					})
	    		});
	    	}
	    	else{
	    		Clothes.find({"warm":0.5 , "sex":gender , "part":"body","occasion":occa},{'weather_clothes':1}).exec	(function(err,body){
	    			var recom_body = [];
					var recom_foot = [];
					recom_body.push(body[Math.floor(Math.random()*body.length)]);

					Clothes.find({"warm":3 ,  "sex":gender , "part":"body","occasion":occa},{'weather_clothes':1}).exec(function(err,body){
						recom_body.push(body[Math.floor(Math.random()*body.length)]);
						Clothes.find({"warm":{$gte:4,$lte:6} ,  "sex":gender , "part":"body","occasion":occa},{'weather_clothes':1}).exec(function(err,body){
							recom_body.push(body[Math.floor(Math.random()*body.length)]);

							Clothes.find({"warm":0.5 ,"sex":gender, "part":"foot"},{'weather_clothes':1}).exec(function(err,foot){
								recom_foot.push(foot[Math.floor(Math.random()*foot.length)]);
								
								Clothes.find({"warm":9 ,  "sex":gender , "part":"body","occasion":occa},{'weather_clothes':1}).exec(function(err,body){
									recom_body.push(body[Math.floor(Math.random()*body.length)]);
									console.log(recom_body,recom_foot);
									var accessory = ['毛帽', '長襪'];
									resolve('test2');
									// res.json({
									// 	recom_body:recom_body,
									// 	accessory:accessory,
									// 	recom_foot:recom_foot,
							  //   		// city:city,
									// 	// weather_data:weather_data
									// });
								});


							});
						});
					})
	    		});
	    	}
		});
	}

	function runrequest(device_data){
		return new Promise(function(resolve, reject){
			request({
				url:'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=be8f810e29c54a748be73359172705&q='+parseFloat(device_data.lat).toFixed(2)+','+parseFloat(device_data.lng).toFixed(2)+'&format=json&num_of_days=1&includelocation=yes',
				method:'GET'
			}, function(error, response, body){
				body = JSON.parse(body);
				var temp = body.data.weather[0].hourly[2].tempC;
				var pop = body.data.weather[0].hourly[2].chanceofrain;

				device_data['temp'] = temp;
				device_data['pop'] = pop;
				// console.log(device_data.device);

				recomclothes(device_data).then(function(device_data){
					// console.log(device_data);
					console.log(device_data.device);

					var notification = new apn.Notification();

					notification.topic = 'com.nccu.wearther';
					notification.sound = 'ping.aiff';

					notification.alert = 'Hello World \u270C';

					
					notification.alert = "temperature:" + device_data.temp +"℃ chance of rain:" + device_data.pop +"% recom_body:" + device_data.recom_body + "recom_foot" + device_data.recom_foot;
					deviceToken = device_data.device;

					apnProvider.send(notification, deviceToken).then(function(result) {  
					    // Check the result for any failed devices
					    console.log(result);
					    resolve('success');
					});
					

					

				});


			});
		
		});
	}


	// Set up apn with the APNs Auth Key
	var apnProvider = new apn.Provider({  
	     token: {
	     	key: '/app/AuthKey_HQ23R8W9T8.p8',
	        // key: '/Users/suwenyu/Downloads/apns/AuthKey_HQ23R8W9T8.p8', // Path to the key p8 file
	        keyId: 'HQ23R8W9T8', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
	        teamId: 'KNZMQRE639', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
	    },
	    production: false // Set to true if sending a notification to a production iOS app
	});


      // sails.controllers.notify.iosnotify();
      sails.models.notify.find({select:['device','lat','lng']}).exec(function(err, data){
      	// console.log(data);
      	var deviceToken;
      	var device_all = [];
      	var device_data = {};


      	var test1 = data.map(function(x) {
		   getrequest(x).then(function(x){
		   		return recomclothes(x);
		   	}).then(function(x){
		   		console.log(x);
		   		return notify(x);
		   }).then(function(x){
		   	console.log(x);
		   });
		   // console.log(data);
		});

		function getrequest(data){
			return new Promise(function(resolve, reject){
				request({
					url:'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=be8f810e29c54a748be73359172705&q='+parseFloat(data.lat).toFixed(2)+','+parseFloat(data.lng).toFixed(2)+'&format=json&num_of_days=1&includelocation=yes',
					method:'GET'
				}, function(error, response, body){
					body = JSON.parse(body);
					var temp = body.data.weather[0].hourly[2].tempC;
					var pop = body.data.weather[0].hourly[2].chanceofrain;

					data['temp'] = temp;
					data['pop'] = pop;
					// console.log(data);
					resolve(data);
				});
			});
		}

		function notify(data){
			return new Promise(function(resolve, reject){
				var notification = new apn.Notification();
				notification.topic = 'com.nccu.wearther';
				notification.sound = 'ping.aiff';

				notification.alert = 'Hello World \u270C';

				
				notification.alert = "temperature:" + data.temp +"℃ chance of rain:" + data.pop +"% recom_body:" + data.recom_body + "recom_foot" + data.recom_foot;
				deviceToken = data.device;

				apnProvider.send(notification, deviceToken).then(function(result) {  
					    // Check the result for any failed devices
				    console.log(result);
				    resolve('success');
				});

			});
		}




	
      	// for(i = 0 ; i < data.length;i++){
      	// 	console.log(i);
      	// 	device_data['device'] = data[i].device;
      	// 	device_data['lat'] = data[i].lat;
      	// 	device_data['lng'] = data[i].lng;
      	// 	console.log(device_data.device);


      	// 	runrequest(device_data).then(function(data){
      	// 		console.log(data);
      	// 	});
      	// }



		

      });
    }
  }
};