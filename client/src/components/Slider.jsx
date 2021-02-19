import React from 'react';
import MainListItem from './MainListItem';

const Slider = (props) => {
  const temp = {
    poster_path: '/leaf.png',
    saved: false,
    title: 'No results...',
    vote_average: 0,
    original_title: 'No results...',
    id: 'temp'
  };
  if (props.data.length < 1) {
    return (
      <div className="slider-container">
        <h3>{props.name}</h3>
        <div className="slider" id="temp">
          <MainListItem item={temp}  app={props.app}
              viewHandler={props.viewHandler}/>
        </div>
      </div>
    )
  }
  return (
    <div className="slider-container">
      <h3>{props.name}</h3>
      <div className="slider">
        {props.data.map(item => {
          if (item.poster_path || item.backdrop_path) {
            return <MainListItem item={item} key={item.id} app={props.app}
              viewHandler={props.viewHandler} />
          }
        })
        }
      </div>
    </div>
  )
}

export default Slider;

