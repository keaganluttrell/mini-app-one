import React from 'react';
import MainList from './MainList';
import Search from './Search';
import API_KEY from '../data/api';
// comment out line above
// cosnt API_KEY = PUT_YOUR_KEY_HERE
// more info on how to get a key:
// https://developers.themoviedb.org/3/getting-started/introduction


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedData: [],
      lastSearch: [],
      savedData: [],
      trendingData: [],
      feed: 'searchedData',
      itemView: false,
      item: {},
      videoPath: '',
      similarVideos: []
    };
  }

  viewHandler(clickedItem) {
    if (clickedItem) {
      fetch(`https://api.themoviedb.org/3/movie/${clickedItem.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            this.setState({
              itemView: true,
              item: clickedItem,
              videoPath: data.results[0].key
            });
          } else {
            this.setState({
              itemView: true,
              item: clickedItem,
              videoPath: false
            });
          }
        }).then(() => fetch(`https://api.themoviedb.org/3/movie/${clickedItem.id}/similar?api_key=${API_KEY}`))
        .then(r => r.json())
        .then(data => {
          this.setState({
            similarVideos: data.results
          });
        });
    } else {
      this.setState({
        itemView: false
      });
    }
  }

  feedHandler() {
    this.setState({
      feed: 'searchedData'
    });
  }

  itemClickHandler(item, saved) {
    const newSave = this.state.savedData.slice();
    if (saved) {
      newSave.push(item);
      this.setState({
        savedData: newSave,
      });
      const post = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      }
      fetch('/saved', post)
        .then(response => response.json())
        .then(data => data);

    } else {
      const removed = newSave.filter(i => {
        return i.id !== item.id;
      });
      this.setState({
        savedData: removed
      });
      const del = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': item
        },
        body: JSON.stringify(item)
      }
      fetch('/saved', del)
        .then(response => response.json())
        .then(data => data);
    }
  }

  searchClickHandler(q) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${q}&page=1&include_adult=false`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          searchedData: data.results
        });
        const last = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data.results),
        }
        fetch('/lastSearch', last)
          .then(response => response.json())
          .then(data => data);
      });
  }

  componentDidMount() {
    fetch('/saved')
      .then(response => response.json())
      .then(data => {
        this.setState({
          savedData: data
        });
      });
    fetch('/lastSearch')
      .then(response => response.json())
      .then(data => {
        this.setState({
          searchedData: data
        });
      });
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(data => {
        this.setState({
          trendingData: data.results
        });
      });
  }

  render() {
    const app = this;
    return (
      <div id="main">

        <div id="main-title"><h2>MOVIE LIST</h2>
          <Search feedHandler={this.feedHandler.bind(this)}
            searchClickHandler={this.searchClickHandler.bind(this)}
          />
          <div id="nav">
            <div id="main-home"
              onClick={() => this.setState({ feed: 'searchedData', itemView: false })}><span>Home</span>
            </div>
            <div id="main-saved"
              onClick={() => this.setState({ feed: 'savedData', itemView: false })}><span>Saved</span>
            </div>
          </div>
        </div>
        <MainList
          data={this.state[this.state.feed]}
          app={app}
          trending={this.state.trendingData}
          feed={this.state.feed}
          itemView={this.state.itemView}
          item={this.state.item}
          videoPath={this.state.videoPath}
          similarVideos={this.state.similarVideos}
          viewHandler={this.viewHandler.bind(this)}
        />
      </div>
    );
  }
}

export default App;