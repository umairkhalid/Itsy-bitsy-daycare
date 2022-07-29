//This file will only create **** ONE MAIN**** login for user which will have access to backend
const db = require('../config/connection');
const { User, Branch, BranchRoom } = require('../models');

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
    
    await BranchRoom.deleteMany();

    const branchroom = await BranchRoom.insertMany([
      {
        roomName: 'Pre-school',
        roomCapacity: 15,
        roomSupervisor: 'John Cena'
      },
      {
        roomName: 'Elimentary',
        roomCapacity: 8,
        roomSupervisor: 'Christi'
      },
      {
        roomName: 'Primary',
        roomCapacity: 12,
        roomSupervisor: 'Sylvia Dsouza'
      }
    ]);

    await Branch.deleteMany();

    await Branch.insertMany([
      {
        branchName: 'Lakemba Branch',
        addressLine1: '529 Canterbury Rd',
        addressLine2: '',
        suburb: 'Lakemba',
        state: 'NSW',
        postCode: '2195',
        email1: 'lakemba.itsy@itsybitsy.com',
        email2: '',
        phone1: '0405685654',
        phone2: '',
        branchRoom: branchroom[0]._id
      }
    ])

    console.log('User added!');
    console.log('Branch added!');
    console.log('BranchRoom added!');
    process.exit(0);
});