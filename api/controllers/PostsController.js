/**
 * PostsController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	upload: function (req, res, next) {
	    // e.g.
	    // 0 => infinite
	    // 240000 => 4 minutes (240,000 miliseconds)
	    // etc.
	    //
	    // Node defaults to 2 minutes.
	    res.setTimeout(0);

	    req.file('avatar')
	    .upload({

	      // You can apply a file upload limit (in bytes)
	      // dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
	      // avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me)
	      maxBytes: 1000000

	    }, function whenDone(err, uploadedFiles) {

		    if (uploadedFiles.length === 0){
		      	return res.badRequest('No file was uploaded');
		    }

		    console.log(uploadedFiles[0].fd);

		    var fileroute = uploadedFiles[0].fd.split('/')
		    // var fdroute = '/' + fileroute[6] + '/'+fileroute[7];
		    var fdroute = '/' + fileroute[3] + '/'+fileroute[4];
		    console.log(fdroute);

			Posts.create({fd : fdroute , filetype:uploadedFiles[0].type , filename:uploadedFiles[0].filename , textParams:req.allParams().foo, temperature:req.allParams().temp , ownname:req.session.User.id ,ownname_real:req.session.User.name}).exec(function (err, file) {
				if (err){
		          console.log(err);
		        };
			});
			console.log({
				files: uploadedFiles,
				textParams: req.allParams()
			});


			if (err) return res.serverError(err);
			else res.redirect('account/index/'+req.session.User.id);
	    });
  	},
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
		  				res.view('posts/top',{
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

	},
	search:function(req,res,next){
		var query = req.param('q');
		console.log(query);

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
				$match:{
					$or:[{'post_user.textParams':{$regex : ".*"+query+".*"}} ,{'post_user.ownname_real':{$regex : ".*"+query+".*"}}]
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
		  				res.view('posts/top',{
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

