document.addEventListener('DOMContentLoaded', function() {
	console.log("hi");
	if(navigator.onLine)
	{
		  var config = {
		apiKey: "AIzaSyCZZw5Z3excsXZZVW2YiZAQLBzYoAeeGIc",
		authDomain: "test-ee8d4.firebaseapp.com",
		databaseURL: "https://test-ee8d4.firebaseio.com",
		storageBucket: "test-ee8d4.appspot.com",
		messagingSenderId: "205175772653"
	  };
	  firebase.initializeApp(config);
	  console.log(firebase);
	   
	  chrome.identity.getProfileUserInfo(function(userInfo) {
	/* Use userInfo.email, or better (for privacy) userInfo.id
    They will be empty if user is not signed in in Chrome */
		console.log(userInfo.email);
		console.log(userInfo.id);
		email=userInfo.email;
		userid=userInfo.id;
		var ref = firebase.database().ref(userid);
	   //var ref = firebase.database().ref();
	   username=document.getElementById('username');
	   password=document.getElementById('password');
	   personal=document.getElementById('personal');
	   ref.on("value", function(snapshot) {
	   var data=snapshot.val();
	   console.log(data.phone);
	   console.log(data.password);
	   personal.innerHTML="<center><strong>Welcome! "+email+"</strong></center>";
	   username.value=data.phone;
	   password.value=data.password;
	   var obj = {"name":email,"phone":data.phone,"password":data.password};
	   localStorage[userid]=JSON.stringify(obj);
	   
	}, function (error) {
	   console.log("Error: " + error.code);
	});	
	  
	}); 
	}
	else
	{
	  chrome.identity.getProfileUserInfo(function(userInfo) {
	/* Use userInfo.email, or better (for privacy) userInfo.id
    They will be empty if user is not signed in in Chrome */
		console.log(userInfo.email);
		console.log(userInfo.id);
		email=userInfo.email;
		userid=userInfo.id;
	   username=document.getElementById('username');
	   password=document.getElementById('password');
	   personal=document.getElementById('personal');
	   data=JSON.parse(localStorage[userid]);
	   personal.innerHTML="<center><strong>Welcome! "+data.name+"</strong></center>";
	   username.value=data.phone;
	   password.value=data.password;
	   console.log(data.phone);
	   console.log(data.password);	   
	});
	}
	/*var provider = new firebase.auth.GoogleAuthProvider();
	console.log(provider);
var signIn = document.getElementById('onSignIn');
    signIn.addEventListener('click', function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
  }, false);*/

  /*var checkPageButton = document.getElementById('send');
  checkPageButton.addEventListener('click', function() {
      netname=document.getElementById('network');
	  var ref = firebase.database().ref(userid);
	//var ref = firebase.database().ref();
	creds=document.getElementById('creds');
	ref.on("value", function(snapshot) {
	   var data=snapshot.val();
	   console.log(data.phone);
	   console.log(data.password);
	   creds.innerHTML+=data.phone+" "+data.password;
	}, function (error) {
	   console.log("Error: " + error.code);
	});
  }, false);*/
}, false);