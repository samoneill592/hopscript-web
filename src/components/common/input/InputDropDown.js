import React from 'react';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderDropDown = (fieldProps) => {
  const {
    options,
    input,
    fontColor,
    borderRadius,
    borderColor,
    placeholder,
    meta: { touched, error }
  } = fieldProps;
  return (
    <div>
      <div className="dropdown ba mt2 mb2 f5 relative flex bg-white"
        style={{
          color: fontColor || Colors.inputFontColor,
          borderRadius: borderRadius || BorderRadius.all,
          borderColor: borderColor || Colors.inputBorderColor
        }}
      >
        <select {...input}>
          <option value="" hidden defaultValue disabled>
            {placeholder}
          </option>
          {options &&
          options.map(option => (
            <option
              value={option.value || option}
              key={option.id || option}
              className="f5 dark-gray"
            >
              {option.display || option}
            </option>
          ))}
        </select>
      </div>
      {touched && error && <div className="orange">{error}</div>}
    </div>
  );
};

const InputDropDown = props => <InputUI component={renderDropDown} {...props} />;

export default InputDropDown;
