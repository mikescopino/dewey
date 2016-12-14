///////////////////////////////////////////
// Services
///////////////////////////////////////////

var services = document.getElementsByClassName('service');

for (var i = 0; i < services.length; i++) {
  var e = services[i];
  e.onclick = function() {
    var url = this.getAttribute('data-target');
    location.href = (url);
  }
}


///////////////////////////////////////////
// Projects
///////////////////////////////////////////

var projects = document.getElementsByClassName('project');

for (var i = 0; i < projects.length; i++) {
  var e = projects[i];
  e.onclick = function() {
    var url = this.getAttribute('data-target');
    location.href = (url);
  }
}
