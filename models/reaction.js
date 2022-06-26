const {Schema, model, Types} = require('mongoose');

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
    }
);

const Reaction = model('Reaction', ReactionSchema);
module.exports = Reaction;