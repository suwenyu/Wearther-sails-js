/**
 * PostsController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	top:function(req, res, next){


		User.native(function(err, collection){
			collection.aggregate([
			{
				$lookup:{
					from: "posts",
					localField: "_id",
					foreignField: "ownname",
					as: "post_user"
				}
			},
			{
				$sort:{
					"post_user.createdAt": -1
				}
			},
			{
				$limit: 10
			}
			],function(err, result){
				// console.log(result);

				if(req.session.authenticated != undefined){
					console.log('1')
					Follow.find({'from':req.session.User.id}).exec(function(err, user_follow_list){
		  				// console.log(user_follow_list);
		  				// console.log(user_follow_list);
		  				res.view({
				  			user_follow_list:user_follow_list,
				  			result: result
				  		});
		  			});
				}
				else{
					user_follow_list = [];
					res.view('posts/top',{
						user_follow_list:user_follow_list,
						result: result
					});
				}
				
			});
		});

	}
};

