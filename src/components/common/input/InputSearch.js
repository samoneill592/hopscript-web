import React from 'react';
import { BorderRadius, Colors } from '../../../config/styles';

const InputSearch = (props) => {
  const {
    input,
    height,
    placeholder,
    fontColor,
    borderColor,
    maxLength,
    backgroundColor,
    classOverrides
  } = props;

  return (
    <div className='searchContainer'>
      <i className="fa fa-search searchIcon" />
      <input
        className="searchBox"
        {...input}
        type="search"
        placeholder={placeholder}
        className={`${borderColor ? 'ba' : 'bn'} pa3`}
        style={{
          color: fontColor || Colors.inputFontColor,
          borderRadius: BorderRadius.all,
          borderColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: '1px',
          height,
          backgroundColor
        }}
        maxLength={maxLength}
      />
    </div>
  );
};


export default InputSearch;
