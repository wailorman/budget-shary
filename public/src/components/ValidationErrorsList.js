import {getFlatValidationErrors} from '../core/components-utils'

import '../styles/ValidationErrorsList.css'

const ValidationErrorsList = ({errors})=> {
    const errorMessages = getFlatValidationErrors(errors)
        .map((errorMessage, index)=> {
            return (
                <div key={index} className="ValidationErrorsList_errorMessage">
                    {errorMessage}
                </div>
            );
        });

    return (
        <div className="ValidationErrorsList">
            { errorMessages }
        </div>
    );
};

ValidationErrorsList.propTypes = {
    errors: React.PropTypes.object
};

export {
    ValidationErrorsList
};

export default ValidationErrorsList;