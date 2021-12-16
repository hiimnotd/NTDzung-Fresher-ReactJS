import React, { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface PageButtonProps {
  imgSrc: IconDefinition;
  onClick?: () => void;
  disable?: boolean;
}

const PageButton = ({ imgSrc, onClick, disable }: PageButtonProps) => {
  const style: CSSProperties = {
    width: '48px',
    height: '40px',
    border: '1px solid #DEDEDE',
    borderRadius: '4px'
  }

  return (
    <button style={style} onClick={onClick} disabled={disable}>
      <FontAwesomeIcon icon={imgSrc} />
    </button>
  )
}

export default PageButton
