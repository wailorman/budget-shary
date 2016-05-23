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

        const validationErrorsMessages = getFlatValidationErrors(this.props.validationErrors)
            .map((errorMessage, index)=> {
                return (
                    <div key={index} className="Person__validationErrorMessage">
                        {errorMessage}
                    </div>
                );
            });

        return (
            <div className="Person">
                <div className="Person__validationErrors">
                    {validationErrorsMessages}
                </div>

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
                    type="text"
                    ref="share"
                    placeholder="Share"
                    value={this.props.share}
                    onChange={this.onChange}
                />

                <button className="Person__remove-button" onClick={this.onRemove}>
                    x
                </button>
            </div>
        );
    }
});

export const getFlatValidationErrors = function (validationErrorsObject = {}) {

    const allMessagesArray = _(validationErrorsObject).values().compact().value();
    return _.flatten(allMessagesArray);

};

export default Person;
