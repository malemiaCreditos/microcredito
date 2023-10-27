import { Schema, model, models } from "mongoose";

const UserSchema = new Schema ({
    email: {
        type: String,
        unique: [true, 'este email ja existe!'],
        required: [true, 'Necessario email!'],
    },
    username: {
        type: String,
        required: [true, 'Nome do usuario necessario!'],
    },
    image: {
        type: String,
    }
})

const User = models.User || model("User", UserSchema);

export default User;