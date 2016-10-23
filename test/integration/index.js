function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../../src', true, /(int)\.js$/i));
requireAll(require.context('./', true, /(int)\.js$/i));