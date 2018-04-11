import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchTerm: 'dish',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.searchTerm, this.state.value);
  }

  handleOnChange(e) {
    if (e.target.name === 'searchValue') {
      this.setState({
        value: e.target.value,
      });
    } else if (e.target.name === 'searchTerm') {
      this.setState({
        searchTerm: e.target.value,
      });
    }
  }

  render() {
    return (
      <form>
        <input
          id="searchValue"
          name="searchValue"
          placeholder="search"
          type="text"
          value={this.state.value}
          onChange={this.handleOnChange}
        />
        <select
          id="searchTerm"
          name="searchTerm"
          value={this.state.searchTerm}
          onChange={this.handleOnChange}
        >
          <option value="dish">by dish</option>
          <option value="user">by user</option>
          <option value="restaurant">by restaurant</option>
          <option value="rating">by rating</option>
        </select>
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default Search;
