import React from 'react';
import MainItemView from './MainItemView';
import MainListItem from './MainListItem';
import Slider from './Slider';
import API_KEY from '../data/api'

const MainList = props => {
    if (props.itemView) {
      return <MainItemView
        item={props.item}
        app={props.app}
        video={props.videoPath}
        similar={props.similarVideos}
        viewHandler={props.viewHandler}
        itemClick={props.itemClick} />
    } else {
      return (
        <div id="main-list">
          <Slider
            data={props.data}
            app={props.app}
            viewHandler={props.viewHandler}
            name={props.feed === 'savedData' ? 'Saved' : 'Searched'}
          />
          <Slider
            data={props.trending}
            app={props.app}
            viewHandler={props.viewHandler}
            name={'Trending'}
          />
        </div>
      )
    }
}


export default MainList;