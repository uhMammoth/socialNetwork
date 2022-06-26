const router = require('express').Router();
const {
    getAllUsers,
    createuser,
    getUserById,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');
// api/users/
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
// api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);    //User.deleteMany({thoughts})
// api/users/:userId/friends
router
    .route('/:userId/friends')
    .post(addFriend);
// api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .delete(removeFriend);

module.exports = router;