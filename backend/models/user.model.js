import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        isAdmin: {
            type: Boolean,
            reqiured: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);

export default User;