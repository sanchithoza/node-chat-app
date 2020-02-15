const expect = require('expect');
var {isRealString} = require('./validation.js');
describe('Validation Script',()=>{
  it('should reject non string value',()=>{
      expect(isRealString(10)).toBeFalsy();
  });
  it('should reject string only with spaces',()=>{
      expect(isRealString('   ')).toBeFalsy();
  });
  it('should Allow string with non-space character',()=>{
      expect(isRealString(' user 1 ')).toBeTruthy();
  });
});
