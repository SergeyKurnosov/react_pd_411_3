import './Main.css'
import React from 'react'
import MovieList from '../components/MovieList';
import Preloader from '../components/Preloader';
import Search from '../components/Search';

class Main extends React.Component {

    state =
        {
            movies: [],
            count: 0,
            count_pages: 0
        }

    componentDidMount() {
        fetch('https://omdbapi.com/?apikey=51b3610a&s=rio')
            .then(responce => responce.json())
            .then(data => this.setState
                ({
                    movies: data.Search,
                    count: data.totalResults
                })
            );
    }

    searchMovie = (str, type = 'all', page = 1) => {
        fetch(`https://omdbapi.com/?apikey=51b3610a&s=${str}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
            .then(responce => responce.json())
            .then(data => this.setState({ movies: data.Search , count: data.totalResults}));
    }

    render() {
        return (
            <div className='main'>
                <div className='wrap'>
                    <Search searchMovie={this.searchMovie} totalCount={this.state.count} countPages={this.state.count_pages}></Search>
                    {
                        this.state.movies != null && this.state.movies.length === 0 ? <Preloader /> : <MovieList movies={this.state.movies}></MovieList>
                    }

                </div>
            </div>
        )
    }


}

export default Main;