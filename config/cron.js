module.exports.cron = {
  myFirstJob: {
    schedule: '*/10 * * * * *',
    onTick: function () {

	var apn = require('apn');

	// Set up apn with the APNs Auth Key
	var apnProvider = new apn.Provider({  
	     token: {
	     	key: '/app/AuthKey_HQ23R8W9T8.p8',
	        // key: '/Users/suwenyu/Downloads/apns/AuthKey_HQ23R8W9T8.p8', // Path to the key p8 file
	        keyId: 'HQ23R8W9T8', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
	        teamId: 'KNZMQRE639', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
	    },
	    production: false // Set to true if sending a notification to a production iOS app
	});


      // sails.controllers.notify.iosnotify();
      sails.models.notify.find({select:['device']}).exec(function(err, data){
      	// console.log(data);
      	var deviceToken=[];
      	for(i = 0 ; i < data.length;i++){
      		deviceToken.push(data[i].device);
      	}
      	console.log(deviceToken);


      	// var notification = new apn.Notification();
      	// Prepare a new notification
		var notification = new apn.Notification();

		// Specify your iOS app's Bundle ID (accessible within the project editor)
		notification.topic = 'com.nccu.wearther';

		// Set expiration to 1 hour from now (in case device is offline)
		notification.expiry = /*Math.floor(Date.now() / 1000) + 3600;*/ 1

		// Set app badge indicator
		//notification.badge = 1;

		// Play ping.aiff sound when the notification is received
		notification.sound = 'ping.aiff';

		// Display the following message (the actual notification text, supports emoji)
		notification.alert = 'Hello World \u270C';

		apnProvider.send(notification, deviceToken).then(function(result) {  
		    // Check the result for any failed devices
		    console.log(result);
		});

      });
    }
  }
};