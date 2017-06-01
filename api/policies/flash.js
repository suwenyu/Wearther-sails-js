module.exports = function(req, res, next) {
	console.log('flash');

 res.locals.flash = { text:[] };

  if(!req.session.flash) {
    req.session.flash = { text:[] };
    return next();
  }
  res.locals.flash = _.clone(req.session.flash);

  // Clear flash
  req.session.flash = { text:[] };
  return next();
};