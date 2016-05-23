import {getFlatValidationErrors} from '../core/utils'

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

export {
    ValidationErrorsList
};

export default ValidationErrorsList;