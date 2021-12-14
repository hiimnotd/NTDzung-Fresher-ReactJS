import React, { CSSProperties } from 'react';

const PageButton = ({imgSrc}: {imgSrc: string}) => {
  const style: CSSProperties = {
    width: '48px',
    height: '40px',
    border: '1px solid #DEDEDE',
    borderRadius: '4px',
  }

  return (
    <button style={style}>
      <img alt="" src={imgSrc} className="icon"></img>
    </button>
  );
}

export default PageButton;