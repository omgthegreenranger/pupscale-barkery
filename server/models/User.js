const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Address = require('./Address');

const userSchema = new Schema({
    // _id: {
    //   type: Schema.Types.ObjectId,
    //   required: true
    // },
    firstName: {
        type: String, 
        required: true, 
        trimt: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5
      },
      accessLvl: {
        type: Number,
        require: true
      },
      orders: [Order.schema],
      address: [Address.schema],
});


// TO DO: MAKE SURE WE USE THE SAME Functions as in Mod 22-Unit 24

//set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };


const User = mongoose.model('User', userSchema);

module.exports = User;