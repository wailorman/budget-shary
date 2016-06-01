/*

    Description: https://gist.github.com/wailorman/f42cfd05e17b0159a483f07e4012b77a

 How to use:

 Inside your mocha's describe scope, type this:
 ```
 sinonSandbox((sandbox)=> {
     sandbox.spy(...);
     sandbox.stub(...);
 })
 ```
 Use this function only in mocha scope!

 */

const sinonSandbox = (initializer)=> {

    var sandbox;

    // check we are inside of mocha scope
    if (typeof beforeEach != 'function')
        throw `Can't find beforeEach function. Ensure you using this function inside mocha scope`;

    if (typeof afterEach != 'function')
        throw `Can't find afterEach function. Ensure you using this function inside mocha scope`;

    beforeEach(()=> {
        sandbox = sinon.sandbox.create();
        initializer(sandbox);
    });

    afterEach(()=> {
        sandbox.restore();
    });
    
    return sandbox;

};

module.exports = sinonSandbox;