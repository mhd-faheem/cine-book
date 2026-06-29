import { FaEdit, FaTrash } from "react-icons/fa";

const MovieTable = ({
  movies,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <table className="w-full text-white">
        <thead className="bg-zinc-800">
          <tr>
            <th className="text-left px-6 py-3">Poster</th>
            <th className="text-left px-6 py-3">Title</th>
            <th className="text-left px-6 py-3">Genre</th>
            <th className="text-left px-6 py-3">Language</th>
            <th className="text-left px-6 py-3">Duration</th>
            <th className="text-left px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-6 text-gray-400"
              >
                No movies found.
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr
                key={movie._id}
                className="border-t border-zinc-800 hover:bg-zinc-800 transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-14 h-20 object-cover rounded-md border border-zinc-700"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/56x80?text=No+Image";
                    }}
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {movie.title}
                </td>

                <td className="px-6 py-4">
                  {movie.genre || "-"}
                </td>

                <td className="px-6 py-4">
                  {movie.language || "-"}
                </td>

                <td className="px-6 py-4">
                  {movie.duration ? `${movie.duration}` : "-"}
                </td>

                <td className="px-6 py-4">
  <div className="flex gap-2">

    {/* EDIT BUTTON */}
    <button
      onClick={() => onEdit(movie)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30
                 hover:bg-yellow-500/20 hover:border-yellow-400 transition cursor-pointer"
    >
      <FaEdit size={12} />
      Edit
    </button>

    {/* DELETE BUTTON */}
    <button
      onClick={() => onDelete(movie)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                 bg-red-500/10 text-red-400 border border-red-500/30
                 hover:bg-red-500/20 hover:border-red-400 transition cursor-pointer"
    >
      <FaTrash size={12} />
      Delete
    </button>

  </div>
</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;