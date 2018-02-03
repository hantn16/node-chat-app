const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generageMessage', () => {
    it('should generate corect message object',() => {
        const from = 'Han Trinh';
        const text = 'Hello everyone';
        const res = generateMessage(from,text);
        expect(res).toMatchObject({from,text});
        expect(typeof res.createdAt).toBe('number');
    });
});
describe('generateLocationMessage',() => {
    it('should generate correct location message object',() => {
        const from = 'Admin';
        const lat = 1;
        const lng = 1;
        const res = generateLocationMessage(from,lat,lng);
        expect(res).toMatchObject({from,url: `https://www.google.com/maps?q=${lat},${lng}`});
        expect(typeof res.createdAt).toBe('number');
    });
});