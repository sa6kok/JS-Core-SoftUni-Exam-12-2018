const storage = function () {
    const appKey = 'kid_BJ1SnRXgV';
    const appSecret = 'bf18630825f24e5ca90ab92dcc45d290';
    const masterKey = '2f4df980834c43c486f9649511b3d352';

    const saveData = function (key, value) {
        localStorage.setItem(appKey + key, JSON.stringify(value));
    };

    const getData = function (key) {
        return JSON.parse(localStorage.getItem(appKey + key));
    };

    const deleteData = function(key) {
        localStorage.removeItem(appKey + key);
    };

    const saveUser = function(data){
        saveData('userInfo', {
            id: data._id,
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name
        });

        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function(){
        deleteData('authToken');
        deleteData('userInfo');
    };

    return {
        saveData,
        getData,
        deleteData,
        appKey,
        appSecret,
        masterKey,
        saveUser,
        deleteUser
    };
}();