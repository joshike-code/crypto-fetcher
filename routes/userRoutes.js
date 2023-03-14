const express = require('express');
// const userController = require('./../controllers/userController');
const {getAllUsers, createUsers, getUser, updateUser, deleteUser} = require('./../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;