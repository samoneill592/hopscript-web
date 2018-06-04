import React, { Component } from 'react';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderTextInput = (fieldProps) => {
  const {
    input,
    type,
    placeholder,
    fontColor,
    borderRadius,
    borderColor,
    maxLength,
    showError,
    normalize,
    meta: { dirty, touched, error }
  } = fieldProps;

  const fieldStateColor = () => {
    if (error && showError) {
      return Colors.warning;
    } else if (borderColor) {
      return borderColor;
    }
    return Colors.inputBorderColor;
  };

  return (
    <div>
      <input
        {...input}
        type="text"
        placeholder={placeholder}
        className={`${borderColor ? 'ba' : 'bn'} w-100`}
        style={{
          color: fontColor || Colors.inputFontColor,
          borderRadius: BorderRadius.all,
          borderColor: borderColor || Colors.moonGray
        }}
        maxLength={maxLength}
        normalize={normalize}
      />
      {dirty &&
        error &&
        showError && (
          <div className="mb4 mt4">
            <RenderAlert error={{ message: error }} />
          </div>
        )}
    </div>
  );
};

const InputText = props => <InputUI component={renderTextInput} {...props} />;

export default InputText;
