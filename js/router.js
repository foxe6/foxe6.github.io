var pathname = window.location.pathname;
var pathname_index = pathname.indexOf("/",1);
var server_name = pathname.substr(1, pathname_index-1);
if (server_name === "root") {
    server_name = "";
}
else {
    server_name += ".";
}
pathname = pathname.substr(pathname_index);
window.location.href = "http://"+(server_name)+"foxe6.kozow.com"+pathname;
