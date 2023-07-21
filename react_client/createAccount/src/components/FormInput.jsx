import React from 'react';

import PropTypes from 'prop-types';

const FormInput = (props) => {
    const { label, ...inputProps } = props;

    return (
        <div className="form-group">
            <label htmlFor={inputProps.id}>{label}</label>
            <input className="form-control" {...inputProps} />
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
};

export default FormInput;

