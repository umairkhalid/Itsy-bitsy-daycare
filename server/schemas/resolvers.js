const { AuthenticationError } = require('apollo-server-express');

const { User , Branch, BranchRoom, Enquiry} = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    
    allUsers: async () =>{
      const user = await User.find({});
      return  user;
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne(context.user.email);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    enquiries: async() => {
      const enquiries = await Enquiry.find({})
      .sort({ createdAt: -1 })
      .populate('branch')
      .populate('branchRoom');
      return enquiries;
    },

    enquiry: async (parent, { enquiryId }) => {
      return Enquiry.findOne({ _id: enquiryId });
    },
    
    allBranches: async() => {
      const branches = await Branch.find({}).populate('branchRoom');
      return branches;
    },

    allBranchRooms: async() => {
      const branchRooms = await BranchRoom.find({});
      return branchRooms;
    },
    
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect user credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addBranchRoom: async(parent,{roomName, roomCapacity, roomSupervisor, branchId }) => {
      const branchRoom = await BranchRoom.create({roomName: roomName, roomCapacity: roomCapacity, roomSupervisor: roomSupervisor});
      const updateBranch = await Branch.findByIdAndUpdate(branchId, {$addToSet: { branchRoom : branchRoom._id }}, { new: true });

      console.log(branchRoom, updateBranch)
      return (branchRoom);
    },

    addEnquiry: async (parent, args) => {
      const enquiry = await Enquiry.create(args);

      return enquiry ;
    },
  }
};

module.exports = resolvers;
