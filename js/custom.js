function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    gapi.client.load('plus', 'v1', function() {
      gapi.client.plus.people.get({'userId': 'me'}).execute(signIn);
    });
  }
}
function signIn(resp) {
  $("#loggedinDropdownText").html("Logged in as ".concat(resp.displayName));
  $("#loggedinDropdownImage").html("<img src=\"".concat(resp.image.url.substring(0, resp.image.url.length - 6),"\" class=\"img-responsive img-circle\" id=\"userImage\">"));
  $("#loginDropdown").addClass("hidden");
  $("#loggedinDropdown").removeClass("hidden");
  $("#accounttests").removeClass("hidden");
  Cookies.set('name', resp.displayName);
  Cookies.set('imgurl', resp.image.url);
}
function signOut() {
  gapi.auth.signOut();
  $("#loginDropdown").removeClass("hidden");
  $("#loggedinDropdown").addClass("hidden");
  $("#accounttests").addClass("hidden");
  Cookies.remove('name');
  Cookies.remove('imgurl');
}
function renderGoogleSignIn() { gapi.signin.render("googleSignIn", { 
  'callback': signinCallback, 
  'clientid': '872532021641-ivmdsquh3kok8l5566j82vb59c4kis18.apps.googleusercontent.com', 
  'cookiepolicy': 'single_host_origin', 
  'requestvisibleactions': 'http://schema.org/AddAction',
  'scope': 'https://www.googleapis.com/auth/plus.login'
});}
