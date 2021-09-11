import classNames from 'classnames'
import React from 'react'
import './MoviesList.css'


const TMDB_IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/w500/'

const TMDBImage = ({src, ...restProps}) => (
  <img src={`${TMDB_IMAGE_BASE_PATH}${src}`}  className="poster" {...restProps}/>
)

export default TMDBImage