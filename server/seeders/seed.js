//This file will only create **** ONE MAIN**** login for user which will have access to backend
const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
  
    const users = await User.insertMany([
      { firstName: 'Murad', lastName: 'Ali', email: 'murad.manni@gmail.com', password: 'abcd123' , userType:'SUPER_ADMIN', status: true, resetCode : 'none'},
      
    ]);

    console.log('User added!');
    process.exit(0);
});