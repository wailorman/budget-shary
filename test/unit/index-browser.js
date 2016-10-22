function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../../src', true, /(unit)\.js$/i));
requireAll(require.context('../', true, /(unit)\.js$/i));