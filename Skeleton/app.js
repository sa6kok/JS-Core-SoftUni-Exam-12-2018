const app = Sammy('#site-content', function () {
    this.use('Handlebars', 'hbs');

    this.before({
        except: {}
    }, function () {
        user.initializeLogin()
    });

    this.get('#/', home.index);
    this.get('#/index.html', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get('#/pet/create', petControler.getCreate);
    this.post('#/pet/create', petControler.postCreate);
    this.get('#/pets/all', petControler.all);
    this.get('#/pets/:filter', petControler.filtered);
    this.get('#/mypets/all', petControler.mine);
    this.get('#/pet/details/:id', petControler.details);
    this.get('#/pet/moredetails/:id', petControler.detailsOther);
    this.get('#/pet/edit/:id', petControler.viewEdit);
    this.post('#/pet/edit/:id', petControler.postEdit);
    this.get('#/pet/delete/:id', petControler.deleteItem);
    this.get('#/pet/like/:id', petControler.like);
});

$(function () {
    app.run('#/');
});