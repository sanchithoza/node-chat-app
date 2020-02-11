var expect = require('expect');
var {generateMessage} = require('./message.js');


describe('function generate message',()=>{
  it('should return correct message',()=>{
    var from = 'sanchit';
    var text = 'testing string';
    var message = generateMessage(from,text);

    expect(message.from).toBe('sanchit');
    expect(message.text).toBe('testing string');
    //expect(message.createdAt).toBe('number');
  });
});
