import './Main.css'
import React from 'react'
import MovieList from '../components/MovieList';
import Preloader from '../components/Preloader';
import Search from '../components/Search';

class Main extends React.Component{

    state=
    {
        movies:[]
    }

    componentDidMount()
    {
        fetch('https://omdbapi.com/?apikey=51b3610a&s=bad')
        .then(responce => responce.json())
        .then(data => this.setState({movies: data.Search}));
    }

    searchMovie = (str, type = 'ALL') =>
    {
        fetch(`https://omdbapi.com/?apikey=51b3610a&s=${str}${type !== 'ALL' ? `&type=${type}` : ''}`)
        .then(responce => responce.json())
        .then(data => this.setState({movies: data.Search}));
    }

    render()
    {
        return(
            <div className='main'>
                <div className='wrap'>
                    <Search searchMovie={this.searchMovie}></Search>
                   { 
                   this.state.movies != null  && this.state.movies.length === 0 ? <Preloader/> : <MovieList movies={this.state.movies}></MovieList>
                   }
                </div>
            </div>
        )
    }


}

export default Main;