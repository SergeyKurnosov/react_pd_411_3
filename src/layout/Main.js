import './Main.css'
import React from 'react'
import MovieList from '../components/MovieList';

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

    render()
    {
        return(
            <div className='main'>
                <div className='wrap'>

                    <MovieList movies={this.state.movies}></MovieList>
                </div>
            </div>
        )
    }


}

export default Main;