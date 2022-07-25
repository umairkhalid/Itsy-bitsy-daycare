//This file will only create **** ONE MAIN**** login for user which will have access to backend
const db = require('../config/connection');
const { UserMain } = require('../models');

db.once('open', async () => {
    await UserMain.deleteMany();
  
    const users = await UserMain.insertMany([
      { firstName: 'Murad', lastName: 'Ali', email: 'murad.manni@gmail.com', password: 'abcd123' , resetCode : 'none'},
      
    ]);

    console.log('User added!');
    process.exit(0);
});