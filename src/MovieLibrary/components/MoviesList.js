import React, { Component } from 'react'
import classNames from 'classnames'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import {AiOutlineCloseCircle} from "react-icons/ai"
import {FaStar} from "react-icons/fa"
import { IconContext } from 'react-icons/lib'
const SEARCH_API = "https://api.themoviedb.org/3/movie/now_playing?api_key=1d0e2bbffe4e2681e295a282797223d8"



export default class MoviesList extends Component
{
  constructor(props) {
    super(props)
    this.handleSortingChange = this.handleSortingChange.bind( this )
    this.handleScroll=this.handleScroll.bind(this)
    this.pageEndRef = React.createRef();
    this.state = {
      movieState: [],
      pagestoload:4,
      selectedMovie: null,
      sortingOrder: null,
      isLoading:false
    }
  }

  componentDidMount ()
  {
    window.addEventListener('scroll', this.handleScroll, true);
    for ( let page = 1; page < this.state.pagestoload; page++ )
    {
      fetch( SEARCH_API+"&page="+page )
        .then( ( response ) => response.json() )
        .then( data =>
        {
          console.log( data.results )
          this.setState( { movieState: [...this.state.movieState, ...data.results ] } );
        } );
    }
  }

  handleScroll ()
  {
    const scroller = this.pageEndRef.current;
    if ( scroller.offsetTop - window.pageYOffset < 1300 && this.state.isLoading==false )
    {
      this.setState({isLoading:true})
      this.setState( { pagestoload: this.state.pagestoload+1 } )
      const currentpage = this.state.pagestoload;
        fetch( SEARCH_API+"&page="+currentpage )
        .then( ( response ) => response.json() )
        .then( data =>
        {
          console.log( data.results )
          this.setState( { movieState: [ ...this.state.movieState, ...data.results ] } );
          this.setState({isLoading:false})
        } );
      }
  }
  
  handleSelectMovie = item => this.setState({selectedMovie: item})
  handleCloseMovie = () => this.setState({selectedMovie: null})
  handleSortingChange ( sortingType )
  {
    const { movieState } = this.state
    let newMovies = movieState
    if ( sortingType == "name_asc" )
    {
      newMovies = movieState.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if ( a.title > b.title ) { return 1; }
      return 0;
      });
    }

    if ( sortingType == "name_desc" )
    {
      newMovies = movieState.sort((a, b) => {
      if (a.title < b.title) { return 1; }
      if ( a.title > b.title ) { return -1; }
      return 0;
      });
    }

    if ( sortingType == "rating" )
    {
      newMovies = movieState.sort((a, b) => {
      if (a.vote_average > b.vote_average) { return -1; }
      if ( a.vote_average < b.vote_average ) { return 1; }
      return 0;
      });
    }
    
    this.setState( {
      movieState:newMovies
    } )
    
  }

  render() {
    const {movieState} = this.state
    const { selectedMovie } = this.state

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
            movieState.map(movie => 
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
        <div ref={this.pageEndRef} onScroll={this.handleScroll}/>
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

