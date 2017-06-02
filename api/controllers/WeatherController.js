/**
 * WeatherController
 *
 * @description :: Server-side logic for managing Weathers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req, res, next){
  		res.view('weather/index')
  	},
  	clothes:function(req, res, next){

  		var location = req.param('location');
  		var weather = req.param('weather_data');
  		var	aqi = req.param('aqi');

  		console.log(location, weather, aqi);
  		req.session.location = location;

  		var gender = 'male';
  		var today_temp_delta = 10;
  		var occa = '休閒';
  		
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
				  var recom_body = [];
				  var recom_foot = [];
				  recom_body.push(body[Math.floor(Math.random()*body.length)]);
				  recom_foot.push(foot[Math.floor(Math.random()*foot.length)]);
				  console.log(recom_body,recom_foot);
				  var accessory = ['帽子']
					  res.json({
					  	recom_body:recom_body,
						recom_foot:recom_foot,
						accessory:accessory,
			    		// city:city,
						// weather_data:weather_data
					});
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
		  					var accessory = ['毛帽', '長襪']
		  					res.json({
		  						recom_body:recom_body,
								recom_foot:recom_foot,
								accessory:accessory,
					    		// city:city,
								// weather_data:weather_data
							});
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

							res.json({
								recom_body:recom_body,
								recom_foot:recom_foot,
								accessory:accessory,
					    		// city:city,
								// weather_data:weather_data
							});


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
								var accessory = ['毛帽', '長襪']
								res.json({
									recom_body:recom_body,
									accessory:accessory,
									recom_foot:recom_foot,
						    		// city:city,
									// weather_data:weather_data
								});
							});


						});
					});
				})
    		});
    	}
  		
  	}
};

