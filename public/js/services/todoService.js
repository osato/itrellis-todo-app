// TODO Service
angular.module('todoService', []).factory('TodoService', ['$http', function($http) {

    return {
        // call to get all todo list
        get: function() {
            return $http.get('/api/todos');
        },

        // POST call to create a new todo list
        create: function(todoObj) {
            return $http.post('/api/todos', todoObj);
        },

        // call to DELETE a todo list
        delete: function(id) {
            return $http.delete('/api/todos/' + id);
        }
    }       

}]);