import { configure } from '@kadira/storybook';

function loadStories() {

    function requireAll(r) { r.keys().forEach(r); }
    requireAll(require.context('../public/test/stories/', true, /(story)\.js$/i));

}

configure(loadStories, module);