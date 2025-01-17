import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Movie() {
    const [movie, setMovie] = useState({});
    let { id } = useParams(); // the variable name i.e. "{ id }"" has to match the parameter in the url"

    useEffect(() => {
        let myMovie = {
            id: 1,
            title: "Highlander",
            release_date: "1986-03-07",
            runtime: 116,
            mpaa_rating: "R",
            description: "Some long description",
        };

        setMovie(myMovie);
    }, [id]); // the effect will be re-run when the dependency, i.e. "id" changes (this is the function of the second parameter of the useEffect() hook)

    return (
        <div>
            <h2>Movie: {movie.title}</h2>
            <small><em>{movie.release_date}, {movie.runtime} minutes, Rated {movie.mpaa_rating}</em></small>
            <hr />
            <p>{movie.description}</p>
        </div>
    )
}

export default Movie;