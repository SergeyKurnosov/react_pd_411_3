import './MovieList.css';
import Movie from './Movie';
function MovieList(props){

    const {movies =[]} = props;
    const unique = Array.from(new Map(movies.map(m=>[m.imdbID, m])).values());
    return(
        <div className='movies'>
            {
                
                unique.length ? unique.map(
                    movie => 
                    {
                        return <Movie key={movie.imdbID} {...movie} />
                    }
                )
                : <h4>Nothing found</h4>
            }
        </div>
    );
}

export default MovieList;