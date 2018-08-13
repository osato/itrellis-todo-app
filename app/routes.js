var todoList = require('./models/todo-list');

module.exports = function(app) {

    // api route for get method
    app.get('/api/todos', function(req, res) {
        // use mongoose to get all nerds in the database
        todoList.find(function(err, todos) {       
            if (err) {
                res.send(err);
            } else {
            	res.json(todos); // return all data in JSON format
            }
        });
    });

    // api route for post method
    app.post('/api/todos', function(req, res, next) {

    	// create instance of todoList
        let todoObj = new todoList({
        	task: req.body.task,
        	due: req.body.due,
        	done: req.body.done
        });

        todoObj.save(function(err, todo) {       
            if (err) {
                res.send(err);
            } else {
            	//res.json(todos); 
            	// retrieve and return all data in JSON format
	            todoList.find(function(err, todos) {
	                if (err)
	                    res.send(err)
	                res.json(todos);
	            });
            }
        });
    });

    // api route for delete method
    app.delete('/api/todos/:id', function(req, res, next) {
        let id = req.params.id;
        let query = {_id: id};
        
        todoList.remove(query, function(err, todo) {       
            if (err) {
                res.send(err);
            } else if (todo) {
            	//res.json({success:true, message: 'Deleted successfully'});
            	// get and return all the todos after you create another
	            todoList.find(function(err, todos) {
	                if (err)
	                    res.send(err)
	                res.json(todos);
	            });
            } else {
            	res.json({success:false});
            }
        });
    });

    // route to handle all requests from angular
    app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); // load index.html file
    });

};
