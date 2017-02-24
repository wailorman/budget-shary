import { storiesOf, action, linkTo } from '@kadira/storybook';
import _Person from '../src/components/Person/Person';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../src/styles/index.css';
import '../src/styles/Budget.css';
import '../src/styles/Person.css';

const Person = _Person.WrappedComponent;

const wrap = (child) => {
    return (
        <MuiThemeProvider>
            <div style={{ width: 700 }}>
                {child}
            </div>
        </MuiThemeProvider>
    );
};

storiesOf('Person/Person', module)
    .add('default', () => (
        wrap(
            <Person
                id="1"
                name="Person"
                share="50"
                onChange={action('onChange')}
            />
        )
    ));