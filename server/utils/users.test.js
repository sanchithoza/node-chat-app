const expect = require('expect');
const {Users} = require('./users.js');

describe('users test cases',()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name:'sanchit',
      room:'node'
    },
    {
      id: '2',
      name:'oza',
      room:'react'
    },
    {
      id:'3',
      name:'ankit',
      room:'node'
    }];
  });

  it('should add new user',()=>{
    var users = new Users();
    var user = {
      id:'123',
      name:'sanchit',
      room:'node'
    }
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });
  it('should remove a user',()=>{
    var removedUser = users.removeUser('2');
    expect(removedUser).toBeTruthy();
  });
  it('should not remove a user',()=>{
    var removedUser = users.removeUser('12');
    expect(removedUser).toBeFalsy();
  });
  it('should find a user',()=>{
    var user = users.getUser('1');
    expect(user).toBeTruthy();
  });
  it('should not find a user',()=>{
    var user = users.getUser('10');
    expect(user).toBeFalsy();
  });
  it('should return names of room node',()=>{
    var userList = users.getUserList('node');
    expect(userList).toEqual(['sanchit','ankit']);
  });
  it('should return names of room node',()=>{
    var userList = users.getUserList('react');
    expect(userList).toEqual(['oza']);
  });
});
