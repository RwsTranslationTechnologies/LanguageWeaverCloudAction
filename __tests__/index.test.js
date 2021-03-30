const utils = require('../src/utils');

test('wait throws invalid number', async () => {
    await expect(utils.wait('foo')).rejects.toThrow('milliseconds not a number');
});

test('wait 500 ms', async () => {
    const start = new Date();
    await utils.wait(500);
    const end = new Date();
    var delta = Math.abs(end - start);
    expect(delta).toBeGreaterThan(450);
});
