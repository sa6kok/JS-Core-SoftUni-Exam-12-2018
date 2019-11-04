const petModel = function () {
   const create = function (params) {
      let category = $(".input option:selected").text();
    
      
      var data = {
         name: params.name,
         description: params.description,
         imageURL: params.imageURL,
         category: category,
         likes: 0,
      };

      var url = `appdata/${storage.appKey}/pets`;

      return requester.post(url, data);
   };

   const getAll = function () {
      let url = `appdata/${storage.appKey}/pets/?query={}&sort={"likes": -1}`;

      return requester.get(url);
   };

   const getItem = function (id) {
      let url = `appdata/${storage.appKey}/pets/${id}`;

      return requester.get(url);
   };

   const getMine = function () {
      let url = `appdata/${storage.appKey}/pets/`;
      let userId = storage.getData('userInfo').id;
      url += `?query={"_acl.creator":"${userId}"}`;

      return requester.get(url);
   };

   const deleteItem = function (id) {
      let url = `appdata/${storage.appKey}/pets/${id}`;

      return requester.del(url);
   };
   const edit = function (params, id, data) {
     
      data.description = params.description
      var url = `appdata/${storage.appKey}/pets/${id}`;

      return requester.put(url, data);
   };

   const likeItem = function(params, id, data) {
      data.likes = +data.likes;
      data.likes += 1;
      var url = `appdata/${storage.appKey}/pets/${id}`;
      return requester.put(url, data);
   };

   return {
      create,
      getAll,
      getItem,
      getMine,
      deleteItem,
      edit,
      likeItem,
   };
}();