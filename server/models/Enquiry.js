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
    type: Number,
    required: true
  },
  email1: {
    type: String,
    required: true,
  },
  phone1: {
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
  organisation: {
    type: Schema.Types.ObjectId,
    ref: 'Organisation',
  },
  branch: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
  },
  branchRoom: {
    type: Schema.Types.ObjectId,
    ref: 'BranchRoom',
  }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
//   if (this.isNew)
//   {
//     this.status=true;
//   }


  next();
});


const Enquiry = mongoose.model('Enquiry', userSchema);

module.exports = Enquiry;
