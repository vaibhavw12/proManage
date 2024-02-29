const todoModel = require('../models/todo.models.js')
const authModel = require('../models/auth.models.js')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()


const createToDo = async (req, res, next) => {
    const todoObj = req.body
    try {
        const todo = await todoModel.create(todoObj)
        const currentUser = await authModel.findById(_id = todo.createdBy)
        currentUser.createdToDos.push(todo._id)
        await authModel.findByIdAndUpdate(currentUser._id, currentUser)
        res.json({
            status: 'SUCCESS',
            message: 'to do created successfully',
            id: todo._id
        })
    } catch (err) {
        res.json({
            status: 'FAILED',
            message: err.message
        })
        console.log(err.message)
    }
}

const getTodosBySection = async (req, res, next) => {
    try {
        const { section } = req.params;
        const { userId, option } = req.query;

        const timestampField = 'createdAt';
        let startDate, endDate;

        switch (option) {
            case 'Today':
                startDate = new Date();
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date();
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'This Week':
                startDate = new Date();
                startDate.setHours(0, 0, 0, 0);
                startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1));

                endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'This Month':
                startDate = new Date();
                startDate.setDate(1);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(startDate);
                endDate.setMonth(startDate.getMonth() + 1);
                endDate.setDate(0);
                endDate.setHours(23, 59, 59, 999);
                break;
            default:
                startDate = null;
                endDate = null;
                break;
        }

        const query = {
            inSection: section,
            createdBy: userId,
            [timestampField]: startDate && endDate ? { $gte: startDate, $lte: endDate } : undefined,
        };

        const todos = await todoModel.find(query);

        res.status(200).json({ todos });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateChecklist = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const { checkList } = req.body;
        await todoModel.findByIdAndUpdate(
            todoId,
            { $set: { checkList: checkList } },
            { new: true }
        );
        res.status(200).json({ message: 'Checklist updated successfully' });
    } catch (error) {
        console.error('Error updating checklist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSection = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const { inSection } = req.body;
        const updatedTodo = await todoModel.findByIdAndUpdate(
            todoId,
            { $set: { inSection: inSection } },
            { new: true }
        );
        res.status(200).json({ message: 'Todo section updated successfully', updatedTodo });
    } catch (error) {
        console.error('Error updating todo section:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteToDo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const deletedTodo = await todoModel.findByIdAndDelete(todoId);
        await authModel.findByIdAndUpdate(
            deletedTodo.createdBy,
            { $pull: { createdToDos: todoId } }
        );
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const shareToDo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const todo = await todoModel.findById(todoId);
        res.status(200).json({ todo });
    } catch (error) {
        console.error('Error fetching todo details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateToDo = async (req, res, next) => {
    try {
        const { todoId } = req.params;
        const updatetodoObj = req.body
        const updatedTodo = await todoModel.findByIdAndUpdate(todoId, updatetodoObj, { new: true });
        return res.json({ success: true, message: 'Todo updated successfully', updatedTodo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getAnalytics = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const todos = await todoModel.find({ createdBy: userId });
        res.status(200).json({ todos });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createToDo,
    getTodosBySection,
    updateChecklist,
    updateSection,
    deleteToDo,
    shareToDo,
    updateToDo,
    getAnalytics
};

// try {
//     const { section } = req.params;
//     const { userId } = req.query;
//     console.log(option)
//     const todos = await todoModel.find({ inSection: section, createdBy: userId });
//     res.status(200).json({ todos });
// } catch (error) {
//     console.error('Error fetching todos:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
// }