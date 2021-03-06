const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { schema } = require('./user');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId 
        },
        reactionBody: {
            type: String,
            required: true,
            min: [1, 'Must not be empty'],
            max: [280, 'Must be under 280 characters']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => dateFormat(date)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
    
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, 'Must not be empty'],
            max: [280, 'Must be under 280 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => dateFormat(date)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;