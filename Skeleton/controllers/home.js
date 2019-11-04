const home = function(){
    const index = function(ctx) {
       
        if(userModel.isAuthorized()) {
            ctx.redirect('#/pets/all');
        } else {
            ctx.partial('views/home/index.hbs');
        }
    };
    
    return {
        index
    };
}();