const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
  
  firstNameParent1: {
    type: String,
    required: true,
    trim: true
  },
  lastNameParent1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine1Parent1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2Parent1: {
    type: String,
    trim: true
  },
  suburbParent1: {
    type: String,
    required: true,
    trim: true
  },
  stateParent1: {
    type: String,
    required: true,
    trim: true
  },
  postCodeParen1: {
    type: Number,
    required: true
  },
  emailParent1: {
    type: String,
    required: true,
  },
  phoneParen1: {
    type: String,
    required: true,
  },

  firstNameParent2: {
    type: String,
    required: true,
    trim: true
  },
  lastNameParent2: {
    type: String,
    required: true,
    trim: true
  },
  addressLine1Parent2: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2Parent2: {
    type: String,
    trim: true
  },
  suburbParent2: {
    type: String,
    required: true,
    trim: true
  },
  stateParent2: {
    type: String,
    required: true,
    trim: true
  },
  postCodeParen2: {
    type: Number,
    required: true
  },
  emailParent2: {
    type: String,
  },
  phoneParen2: {
    type: String,
    required: true,
  },

  firstNameEmergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  lastNameEmergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  addressLine1EmergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2EmergencyContact: {
    type: String,
    trim: true
  },
  suburbEmergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  stateEmergencyContact: {
    type: String,
  },
  postCodeEmergencyContact: {
    type: Number,
  },
  emailEmergencyContact: {
    type: String,
  },
  phoneEmergencyContact: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
  },
  daysAllocated: {
    type: Array,
  },
  branchRoom: [{
    type: Schema.Types.ObjectId,
    ref: 'BranchRoom',
  }]
});


const Child = mongoose.model('Child', userSchema);

module.exports = Child;
