import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Submit from './components/submit';
import Posts from './components/posts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      id: null,
      posts: [],
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changeView = this.changeView.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    $.get({
      url: '/session',
      success: (data) => {
        if (data) {
          this.setState({
            user: data.user,
            id: data.id,
          });
          $.get({
            url: '/posts',
            success: (result) => {
              this.setState({
                posts: result,
              });
            },
            err: (err) => {
              console.log(err);
            },
          });
        } else {
          $.get({
            url: '/home',
            success: (result) => {
              this.setState({
                posts: result,
              });
            },
          });
        }
      },
      err: (err) => {
        console.log(err);
      },
    });
  }

  handlePostSubmit() {
    this.fetchData();
  }

  handleLogin(user) {
    this.setState({ user });
  }

  handleLogout() {
    $.get({
      url: '/logout',
      success: () => {
        this.setState({
          user: null,
          id: null,
        });
      },
    });
  }

  handleSearch(searchTerm, value) {
    if (searchTerm === 'rating') {
      $.get({
        url: '/rating',
        success: (data) => {
          this.setState({
            posts: data,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (value === '') {
      return;
    } else {
      $.get({
        url: `/search/${searchTerm}/${value}`,
        success: (data) => {
          this.setState({
            posts: data,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  changeView() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <Header
          user={this.state.user}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleSearch={this.handleSearch}
        />
        {this.state.user &&
        <Submit
          user={this.state.user}
          id={this.state.id}
          handlePostSubmit={this.handlePostSubmit}
        />}
        <Posts
          user={this.state.user}
          changeView={this.changeView}
          id={this.state.id}
          posts={this.state.posts}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
