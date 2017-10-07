import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ field, value, label, error, type, onChange, disabled, id, autoFocus=false }) => {
    return (
        <div className="input-field">
            
            <input 
                id = {id}
                value={value}
                disabled={disabled}
                onChange={onChange}
                type={type} 
                name={field} 
                className={classnames("validate",{ "invalid": error})}
                autoComplete="off"
                autoFocus={autoFocus}
                autoCorrect={false}/>
            <label className="control-label" data-error={error}>{label}</label>
        </div>
    )
}

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;