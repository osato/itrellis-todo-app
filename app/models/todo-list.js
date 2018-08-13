// mongoose module
var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    task: {
        type: String,
        default: ''
    },
    due: {
    	type: Date,
    	default: Date.now()
    },
    done: Boolean
});

module.exports = mongoose.model('todo_list', todoSchema);