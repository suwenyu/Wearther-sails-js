/**
 * PostsController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	top:function(req, res, next){
		res.view('posts/top')
	}
};

