const petControler = function () {
   const getCreate = function (ctx) {
        
           ctx.partial('views/pets/create.hbs');
      
   }
   const postCreate = function (ctx) {
       petModel.create(ctx.params).then(function () {
           pets.showInfo("Pet created!")
          ctx.redirect('#/');
     });
   };

  const all = function (ctx) {
     
          petModel.getAll().then(function (data) {
            let userId = JSON.parse(localStorage.getItem(`${storage.appKey}` + 'userInfo')).id;
            
            data = data.filter((el) =>  el._acl.creator !== userId);
              ctx.pets = data;
              ctx.partial('views/pets/dashboard.hbs');
          });
   };

   
  const filtered = function (ctx) {
     
    petModel.getAll().then(function (data) {
      let filter = ctx.params.filter;
      let userId = JSON.parse(localStorage.getItem(`${storage.appKey}` + 'userInfo')).id;
      data = data.filter((el) =>  el._acl.creator !== userId).filter((el) => el.category === filter);
        ctx.pets = data;
        ctx.partial('views/pets/dashboard.hbs');
    });
};

   const details = function (ctx) {
       let id = ctx.params.id;
       
       petModel.getItem(id).then(function (data) {
         ctx.pet = data;
           ctx.partial('views/pets/detailsOtherPet.hbs');
       });
   };
   const detailsOther = function (ctx) {
    let id = ctx.params.id;
    
    petModel.getItem(id).then(function (data) {
      ctx.pet = data;
        ctx.partial('views/pets/detailsOther.hbs');
    });
};

   const viewEdit = function (ctx) {
       let id = ctx.params.id;
       petModel.getItem(id).then(function (data) {
           ctx.pet = data;
           ctx.partial('views/pets/detailsMyPet.hbs');
       });
   };

   const postEdit = function (ctx) {
       let id = ctx.params.id;
       let data = {};
       petModel.getItem(id).then(function (res) {
   
           
        data = {
           name: res.name,
           imageURL: res.imageURL,
           category: res.category,
           likes: res.likes,
           description: res.description,
        };

       
     }).then(function() {
        let params = ctx.params; 
        petModel.edit(params, id, data).then(function (res) {
        pets.showInfo("Updated successfully!");
        ctx.redirect('#/mypets/all');
    })});
       
   };

   const mine = function (ctx) {
       petModel.getMine().then(function (data) {
           ctx.pets = data;
           ctx.partial('views/pets/mypets.hbs');
       });
   };

   const deleteItem = function (ctx) {
       petModel.deleteItem(ctx.params.id).then(function () {
           pets.showInfo("Pet removed successfully!")
           ctx.redirect('#/mypets/all');
       });
   };

   const like = function (ctx) {
    let id = ctx.params.id;
    let data = {};
    petModel.getItem(id).then(function (res) {
        
     data = {
        name: res.name,
        imageURL: res.imageURL,
        category: res.category,
        likes: res.likes,
        description: res.description,
     };
    
  }).then(function() {
     let params = ctx.params; 
     petModel.likeItem(params, id, data).then(function (res) {
     ctx.redirect('#/');
 })});

        
   };
    return {
        getCreate,
        postCreate,
        all,
        filtered,
        details,
        mine,
        deleteItem,
        viewEdit,
        postEdit,
        like,
        detailsOther,
    }
}();