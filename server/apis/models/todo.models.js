const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    isChecked: {
        type: Boolean,
        default: false,
    },
});

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['HIGH PRIORITY', 'MODERATE PRIORITY', 'LOW PRIORITY'],
        required: true,
    },
    checkList: {
        type: [checklistSchema],
        validate: [
            {
                validator: function (checkList) {
                    return checkList.length >= 1;
                },
                message: 'ToDOs must have at least one checklist.',
            },
        ],
    },
    dueDate: {
        type: String,
        default: null,  // Set default value to null
    },
    inSection: {
        type: String,
        enum: ['Backlog', 'ToDo', 'Inprogress', 'Done'],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },    
}, { timestamps: true });

const ToDos = mongoose.model('ToDos', todoSchema);

module.exports = ToDos;
