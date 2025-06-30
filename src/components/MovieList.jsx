import MovieCard from "./MovieCard";

function MovieList({ movies, onSendData }) {
  if (!movies.length) {
    return <p className="text-gray-400">Film topilmadi...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} onSendData={onSendData} />
      ))}
    </div>
  );
}

export default MovieList;
