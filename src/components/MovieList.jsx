import MovieCard from "./MoveiCard";

function MovieList({ movies, onSendData }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onSendData={onSendData} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;