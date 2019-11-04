const user = function () {
    const getLogin = function (ctx) {
        ctx.partial('views/home/login.hbs');
    };

    const postLogin = function (ctx) {
        var username = ctx.params.username;
        var password = ctx.params.password;

        userModel.login(username, password).then(function (data) {
            storage.saveUser(data);
            pets.showInfo("You are successfully logged in!");
            ctx.redirect('#/pets/all');
        }).catch(function (err) {
            pets.handleAjaxError(err);
            ctx.redirect('#/login')
        });
    };

    const logout = function (ctx) {
        userModel.logout().done(function () {
            pets.showInfo("Logout successfull.")
            storage.deleteUser();
            ctx.redirect('#/');
        }).fail(pets.handleAjaxError);
    }
    const getRegister = function (ctx) {
        ctx.partial("views/home/register.hbs");
    };

    const postRegister = function (ctx) {
        userModel.register(ctx.params).then(function (data) {
            storage.saveUser(data);
            ctx.redirect('#/');
        }).catch(pets.handleAjaxError);

    }

    const initializeLogin = function () {

        if (userModel.isAuthorized()) {
            $('.first-bar').show();
            $('.second-bar').show();
            $('.navbar-anonymous').hide();
            let username = localStorage.getItem(storage.appKey + "userInfo");
            username = JSON.parse(username).username;
             $("#welcome").text(`Welcome ${username}!`);
            
        } else {
            $('.first-bar').hide();
            $('.second-bar').hide();
            $('.navbar-anonymous').show();
        }
    };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        initializeLogin
    };
}();