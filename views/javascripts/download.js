var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("tomcat.pdf");
var request = http.get("http://mgmt.pune.cdac.in:8080/downloadFile.action?fileName=SSL_Configure_Tomcat7.pdf", function(response) {
  response.pipe(file);
});