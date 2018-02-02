const expect = require('expect');

var {generateMessage} = require('./message');

describe('generageMessage', () => {
    it('should generate corect message object',(done) => {
        const from = 'Han Trinh';
        const text = 'Hello everyone';
        const res = generateMessage(from,text);
        expect(res).toMatchObject({from,text});
        expect(typeof res.createdAt).toBe('number');
        done();
    });
});