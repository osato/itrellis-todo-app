// Todo Controller
angular.module('todoController', []).controller('TodoController', function($scope, TodoService) {
	$scope.todoData = [];
	$scope.todoObj = {
		task: '',
		due: new Date(),
		done: false
	};

	$scope.currentDate = new Date();

    $scope.getAllTodos = function() {
    	TodoService.get().then(function(res) {
    		$scope.todoData = res.data;
    		angular.forEach($scope.todoData, function(todo) {
    			todo.dateCheck = false;
    			var due = new Date(todo.due),
    				currentDate = new Date($scope.currentDate.toDateString()),
    				dueDate = new Date(due.toDateString());
    			if (currentDate > dueDate) {
    				todo.dateCheck = true;
    			}
    		});
    		console.log('todoData...', $scope.todoData);
    	}, function(err) {
    		console.log('Error' + err);
    	});
    };

  	$scope.getAllTodos();

  	$scope.createTodo = function() {
  		TodoService.create($scope.todoObj).then(function(res) {
  			// Clear form input
  			$scope.todoObj = {
				task: '',
				due: new Date(),
				done: false
  			}; 

  			$scope.todoData = res.data;
  			angular.forEach($scope.todoData, function(todo) {
    			todo.dateCheck = false;
    			var due = new Date(todo.due),
    				currentDate = new Date($scope.currentDate.toDateString()),
    				dueDate = new Date(due.toDateString());
    			if (currentDate > dueDate) {
    				todo.dateCheck = true;
    			}
    		});
  			
  		}, function(err) {
  			console.log('Error' + err);
  		});
  	};

  	$scope.deleteTodo = function(id) {
  		TodoService.delete(id).then(function(res) {
  			$scope.todoData = res.data;
  			angular.forEach($scope.todoData, function(todo) {
    			todo.dateCheck = false;
    			var due = new Date(todo.due),
    				currentDate = new Date($scope.currentDate.toDateString()),
    				dueDate = new Date(due.toDateString());
    			if (currentDate > dueDate) {
    				todo.dateCheck = true;
    			}
    		});
  		}, function(err) {
  			console.log(err);
  		});
  	};

  	$scope.displaySubForm = false;
  	$scope.subTodoObj = {
		task: '',
		done: false
	};

  	$scope.addSubTodo = function(todo) {
  		$scope.displaySubForm = true;
  		$scope.todoObject = todo;
  		if (!$scope.todoObject.subTodo) {
  			$scope.todoObject.subTodo = [];
  		}
  	};

  	$scope.addSubTask = function() {
  		$scope.displaySubForm = false;
  		$scope.todoObject.subTodo.push({task: $scope.subTodoObj.task, done: $scope.subTodoObj.done});
        $scope.subTodoObj.task = '';
        $scope.subTodoObj.done = false;
  	};

  	$scope.cancel = function() {
  		$scope.displaySubForm = false;
  	};

  	$scope.delete = function() {
        var oldTodos = $scope.todoObject.subTodo;
        $scope.todoObject.subTodo = [];
        angular.forEach(oldTodos, function(todo) {
           if (!todo.done) $scope.todoObject.subTodo.push(todo);
        });
    };

});