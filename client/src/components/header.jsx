import React from 'react';
import Login from './login';
import Signup from './signup';
import Search from './search';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      view: 'none',
    };
    this.changeLoginView = this.changeLoginView.bind(this);
    this.changeSignupView = this.changeSignupView.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({
        user: nextProps.user,
      });
    }
  }
  changeView() {
    this.setState({
      view: 'none',
    });
  }
  changeLoginView() {
    this.setState({
      view: 'login',
    });
  }

  changeSignupView() {
    this.setState({
      view: 'signup',
    });
  }

  render() {
    const { handleLogin, handleSearch } = this.props;
    const { user } = this.state;
    return (
      <div id="header">
        <div className="searchBar">
          {user && <Search handleSearch={handleSearch} />}
        </div>
        { user && <span>Welcome, {user} to </span> }<span>eatChic</span>
        { !user && <a href="/auth/google"> Log In Through Google </a> }
        { !user && <button onClick={this.changeLoginView}>Log In</button> }
        { !user && <button onClick={this.changeSignupView}>Sign Up</button> }
        { this.state.view === 'login' && <Login /> }
        { this.state.view === 'signup' && <Signup /> }
        { this.state.user && <button className="logout" onClick={this.props.handleLogout}> Logout</button> }
      </div>
    );
  }
}

export default Header;
