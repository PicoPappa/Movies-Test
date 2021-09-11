import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import {AiOutlineCloseCircle} from "react-icons/ai"
import {FaStar} from "react-icons/fa"
import { IconContext } from 'react-icons/lib'

export default class MoviesList extends PureComponent {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  state = {
    selectedMovie: null
  }

  handleSelectMovie = item => this.setState({selectedMovie: item})
  handleCloseMovie = () => this.setState({selectedMovie: null})
  handleSortingChange = sortingType => console.log(sortingType)

  render() {
    const {movies} = this.props
    const {selectedMovie} = this.state

    return (
      <div className="movies-list">
        <IconContext.Provider value={{color:"white", size:"40px"}}>
          <AiOutlineCloseCircle className={ selectedMovie!=null ? "hide btn-close-modal" : "hide" } onClick={this.handleCloseMovie}></AiOutlineCloseCircle>
          </IconContext.Provider>
        <div className="sort">
            <span>SORT BY:</span>
            <SortingOptions onChange={this.handleSortingChange}/>
        </div>
        <div className="items">
          
          {
            movies.map(movie =>
              <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={this.handleSelectMovie}/>
            )
          }
        </div>
        {
          selectedMovie && (
            <ExpandedMovieItem movie={ selectedMovie }>
            </ExpandedMovieItem>
          )
        }
      </div>
    )
  }
}


const ExpandedMovieItem = ( { movie: { title, original_title, poster_path, overview, vote_average, vote_count } } ) => (
  <div className="expanded-movie-item-holder" id="holder">
  <div className="expanded-movie-item">
    <TMDBImage src={poster_path} className="expanded-poster"/>
    <div className="description">
        <h2>{ title }</h2>
        <h3>({original_title})</h3>
        <span className="overview-text">{ overview }</span>

        <div className="expanded-rank">
          <div>
        <IconContext.Provider value={{color:"rgb(242 206 35 / 95%)", size:"20px"}}>
          <FaStar></FaStar>
          </IconContext.Provider>
            <span className="votes-holder">{ vote_average }</span>
            </div>
          <div><h4>({ vote_count } VOTES) </h4> </div>
          </div>
    </div>
  </div>
  </div>
)

class MovieListItem extends Component {

  handleClick = () => {
    const {movie, onSelect} = this.props
    onSelect(movie)
  }

  render() {
    const {movie: {title, vote_average, poster_path}, isSelected} = this.props
    return (
      <div className={ classNames( 'movie-list-item', { 'selected': isSelected } ) } onClick={ this.handleClick } >
       
        <div style={{position:"relative"}}>
        <TMDBImage className="poster" src={ poster_path }/>
          <div className="rank-label">
          <IconContext.Provider value={{color:"#ffde3ff2", size:"12px"}}>
              <FaStar></FaStar>
            </IconContext.Provider>
            { vote_average }
          </div>
        </div>
                   <div className="title-holder">{ title }</div>

        </div>
      
    )
  }
}

class SortingOptions extends Component {

  state = {
    value: ''
  }

  handleChange = e => {
    const selectedValue = e.target.value
    const {onChange} = this.props
    this.setState({value: selectedValue})
    onChange(selectedValue)
  }

  render() {

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value=""></option>
        <option value="name_asc" className="option">A -> Z</option>
        <option value="name_desc" className="option">Z -> A</option>
        <option value="rating" className="option">Rating</option>
      </select>
    )
  }
}

