import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    _id: {type: Schema.Types.ObjectId},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select:0 },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// password hashed
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));

  next();
});

// check user exist or not
userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email: email }).select("+password");
};

// password matching
userSchema.statics.isPassMatched = async function (
  plainPass: string,
  hashedPass: string,
) {
  return await bcrypt.compare(plainPass, hashedPass);
};

export const User = model<TUser, UserModel>('User', userSchema);
