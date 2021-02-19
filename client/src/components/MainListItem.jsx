import React from 'react';
import Dropdown from './Dropdown';
// add a save button to pass item all the way back to App.jsx
// maybe use a hook here? button value needs to flip between save an remove
const MainListItem = (props) => {
  const url = props.item.poster_path ? `https://image.tmdb.org/t/p/w500/${props.item.poster_path}` : `https://image.tmdb.org/t/p/w500/${props.item.backdrop_path}`;
  if (props.app.state.savedData.some(saved => props.item.id === saved.id)) {
    props.item.saved = true;
  }
  return (
    <div className="main-list-item">
      <img src={props.item.id === 'temp' ? props.item.poster_path : url} height="200px" width="130px" alt={props.item.title}
        onClick={() => props.viewHandler(props.item)} />
      <button type="button"
        onClick={() => {
          props.item.saved = !props.item.saved;
          props.app.itemClickHandler(props.item, props.item.saved)
        }}>{props.item.saved ? 'Remove' : 'Save'}
      </button>
        <Dropdown item={props.item} viewHandler={props.viewHandler}/>
    </div>
  )
}


export default MainListItem;