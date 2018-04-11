/* global FormData */
/* global window */
/* eslint react/no-unused-state: "off" */

import React from 'react';
import $ from 'jquery';
// import io from 'socket.io-client';
import Suggestions from './suggestions';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likesdish: null,
      image: null,
      dish: '',
      restaurant: '',
      content: '',
      restaurants: null,
      dishes: null,
      isRecipe: false,
    };
    this.preventDefault = this.preventDefault.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.suggest = this.suggest.bind(this);
    this.endSuggest = this.endSuggest.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleAcceptDish = this.handleAcceptDish.bind(this);
    this.handleAcceptRestaurant = this.handleAcceptRestaurant.bind(this);

    $.get({
      url: '/restaurants',
    }).done((data) => {
      this.setState({ restaurants: data.rows });
    });
    $.get({
      url: '/dishes',
    }).done((data) => {
      this.setState({ dishes: data.rows });
    });
  }

  preventDefault(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const { files } = e.dataTransfer;
    const [file] = files;
    this.setState({ image: file, photoURL: window.URL.createObjectURL(file) });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleAcceptDish(event) {
    this.setState({ dish: event.target.value, suggestions: null, active: null });
  }

  handleAcceptRestaurant(event) {
    this.setState({ restaurant: event.target.value, suggestions: null, active: null });
  }

  suggest(event) {
    if (!this.state.isRecipe) {
      let options;
      const keyword = event.target.value;
      const type = event.target.id;
      if (type === 'restaurant') {
        options = this.state.restaurants.filter(restaurant => RegExp(keyword, 'i').test(restaurant.name));
      }
      if (type === 'dish') {
        options = this.state.dishes.filter(dish => (dish.name).match(keyword));
      }
      this.setState({ suggestions: options, active: type });
    }
  }

  endSuggest() {
    this.setState({ active: null });
  }

  handleSubmit() {
    const postData = new FormData();
    if (this.state.likesdish === true) {
      postData.append('likesdish', 1);
    } else if (this.state.likesdish === false) {
      postData.append('likesdish', 0);
    } else {
      postData.append('likesdish', this.state.likesdish);
    }
    postData.append('content', this.state.content);
    postData.append('dish', this.state.dish);
    postData.append('userid', this.props.id);

    if (this.state.isRecipe) {
      postData.append('recipe', this.state.restaurant);
      postData.append('restaurant', '');
    } else {
      postData.append('restaurant', this.state.restaurant);
      postData.append('recipe', '');
    }

    if (this.state.image) {
      postData.append('image', this.state.image);
    }

    $.post({
      url: '/submit',
      data: postData,
      processData: false,
      contentType: false,
      success: () => {
        this.props.handlePostSubmit();
        this.setState({
          content: '',
          restaurant: '',
          dish: '',
          photoURL: undefined,
          likesdish: null,
        });
      },
      error: (err) => {
        console.log (err);
      },
    });
  }
  handleClick(event) {
    if (event.currentTarget.name === 'like' && (this.state.likesdish === null || this.state.likesdish === false)) {
      this.setState({ likesdish: true });
    } else if (event.currentTarget.name === 'like' && this.state.likesdish === true) {
      this.setState({ likesdish: null });
    } else if (event.currentTarget.name === 'dislike' && (this.state.likesdish === null || this.state.likesdish === true)) {
      this.setState({ likesdish: false });
    } else {
      this.setState({ likesdish: null });
    }
  }
  handleToggle() {
    this.setState({ isRecipe: !this.state.isRecipe });
  }

  handleFiles() {
    const photo = this.fileInput.files[0];
    this.setState({ image: photo, photoURL: window.URL.createObjectURL(photo) });
  }

  render() {
    const dropzoneClick = (e) => {
      $('#photoPicker').click();
      e.preventDefault();
    };

    return (
      <div id="submit">
        <form onSubmit={this.handleSubmit} id="form" encType="multipart/form-data">
          <div className="form-group row">
            <div className="col-5">
              <input
                type="file"
                id="photoPicker"
                name="photo"
                accept="image/*"
                onChange={this.handleFiles}
                ref={(input) => {
                  this.fileInput = input;
                }}
              />
              <div
                id="dropzone"
                onClick={dropzoneClick}
                onKeyDown={dropzoneClick}
                onDrop={this.handleDrop}
                onDragEnter={this.preventDefault}
                onDragOver={this.preventDefault}
                role="button"
                tabIndex={0}
              >
                { this.state.photoURL &&
                <img alt="dish" src={this.state.photoURL} id="photoPreview" /> }
                { !this.state.photoURL && <i className="material-icons">add_a_photo</i> }
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-3">
                  <button
                    type="button"
                    className="btn-default recipe-btn"
                    onClick={this.handleToggle}
                  >
                    &#9660;&nbsp;
                    {!this.state.isRecipe && 'at'}
                    {this.state.isRecipe && 'recipe'}
                  </button>
                </div>
                <div className="col">
                  <input
                    id="restaurant"
                    className="form-control"
                    value={this.state.restaurant}
                    onKeyDown={this.suggest}
                    onChange={this.handleChange}
                    placeholder="the place"
                    type="text"
                  />
                  { this.state.suggestions && this.state.active === 'restaurant' &&
                  <Suggestions
                    options={this.state.suggestions}
                    handleAccept={this.handleAcceptRestaurant}
                    handleAdd={this.endSuggest}
                    type="restaurant"
                    item={this.state.restaurant}
                  />}
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                    the
                </div>
                <div className="col">
                  <input
                    id="dish"
                    className="form-control"
                    value={this.state.dish}
                    onChange={this.handleChange}
                    onKeyDown={this.suggest}
                    placeholder="dish"
                    type="text"
                  />
                  { this.state.suggestions && this.state.active === 'dish' &&
                  (<Suggestions
                    options={this.state.suggestions}
                    handleAccept={this.handleAcceptDish}
                    handleAdd={this.endSuggest}
                    item={this.state.dish}
                    type="dish"
                  />)}
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                 it was
                </div>
                <div className="col">
                  <textarea
                    id="content"
                    className="form-control"
                    value={this.state.content}
                    onChange={this.handleChange}
                    placeholder="...delicious?"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="btn-group">
                    <button
                      type="button"
                      className={`like-btn btn btn-default ${this.state.likesdish}`}
                      aria-label="Left Align"
                      name="like"
                      onClick={this.handleClick}
                    >
                      <i id="like" className="material-icons like">favorite_border</i>
                    </button>
                    <button
                      type="button"
                      name="dislike"
                      className={`like-btn btn btn-default ${this.state.likesdish === false}`}
                      aria-label="Center Align"
                      onClick={this.handleClick}
                    >
                      <i id="dislike" className="material-icons">mood_bad</i>
                    </button>
                  </div>
                </div>
                <div className="col">
                  <button
                    type="button"
                    id="submitButton"
                    className="btn btn-danger btn-block"
                    onClick={this.handleSubmit}
                  >
                  Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Submit;
