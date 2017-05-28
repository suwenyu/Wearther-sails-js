/**
 * PostsController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	top:function(req, res, next){

		// Posts.native(function(err, collection){
		// 	collection.aggregate([
		// 	{
		// 		$lookup:{
		// 			from: "user",
		// 			localField: "ownname_real",
		// 			foreignField: "name",
		// 			as: "post_user"
		// 		}
		// 	},
		// 	{
		// 		$sort:{
		// 			createdAt: -1
		// 		}
		// 	},
		// 	{
		// 		$limit:5
		// 	}
		// 	],function(err, result){
		// 		console.log(result);
		// 	});
		// });


		User.native(function(err, collection){
			collection.aggregate([
			{
				$lookup:{
					from: "posts",
					localField: "name",
					foreignField: "ownname_real",
					as: "post_user"
				}
			},
			{
				$sort:{
					"post_user.createdAt": -1
				}
			},
			{
				$limit: 5
			}
			],function(err, result){
				res.view('posts/top',{
					result: result
				});
			});
		});

	}
};

