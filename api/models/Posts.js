/**
 * Posts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	schema : true,

  	attributes: {
	  	fd:{
	  		type:'string',
	  	},
	  	file_deletehash:{
	  		type:'string',
	  	},
	  	link:{
	  		type:'string',
	  	},
	  	filetype:{
	  		type:'string',
	  	},
	  	filename:{
	  		type:'string',
	  	},
	  	textParams:{
	  		type:'string',
	  	},
	  	temperature:{
	  		type:'string'
	  	},
	    ownname_real:{
	      type:'string'
	    },
	    
	  	ownname:{
	      model :'user'
	  	}


  }
};

