'use strict'

module.exports = function(template) {
    return function fileNotFound(req,res,next) {
        var model = {url:req.url,statusCode:404};
        if(req.xhr){
            res.send(404,model);
        }else{
            res.status(404);
            res.render(template,req.data);
        }
    };
};