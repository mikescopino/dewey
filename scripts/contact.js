///////////////////////////////////////////
// Form validation
///////////////////////////////////////////

var valid = false;
function validation() {
  var form = document.getElementById('contactForm');
  if (form) {
    document.getElementById('sendEmail').onclick = function() {
      var fields = document.getElementsByClassName('input');
      var alert = document.getElementsByClassName('alert')[0];
      var errors = [];
      if (form && fields) {
        for (var i = 0; i < fields.length; i++) {
          if (fields[i].childNodes[3].value === "") {
            errors.push(i);
          }
        }
      }
      document.body.scrollTop = 0;
      if (errors.length > 0) {
        alert.innerHTML = "Please complete all fields below";
        alert.classList.remove('success');
        alert.classList.add('error');
        return false;
      }
      else {
        alert.classList.remove('error');
      }
    }
  }
}
validation();

///////////////////////////////////////////
// Form replies
///////////////////////////////////////////

function contactReply() {
  var alert = document.getElementsByClassName('alert')[0];
  if (alert) {
    var response = window.location.search.substring(1);
    switch (response) {
      case "success":
        alert.innerHTML = "Thanks for reaching out. We'll follow up within the next 24 hours.";
        alert.classList.add('success');
        break;
      case "error":
        alert.innerHTML = "Sorry, but there's been an error. Please try again.";
        alert.classList.add('error');
        break;
    }
  }
}

contactReply();
