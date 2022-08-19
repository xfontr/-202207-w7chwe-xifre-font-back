import mongoose, { model, Schema } from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    const newDocument = { ...ret };

    // eslint-disable-next-line no-underscore-dangle
    delete newDocument.__v;
    // eslint-disable-next-line no-underscore-dangle
    delete newDocument._id;

    return newDocument;
  },
});

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  biopraphy: {
    type: String,
    required: true,
  },
  contacts: {
    friends: [Schema.Types.ObjectId],
    enemies: [Schema.Types.ObjectId],
  },
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    const newDocument = { ...ret };
    delete newDocument.password;
    return newDocument;
  },
});

export const User = model("User", userSchema, "users");
