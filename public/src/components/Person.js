import ValidationErrorsList from './ValidationErrorsList'

import '../styles/Person.css'

const Person = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        share: React.PropTypes.string,
        changePerson: React.PropTypes.func,
        removePerson: React.PropTypes.func,
        validationErrors: React.PropTypes.object
    },

    onChange(event){

        const targetClassName = event.target.className;

        const name = targetClassName == 'Person__name-input' ? event.target.value : this.props.name;
        const share = targetClassName == 'Person__share-input' ? event.target.value : this.props.share;

        // Person__name-input
        // Person__share-input

        this.props.changePerson({name, share});

    },

    onRemove(){
        this.props.removePerson();
    },

    render: function () {

        return (
            <div className="Person">
                
                <ValidationErrorsList errors={this.props.validationErrors} />

                <input
                    className="Person__name-input"
                    type="text"
                    ref="name"
                    placeholder="Name"
                    value={this.props.name}
                    onChange={this.onChange}
                />

                <input
                    className="Person__share-input"
                    size="3"
                    type="text"
                    ref="share"
                    placeholder="Share"
                    value={this.props.share}
                    onChange={this.onChange}
                />%

                &nbsp;
                <button className="Person__remove-button" onClick={this.onRemove}>
                    x
                </button>
            </div>
        );
    }
});

export default Person;
