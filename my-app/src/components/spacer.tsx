import React, { CSSProperties } from 'react'

interface SpacerProps {
  width?: number,
  height?: number
}

const Spacer = ({ width = 0, height = 0 }: SpacerProps) => {
  const style: CSSProperties = {
    width: width,
    height: height
  }

  return (
    <div style={style} >
    </div>
  )
}

export default Spacer
