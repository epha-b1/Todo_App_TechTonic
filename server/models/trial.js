const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{type:String,require:true},
    description : {String}
});

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;

// import Packages
// Design schema 
// Prepare for export
// Export schema 