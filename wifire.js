/*document.addEventListener('DOMContentLoaded', function() {
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
    They will be empty if user is not signed in in Chrome 
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
    They will be empty if user is not signed in in Chrome 
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

}, false);*/

		  var config = {
		apiKey: "AIzaSyCZZw5Z3excsXZZVW2YiZAQLBzYoAeeGIc",
		authDomain: "test-ee8d4.firebaseapp.com",
		databaseURL: "https://test-ee8d4.firebaseio.com",
		storageBucket: "test-ee8d4.appspot.com",
		messagingSenderId: "205175772653"
	  };
	  firebase.initializeApp(config);

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
     document.getElementById('gsignin').textContent="Login with Google";
	 username=document.getElementById('username');
	 password=document.getElementById('password');
	 personal=document.getElementById('personal');
	 propic=document.getElementById('profile-pic');
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
	  document.getElementById('gsignin').textContent="Sign out";
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.providerData[0].uid;
      var providerData = user.providerData;
	  console.log(displayName);
	  console.log(uid);
      // [START_EXCLUDE]

	  var ref = firebase.database().ref(uid);
	  ref.on("value", function(snapshot) {
	  var data=snapshot.val();
	  console.log(data.phone);
	  console.log(data.password);
	  personal.innerHTML="<center><strong>Welcome! "+displayName+"</strong></center>";
	  username.value=data.phone;
	  password.value=data.password;
	  propic.src=photoURL;
	  propic.style.width="134px";
	  propic.style.height="117px";
	  var obj = {"name":displayName,"phone":data.phone,"password":data.password};
	  localStorage[uid]=JSON.stringify(obj);
	   
	}, function (error) {
	   console.log("Error: " + error.code);
	});	
	  //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      // [END_EXCLUDE]
    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
      document.getElementById('gsignin').textContent = 'Login with Google';
	  personal.innerHTML="";
	  username.value="";
	  password.value="";
	  propic.src="face.jpg";
      //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      //document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
	  
    }
    document.getElementById('gsignin').disabled = false;
  });
  // [END authstatelistener]

  document.getElementById('gsignin').addEventListener('click', startSignIn, false);
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authrorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  document.getElementById('gsignin').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}

window.onload = function() {
  initApp();
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
};

