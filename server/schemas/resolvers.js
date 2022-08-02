const { AuthenticationError } = require('apollo-server-express');
const randToken = require('rand-token');
const { User , Branch, BranchRoom, Enquiry} = require('../models');
const { signToken } = require('../utils/auth');
const sendMail = require('../utils/Email');


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
      const enquiry = await Enquiry.findOne({ _id: enquiryId })
      .populate('branch')
      .populate('branchRoom');
      return enquiry;
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
      console.log(args);
      const enquiry = await Enquiry.create(args);

      return enquiry ;
    },

    resetPassword: async(parent, arg)=>{

      let token =  randToken.generate(6);

      const user = await User.findOneAndUpdate({email: arg.email},{resetCode: token},{new: true});

      const userData = {
        email: arg.email,
        code : token
      }
      
      sendMail('Reset', userData);
      return (user);
    },

    updatePassword: async (parent, args) => {
      console.log("UPDATE PASSWORD",args);
      const userData= await User.findOneAndUpdate({email: args.email, resetCode: args.resetCode}, {password: args.password, resetCode: ""}, { returnOriginal: false} );
      
      
      //sendMail('PassChange', userData);
      // console.log(result);
      return userData;
    },
    
  }
};

module.exports = resolvers;
