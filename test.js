const test = require('ava');

test('Dummy success test', t => {
    t.pass();
});

test('Dummy promise test', async t => {
    const pr = Promise.resolve('value');
    t.is(await pr, 'value');
});