const chai = require('chai');

const chaiEnzyme = require('chai-enzyme');
var chaiImmutable = require('chai-immutable');

chai.use(chaiImmutable);
chai.use(chaiEnzyme());

module.exports = chai;