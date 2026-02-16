import './MovieList.css';
import Movie from './Movie';
function MovieList(props){

    const {movies =[]} = props;
    return(
        <div className='movies'>
            {
                
                movies.map(
                    movie => 
                    {
                        return <Movie key={movie.imdbID} {...movie} />
                    }
                )
            }
        </div>
    );
}

export default MovieList;