import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error, type, onChange }) => {
    return (
        <div className="input-field">
            
            <input 
                value={value}
                onChange={onChange}
                type={type} 
                name={field} 
                className={classnames("validate",{ "invalid": error})}/>
            <label className="control-label" data-error={error}>{label}</label>
        </div>
    )
}

TextFieldGroup.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;