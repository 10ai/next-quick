import mongoose from 'mongoose';

export interface User extends mongoose.Document {
    first_name: string;
    last_name: string;
    email: string;
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<User>({
    first_name: {
        /* The name of the user */

        type: String,
        required: [true, 'Please provide a first for this user.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    last_name: {
        /* The name of the user */

        type: String,
        required: [true, 'Please provide a last for this user.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
