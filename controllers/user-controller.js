const {User, Thought} = require('../models');

const userController = {
    getAllUsers(req, res){
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    createUser({body}, res){
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    },
    getUserById({params}, res){
        User.findOne({_id: params.userId})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    },
    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.userId}, body, {new: true, runValidators: true})
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
    },
    removeUser({params}, res){
        User.findOneAndDelete({_id: params.userId})
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    },
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}}
            )
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    },
    removeFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}}
            )
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;