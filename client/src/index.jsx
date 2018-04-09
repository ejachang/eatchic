import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Header from './components/header.jsx';
import Submit from './components/submit.jsx';
import Posts from './components/posts.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div>
        <Header></Header>
        <Submit></Submit>
        <Posts></Posts>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));