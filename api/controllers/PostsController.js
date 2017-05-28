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
				res.view('posts/top',{
					result: result
				});
			});
		});

	}
};

