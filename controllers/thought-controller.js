const {User, Thought} = require('../models');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
            console.log(err);
            res.sendStatus(400);
            });
    },
    createThought({body}, res){
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
            })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err));
    },
    getThoughtById({params}, res){
        Thought.findOne({_id: params.thoughtId})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err));

    },
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true})
            .then(thoughtData => {
                if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
    removeThought({params}, res){
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err));
    },
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
            .then(thoughtData => {
                if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
    removeReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;