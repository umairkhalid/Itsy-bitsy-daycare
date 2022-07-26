//This file will only create **** ONE MAIN**** login for user which will have access to backend
const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();

    await User.create(
      [
        { 
          firstName: 'Murad',
          lastName: 'Ali',
          email: 'murad.manni@gmail.com',
          password: 'abcd123',
          userType:'SUPER_ADMIN',
          resetCode : 'none'
        },
      ]
    );

    await User.create(
      [
        { 
          firstName: 'Umair',
          lastName: 'Khalid',
          email: 'umairkhalid@fastmail.fm',
          password: 'xyz12345',
          userType:'SUPER_ADMIN',
          resetCode : 'none'
        },
      ]
    );

    console.log('User added!');
    process.exit(0);
});