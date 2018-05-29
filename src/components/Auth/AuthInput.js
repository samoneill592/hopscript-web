import React from 'react';
import { Field } from 'redux-form';
import { User, Lock } from 'react-feather';
import { RenderAlert } from '../common';
import { BorderRadius, Colors } from '../../config/styles';

const renderInput = (field) => {
  const {
    input,
    type,
    placeholder,
    fontColor,
    borderRadius,
    borderColor,
    meta: { touched, error }
  } = field;
  return (
    <div>
      <div
        className="flex items-center pa2 ba mb3 w100"
        style={{
          borderRadius: BorderRadius.all,
          borderColor: borderColor || Colors.moonGray
        }}
      >
        <div className="pa1">
          {input.name === 'email' ? (
            <User color={touched && error ? 'red' : Colors.brandPrimary} />
          ) : (
            <Lock color={touched && error ? 'red' : Colors.brandPrimary} />
          )}
        </div>

        <div className="bl w-100" style={{ borderColor: Colors.moonGray }}>
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            className="w-100 pa2 f3 flex items-start bn"
            style={{
              color: fontColor || Colors['darkGrey'],
              borderRadius: BorderRadius.all
            }}
          />
        </div>
      </div>

      {touched &&
        error && (
          <div className="mb3">
            <RenderAlert error={{ message: error }} />
          </div>
        )}
    </div>
  );
};

const AuthInput = ({
  name,
  type,
  placeholder,
  component,
  fontColor,
  borderRadius
}) => (
  <div className="w-100">
    <div className="fieldIcon" />
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      component={component || renderInput}
      fontColor={fontColor}
      borderRadius={borderRadius}
    />
  </div>
);

export default AuthInput;
