import React from 'react';
import classnames from 'classnames';

import PropTypes from 'prop-types';

const TextFieldGroupMod = ({ field, value, label, error, type, onChange, disabled, id, placeholder ='', parentStyle={}, labelStyle = {}, inputStyle = {} }) => {
    return (
        <div className="input-field" style={parentStyle}>
            
            <input 
                id = {id}
                value={value}
                disabled={disabled}
                onChange={onChange}
                type={type} 
                name={field}
                style={inputStyle}
                className={classnames("validate",{ "invalid": error})}
                placeholder={placeholder}
                autoComplete="off"
                autoFocus={true}
            />
            <label className="control-label" data-error={error} style={labelStyle}>{label}</label>
        </div>
    );
};

TextFieldGroupMod.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

TextFieldGroupMod.defaultProps = {
    type: 'text'
};

export default TextFieldGroupMod;