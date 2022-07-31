const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const enquirySchema = new Schema({
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
    type: Number,
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
    get: (timestamp) => dateFormat(timestamp),
  },
  requestedDays:{
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
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

const Enquiry = model('Enquiry', enquirySchema);

module.exports = Enquiry;
