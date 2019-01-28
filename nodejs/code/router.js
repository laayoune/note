function route(pathname,response) {
    //console.log("About to route a request for " + pathname);
    if(pathname == "/"){
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        response.write("Hello World");
        response.end();
    }else if(pathname == "/index/home"){
        response.write("home");
        response.end();
    }else{
        response.end('404');
    }
}
exports.route = route;