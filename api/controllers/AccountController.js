/**
 * AccountController
 *
 * @description :: Server-side logic for managing Accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req, res, next){
		var id = req.param('id');
        console.log(id);

        var ObjectId = require('mongodb').ObjectID;

        User.findOne({id:id} , function(err, user_data){
        	console.log(user_data);

            if (err) return next(err);
            if (!user_data) return next();
            console.log(typeof user_data.id);

            Posts.find({'ownname_real':user_data.name}).exec(function(err, result){
                
                Follow.native(function(err, collection){
                    collection.aggregate([
                    {
                        $lookup:{
                            from: "posts",
                            localField: "to",
                            foreignField: "ownname",
                            as: "user_follow"
                        }
                    },
                    {
                        $match : {
                            from :  new ObjectId(user_data.id)
                        }
                    }
                    ],function(err, follow_data){
                        console.log(follow_data);
                        res.view('account/index',{
                            user_data:user_data,
                            result: result,
                            follow_data: follow_data
                        });
                    });
                });


                
            })

            // res.view('account/index',{
            //             user_data:user_data,
            //             result:result
            //         });
        	
        });

		
	},
    signup: function(req, res, next) {
        console.log('create')
        var user_id = req.param('username'),
            email = req.param('email'),
            password = req.param('password'),
            gender = req.param('group1'),
            area = req.param('area');

            console.log(user_id , email , password, gender, area);


        User.create({ name: user_id,gender:gender,area:area,email: email, encryptedPassword: password }, function(err, user) {
            if (err) {
                console.log(err);
                req.session.flash['text'].push('User Email has been used!');
                return res.redirect('back');
            }
            req.session.authenticated = true;
            req.session.User = user;
            res.redirect('account/index/' + user.id);
        });

    },
    detail: function(req, res, next){
        var id = req.param('id');
        Posts.find({ownname:id}).exec(function(err,user_data){
            console.log(user_data);
            res.view('account/detail' , {user_data:user_data});
        });
    },
	login: function(req, res, next) {
        var email = req.param('email');
        var password = req.param('password');

        User.findOne({
            email: email
        }).exec(function(err, user) {
        	console.log(user);
            if (err)
                return res.ServerError(err);
            if (!user) {
                req.session.flash['text'].push('authentication Failed!');
                return res.redirect('back');
            } else {
                req.session.authenticated = true;
                req.session.User = user;
                res.redirect('weather/index');
            }
        })

    },
    logout: function(req, res, next) {
        req.session.authenticated = false;
        req.session.User = null;
        res.redirect('weather/index');
    },
    fbcreate: function(req, res, next) {
        console.log(req.body.response);
        User.findOneByEmail(req.body.response.email, function(err, user) {
            if (err)
                return res.ServerError(err);
            if (!user) {
                User.create({ email: req.body.response.email, name: req.body.response.name, fbid: req.body.response.id,gender:req.body.response.gender}).exec(
                    function fbuserCreated(err, fbuser) {
                        if (err) {
                            console.log(err);
                            return (err);
                        }
                        req.session.authenticated = true;
                        req.session.User = fbuser;
                        console.log(fbuser.id);
                        return res.redirect('back');
                    });
            } 
            else {
                req.session.authenticated = true;
                req.session.User = user;
                console.log(user);
                return res.redirect('back');

            }

        })
    },
    fbredirect:function(req,res,next){
        res.redirect('weather/index');
    }
};

