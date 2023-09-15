var uid = document.getElementById("uid");
var userText = document.getElementById("user-text");

uid.addEventListener("focusout", onfocusout1);

function onfocusout1(e) {
    if (uid.value.length > 0) uid.classList.add('not-empty');
    else uid.classList.remove('not-empty');
}

// allow focus of the input even on click of div
userText.onclick = function (e) {
    uid.focus();
}



var pw = document.getElementById("pw");
var pwdText = document.getElementById("pwd-text");

pw.addEventListener("focusout", onfocusout2);

function onfocusout2(e) {
    if (pw.value.length > 0) pw.classList.add('not-empty');
    else {
      pw.classList.remove('not-empty');
      var element = document.getElementsByClassName("check");
      for (var i = 0; i < element.length; i++) {
        element[i].className = element[i].className.replace(" active", "");
      }
    }
}

// allow focus of the input even on click of div
pwdText.onclick = function (e) {
    pw.focus();
}

// function conditionsNotFullfiled() {
//     var element = document.getElementsByClassName("check");
//     for (var i = 0; i < element.length; i++) {
//       element[i].className = element[i].className.replace(" active", "");
//       element[i].className += " active";
//     }

//     var password = document.getElementById("pw");
//     var pwvalue = password.value;
//     if (pwvalue.toUpperCase() != pwvalue) {
//       document.getElementById("ll").style.color = "rgb(0, 133, 0)";
//     } else {
//       document.getElementById("ll").style.color = "rgb(148, 5, 5)";
//     }
//     if (pwvalue.toLowerCase() != pwvalue) {
//       document.getElementById("ul").style.color = "rgb(0, 133, 0)";
//     } else {
//       document.getElementById("ul").style.color = "rgb(148, 5, 5)";
//     }
//     if (/\d/.test(pwvalue)) {
//       document.getElementById("no").style.color = "rgb(0, 133, 0)";
//     } else {
//       document.getElementById("no").style.color = "rgb(148, 5, 5)";
//     }
//     if (pwvalue.length >= 8) {
//       document.getElementById("m8c").style.color = "rgb(0, 133, 0)";
//     } else {
//       document.getElementById("m8c").style.color = "rgb(148, 5, 5)";
//     }
// }
// function conditionsFullfiled() {
//     var element = document.getElementsByClassName("check");
//     for (var i = 0; i < element.length; i++) {
//       element[i].className = element[i].className.replace(" active", "");
//     }
//   }
  
//   function submitcheck() {
//     var username = document.getElementById("uid");
//     var x = username.value;
//     var password = document.getElementById("pw");
//     var y = password.value;
//     if (
//       y.length < 8 ||
//       y.toUpperCase() == y ||
//       y.toLowerCase() == y ||
//       !/\d/.test(y) ||
//       x.length == 0
//     ) {
//       document.getElementById("sm").disabled = true;
//       console.log("disabled");
//     } else {
//       document.getElementById("sm").disabled = false;
//       console.log("enabled");
//     }
//   }
  
//   function changeUn() {
//     submitcheck();
//   }
//   function changePw() {
//     var password = document.getElementById("pw");
//     var y = password.value;
//     if (
//       y.length < 8 ||
//       y.toUpperCase() == y ||
//       y.toLowerCase() == y ||
//       !/\d/.test(y)
//     ) {
//       conditionsNotFullfiled();
//     } else {
//       conditionsFullfiled();
//     }
//     if (y==0){
//       conditionsFullfiled()
//     }
//     submitcheck();
//   }

