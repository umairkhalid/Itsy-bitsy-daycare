const { AuthenticationError } = require('apollo-server-express');
const { UserMain } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    
    allUsers: async () =>{
      const user = await UserMain.find({});
      const token = signToken(user);
      return  {token, user};
    },

    // user: async (parent, args, context) => {
    //   if (context.user) {
    //     const user = await UserMain.findById(context.user._id);

    //     return user;
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },
    
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await UserMain.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await UserMain.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    
    loginmain: async (parent, { email, password }) => {
      const user = await UserMain.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
