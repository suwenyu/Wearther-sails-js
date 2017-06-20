/**
 * NotifyController
 *
 * @description :: Server-side logic for managing notifies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req, res, next){
		console.log(req.param('deviceid'));
		var deivce_id = req.param('deviceid');

		Notify.findOne({'deivce' : deivce_id }).exec(function(err, found){
				console.log(found);
				if(!found){
					console.log('1');
					Notify.create({'device':deivce_id }).exec(function (err, createfound){
						console.log(createfound);
						return res.ok();
					});
				}
				else{
					res.ok();
				}
			// return res.ok();
			});
	},
	iosnotify:function(req, res, next){
		console.log('test');
		Notify.find({'device' :'123'}).exec(function(err, data){
			console.log(data);
		});
	}
};

