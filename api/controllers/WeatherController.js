/**
 * WeatherController
 *
 * @description :: Server-side logic for managing Weathers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req, res, next){
  		res.view('weather/index')
  	}
};

