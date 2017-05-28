/**
 * FollowController
 *
 * @description :: Server-side logic for managing Follows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res ,next){
		// console.log(req.param('id'));
		console.log(req.body.user_id);
		var user_id = req.body.user_id;
		// User.findOne({"id":req.param('id')}).exec(function(err, user){
			Follow.findOne({'from' : req.session.User.id , 'to': user_id}).exec(function(err, found){
				console.log(found);
				if(!found){
					console.log('1');
					Follow.create({'from':req.session.User.id , 'to': user_id }).exec(function (err, createfound){
						console.log(createfound);
						return res.json({follow:'yes'});
					});
				}
				else{
					console.log('2');
					Follow.destroy({'from':req.session.User.id , 'to':user_id }).exec(function (err){
						if (err) {
							return res.negotiate(err);
						}
						return res.json({follow :'no'});
					});
				}
			// return res.ok();
			});

		// });

	}
};

