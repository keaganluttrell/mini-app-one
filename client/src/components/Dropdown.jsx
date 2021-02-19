import React from 'react';

const Dropdown = (props) => {
  return (
    <div className="list-item-dropdown"
      onClick={() => props.viewHandler(props.item)}>
      { props.item.original_title} <br></ br>
      <div className="star-ratings-css"
        style={{ margin: '3px auto' }} >
        <div className="star-ratings-css-top"
          style={{ width: String(props.item.vote_average * 10) + '%' }}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <div className="star-ratings-css-bottom">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </div>
  )
}

export default Dropdown;