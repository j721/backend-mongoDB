const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: 'Name field is required'
    },
    email:{
        type: String,
        required: 'Email is required'
    },
    mobile:{
        type: Number,
        required: 'Phone number is required'
    },
    city:{
        type: String,
        required: 'City Location is required'
    }
});

mongoose.model("User", userSchema);     //connect mongoose to User Model