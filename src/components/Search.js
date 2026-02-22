import './Search.css';
import React from 'react';

class Search extends React.Component {

    state =
        {
            search: "",
            type: "all",
            page: 1
        }
    prevPage = () => {
        this.setState
            (
                () => (this.state.page > 1 ? { page: this.state.page - 1 } : { page: 1 }),
                () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
            );
    }

    nextPage = () => {
        this.setState
            (
                () => ({ page: this.state.page + 1 }),
                () => {
                    this.props.searchMovie(this.state.search, this.state.type, this.state.page)
                }
            );
    }

    setPage(num) {
        this.setState
        (
            () => ({page:+num}),
            () => (this.props.searchMovie(this.state.search, this.state.type, this.state.page))
        )

        this.state.page = num;
    }
    
    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.props.searchMovie(this.state.search, this.state.type);
        }
    }
    
    handleFilter = (event) => {
        this.setState(
            () => ({ type: event.target.dataset.type }),
            () => this.props.searchMovie(this.state.search, this.state.type)
        );
    }
    
    render() {
        let limit = 10;
        let totalPages = Math.ceil(this.props.totalCount / limit);
        const firstIndex = this.state.page;
        const lastIndex = firstIndex <= totalPages - limit ? firstIndex + limit : totalPages - firstIndex;
        const num = [];
        console.log(`page - ${this.state.page}`); 
        console.log(`left - ${firstIndex}`); 
        console.log(`right - ${lastIndex}`); 
        console.log("---------------------------"); 
        for (let i = firstIndex; i < lastIndex; i++) {
            num.push(i);
        }

        return (
            <>
                <div className='search'>
                    <input
                        type='search'
                        placeholder='Поиск'
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyDown={this.handleKey}
                    />

                    <button className='btn' onClick={() => this.props.searchMovie(this.state.search, this.state.type)}>
                        Search
                    </button>

                </div>
                <div className='radio'>
                    <div>
                        <input type="radio" name='type' id='all' data-type='all' checked={this.state.type === 'all'} onChange={this.handleFilter} />
                        <label htmlFor="all">All</label>
                    </div>
                    <div>
                        <input type="radio" name='type' id='movie' data-type='movie' checked={this.state.type === 'movie'} onChange={this.handleFilter} />
                        <label htmlFor="movie">Movie</label>
                    </div>
                    <div>
                        <input type="radio" name='type' id='series' data-type='series' checked={this.state.type === 'series'} onChange={this.handleFilter} />
                        <label htmlFor="series">Series</label>
                    </div>
                    <div>
                        <input type="radio" name='type' id='game' data-type='game' checked={this.state.type === 'game'} onChange={this.handleFilter} />
                        <label htmlFor="game">Game</label>
                    </div>
                </div>

                <div className='navigator'>
                    <button className='btn' onClick={this.prevPage}>Prev</button>
                    <div className='items'>
                        {
                            num//.slice(firstIndex, lastIndex)
                                .map
                                (
                                    (element) =>
                                    (
                                        <button
                                            className='btn'
                                            style={{ background: this.state.page != element ? "gray" : "" }}
                                            key={element}
                                            onClick={() => (this.setPage(element))}
                                        >{element}</button>
                                    )
                                )
                        }
                    </div>
                    <button className='btn' onClick={this.nextPage}>Next</button>
                </div>

            </>
        )
    }
}

export default Search;