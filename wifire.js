<<<<<<< HEAD
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
	$(function() {
	$('#password').password().on('show.bs.password', function(e) {
	    $('#eventLog').text('On show event');
	    $('#methods').prop('checked', true);
	}).on('hide.bs.password', function(e) {
		    $('#eventLog').text('On hide event');
		    $('#methods').prop('checked', false);
		});
	$('#methods').click(function() {
	    $('#password').password('toggle');
	});
	});

}, false);
=======
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
}, false);
>>>>>>> origin/master
