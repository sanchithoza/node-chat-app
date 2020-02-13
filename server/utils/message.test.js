var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message.js');


describe('function generate message',()=>{
  it('should return correct message',()=>{
    var from = 'sanchit';
    var text = 'testing string';
    var message = generateMessage(from,text);

    expect(message.from).toBe('sanchit');
    expect(message.text).toBe('testing string');
    expect(message.createdAt).toBeA('number');
  });
});
describe('function generate location messsage',()=>{
  it('should return correct location',()=>{
    var from = 'test';
    var lat = '1';
    var lng = '1';
    var message = generateLocationMessage(from,lat,lng);
    expect(message.from).toBe('test');
    expect(message.url).toBe('https://www.google.com/maps?q=1,1');
    //expect(message.createdAt).toHaveReturned('number');

  });
});
