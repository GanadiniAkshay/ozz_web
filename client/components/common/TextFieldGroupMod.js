import React from 'react';
import classnames from 'classnames';

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
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

TextFieldGroupMod.defaultProps = {
    type: 'text'
};

export default TextFieldGroupMod;