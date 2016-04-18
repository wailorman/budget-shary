import Person from '../../../src/components/Person'

import { fakeState } from '../../fixtures/fake-state'

describe("INT / Components / Person", ()=> {


    const setup = function () {
        let props = {
            ...fakeState.persons[0],

            removePerson: sinon.spy(),
            changePerson: sinon.spy()
        };

        let component = TestUtils.renderIntoDocument(<Person {...props} />);
        let output = ReactDOM.findDOMNode(component);

        return {
            props,
            output,
            component
        };
    };

    it(`should have name input`, () => {

        const {component} = setup();

        const nameInput = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'Person__name-input'
        );

        expect(nameInput).to.exist;
        expect(nameInput.localName).to.eql('input');

    });

    it(`should have share input`, () => {

        const {component} = setup();

        const shareInput = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'Person__share-input'
        );

        expect(shareInput).to.exist;
        expect(shareInput.localName).to.eql('input');

    });

    it(`should have remove button`, () => {

        const {component} = setup();

        const removeButton = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'Person__remove-button'
        );

        expect(removeButton).to.exist;
        expect(removeButton.localName).to.eql('button')

    });

    describe("removing", ()=> {

        it(`should call removePerson callback on remove button click`, () => {

            const {props, component} = setup();

            const removeButton = TestUtils.findRenderedDOMComponentWithClass(
                component,
                'Person__remove-button'
            );

            TestUtils.Simulate.click(removeButton);

            expect(props.removePerson.called).to.eql(true);
            expect(props.removePerson.lastCall.args[0]).to.eql(undefined);

        });

    });

    describe("edit", ()=> {

        it(`should call changePerson on name change`, () => {

            const {props, component} = setup();

            const nameInput = TestUtils.findRenderedDOMComponentWithClass(
                component,
                'Person__name-input'
            );

            nameInput.value = 'Another value';

            TestUtils.Simulate.change(nameInput);

            const expectedCallbackArgs = {
                name: 'Another value',
                share: props.share
            };

            expect(props.changePerson.called).to.eql(true);
            expect(props.changePerson.lastCall.args[0]).to.eql(expectedCallbackArgs);
        });

        it(`should call changePerson on share change`, () => {

            const {props, component} = setup();

            const shareInput = TestUtils.findRenderedDOMComponentWithClass(
                component,
                'Person__share-input'
            );

            shareInput.value = '50';

            TestUtils.Simulate.change(shareInput);

            const expectedCallbackArgs = {
                name: props.name,
                share: '50'
            };

            expect(props.changePerson.called).to.eql(true);
            expect(props.changePerson.lastCall.args[0]).to.eql(expectedCallbackArgs);

        });

    });


});