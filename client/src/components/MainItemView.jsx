import React from 'react';
import Slider from './Slider';
// perhaps add a gallery down the road?

const MainItemView = (props) => {
  const url = `https://www.youtube.com/embed/${props.video}`
  const video = props.video ? (
    <iframe width="560" height="315" src={url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  ) : (
      <img id="blank" src="/leaf.png" height="315" width="560" />
    );
  return (
    <div className="main-item-view">
      {video}
      <div className="source-info">
        <div id="MIV-info">
          <div id="MIV-title"><strong>{props.item.original_title}</strong>
            <div className="star-ratings-css">
              <div className="star-ratings-css-top" style={{ width: String(props.item.vote_average * 10) + '%' }}>
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
          <div id="MIV-ratings">{parseInt(props.item.release_date) || '--'}
            <span id="line">|</span>
            {props.item.vote_average}/10
          <span id="line">|</span>
            {props.item.vote_count} reviews
          </div>
          <div id="MIV-overview">{props.item.overview}</div>
        </div>
      </div>

      <div className="main-item-btns">
        <button type="button" onClick={() => { props.viewHandler() }}>Back</button>
        <button type="button" onClick={() => {
          props.item.saved = !props.item.saved;
          props.app.itemClickHandler(props.item, props.item.saved)
        }}>{props.item.saved ? 'Remove' : 'Save'}</button>
      </div>

      <Slider data={props.similar} app={props.app} viewHandler={props.viewHandler} name={'Recommended'} />

    </div>
  )
}


export default MainItemView;