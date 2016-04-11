import TestUtils from 'react-addons-test-utils'
import Persons from '../../../src/containers/Persons'

import { fakeState } from '../../fixtures/fake-state'
import { generateStore } from '../../../src/store'

describe("INT / Containers / Persons", function () {

    let store;

    const setup = function () {
        let props = {
            persons: fakeState.persons,
            actions: {
                removePerson: sinon.spy(),
                newPerson: sinon.spy(),
                changePerson: sinon.spy()
            }
        };

        let component = TestUtils.renderIntoDocument(<Persons {...props} />);
        let output = ReactDOM.findDOMNode(component);

        return {
            props,
            output,
            component
        };
    };

    it(`should render 2 persons`, () => {

        const {output, component} = setup();
        const personNodes = TestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'Person'
        );

        expect(personNodes.length).to.eql(2);

    });

    it(`should have 2 buttons`, () => {

        const {output, component} = setup();

        const buttons = TestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'Person__remove-person'
        );

        expect(buttons.length).to.eql(2);

    });

    describe("person removing", ()=> {

        it(`should remove first person`, () => {

            const {output, component, props} = setup();

            const buttons = TestUtils.scryRenderedDOMComponentsWithClass(
                component,
                'Person__remove-person'
            );

            TestUtils.Simulate.click(buttons[0]);

            expect(props.actions.removePerson.lastCall.args[0]).to.eql("1");

        });

        it(`should remove second person`, () => {

            const {output, component, props} = setup();

            const buttons = TestUtils.scryRenderedDOMComponentsWithClass(
                component,
                'Person__remove-person'
            );

            TestUtils.Simulate.click(buttons[1]);

            expect(props.actions.removePerson.lastCall.args[0]).to.eql("2");

        });

    });

    describe("new person", ()=> {
        
        it(`should call newPerson`, () => {

            const {output, component, props} = setup();

            const newButton = TestUtils.findRenderedDOMComponentWithClass(
                component,
                'Persons__new-person'
            );

            TestUtils.Simulate.click(newButton);

            expect(props.actions.newPerson.called).to.eql(true);

        });
        
    });

    describe("fields edit", ()=> {

        it(`should change state name`, () => {

            const {output, component, props} = setup();

            const nameInput = component.refs.person_1.refs.name;

            nameInput.value = 'John';

            TestUtils.Simulate.change(nameInput);

            const changePersonCallArgument = props.actions.changePerson.lastCall.args;

            expect(changePersonCallArgument[0]).to.eql('1');
            expect(changePersonCallArgument[1].name).to.eql('John');
            expect(changePersonCallArgument[1].share).to.eql('40');


        });

        it(`should change state share`, () => {

            const {output, component, props} = setup();

            const shareInput = component.refs.person_1.refs.share;

            debugger;

            shareInput.value = '60';

            TestUtils.Simulate.change(shareInput);

            const changePersonCallArgument = props.actions.changePerson.lastCall.args;

            expect(changePersonCallArgument[0]).to.eql('1');
            expect(changePersonCallArgument[1].name).to.eql('Mike');
            expect(changePersonCallArgument[1].share).to.eql('60');

        });

    });

});