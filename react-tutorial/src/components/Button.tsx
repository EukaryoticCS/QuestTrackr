import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  onClick: () => void;
}

const Button = ({color = 'primary', children, onClick}: Props) => {
  return (
    <button type="button" className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button