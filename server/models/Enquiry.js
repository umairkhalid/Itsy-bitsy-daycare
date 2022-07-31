const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  suburb: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  postCode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  childFirstName: {
    type: String,
    required: true,
    trim: true
  },
  childLastName: {
    type: String,
    required: true,
    trim: true
  },
  childDateOfBirth: {
    type: Date,
  },
  requestedDays:{
    type: Array,
  },
  branch: [{
      type: Schema.Types.ObjectId,
      ref: 'Branch',
  }],
  branchRoom: [{
    type: Schema.Types.ObjectId,
    ref: 'BranchRoom',
  }]
});

const Enquiry = mongoose.model('Enquiry', userSchema);

module.exports = Enquiry;
