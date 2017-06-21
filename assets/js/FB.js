window.fbAsyncInit = function() {
    FB.init({
        appId: '236105966830182',
        // appId: '378859022499319',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });

}



function Login() {
    FB.login(function(response) {
        if (response.authResponse) {
            getUserInfo();
        } else {
            alert('FB login failed.');
        }
    }, { scope: 'email,user_photos,user_videos' });

}

function getUserInfo() {
    FB.api('/me', { fields: 'email ,name , id ,gender' }, function(response) {
    	console.log(response);
        $.ajax({
                method: "POST",
                url: "/account/fbcreate",
                data: { response: response }
            })
            .done(function(msg) {
                window.location = '/account/fbredirect';
            });

    });
}
(function(d) {
    var js, id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
