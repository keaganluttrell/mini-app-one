import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  inputValueHandler(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div id="main-search">
        <form>
          <select id="genre" name="genre">
            <option value="trending">Trending</option>
            <option value="act">Action</option>
            <option value="adv">Adventure</option>
          </select>
          <input id="bar" type="text" placeholder="Search.."
            value={this.state.input}
            onChange={this.inputValueHandler.bind(this)}></input>
          <button type="button" onClick={() => {
            if (this.state.input.length > 0) {
              this.props.searchClickHandler(this.state.input);
            }
            this.props.feedHandler();
            this.setState({ input: '' })
          }
          }>Search</button>
        </form>
      </div>
    )
  }
}



export default Search;