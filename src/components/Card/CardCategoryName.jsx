import React from 'react'
import './CardStyle.css'

function CardCategoryName(props) {
  return (
    <div className='c-category-name'>
        <img src={props.img} />
        <p className="text">{props.text}</p>
    </div>
  )
}

export default CardCategoryName