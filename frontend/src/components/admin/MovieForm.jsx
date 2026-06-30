import { useEffect, useState } from "react";

const MovieForm = ({ movie, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    language: "",
    description: "",
    format: "",
    certification: "",
    rating: "",
    banner: "",
    poster: "",
  });

  useEffect(() => {
  if (movie) {
    setFormData({
      title: movie.title || "",
      genre: movie.genre || "",
      duration: movie.duration || "",
      language: movie.language || "",
      description: movie.description || "",
      format: movie.format || "",
      certification: movie.certification || "",
      rating: movie.rating || "",
      banner: movie.banner || "",
      poster: movie.poster || "",
    });
  } else {
    setFormData({
      title: "",
      genre: "",
      duration: "",
      language: "",
      description: "",
      format: "",
      certification: "",
      rating: "",
      banner: "",
      poster: "",
    });
  }
}, [movie]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  onSubmit(formData);

  setFormData({
    title: "",
    genre: "",
    duration: "",
    language: "",
    description: "",
    format: "",
    certification: "",
    rating: "",
    banner: "",
    poster: "",
  });
};

return (
  <form
    onSubmit={handleSubmit}
    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6"
  >
    <h2 className="text-2xl font-bold text-white mb-6">
  {movie ? "Edit Movie" : "Add Movie"}
</h2>

    <div className="flex flex-col lg:flex-row gap-8">

      {/* ================= LEFT: FORM ================= */}
      <div className="flex-1">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="title"
            required
            placeholder="Movie Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="text"
            name="genre"
            required
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="text"
            name="duration"
            required
            placeholder="Duration (e.g. 2h 35m)"
            value={formData.duration}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="text"
            name="language"
            required
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="text"
            name="format"
            placeholder="Format (2D, 3D, IMAX...)"
            value={formData.format}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="text"
            name="certification"
            placeholder="Certification"
            value={formData.certification}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            name="rating"
            placeholder="Rating (0-10)"
            value={formData.rating}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="url"
            name="poster"
            required
            placeholder="Poster URL"
            value={formData.poster}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="url"
            name="banner"
            placeholder="Banner URL"
            value={formData.banner}
            onChange={handleChange}
            className="md:col-span-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <textarea
            name="description"
            rows={5}
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="md:col-span-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

        </div>

        <button
          type="submit"
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition cursor-pointer"
        >
          {movie ? "Update Movie" : "Add Movie"}
        </button>

      </div>

      {/* ================= RIGHT: PREVIEW ================= */}

      <div className="lg:w-64 shrink-0">

        <div >

          <h3 className="text-lg font-semibold text-white mb-4">
            Poster Preview
          </h3>

          {formData.poster ? (
            <img
              src={formData.poster}
              alt="Poster Preview"
              className="w-full rounded-xl border border-zinc-700 shadow-lg object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="aspect-2/3 rounded-xl border-2 border-dashed border-zinc-700 flex items-center justify-center text-center text-gray-500 p-4">
              Poster preview will appear here
            </div>
          )}

        </div>

      </div>

    </div>
  </form>
);


};

export default MovieForm;



























//   return (
//   <form
//   onSubmit={handleSubmit}
//   className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6"
// >
//     <h2 className="text-2xl font-bold text-white mb-6">
//       Add Movie
//     </h2>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">

//       <input
//         type="text"
//         name="title"
//         required
//         placeholder="Movie Title"
//         value={formData.title}
//         onChange={handleChange}
//         className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <input
//         type="text"
//         name="genre"
//         required
//         placeholder="Genre"
//         value={formData.genre}
//         onChange={handleChange}
//         className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <input
//         type="text"
//         name="duration"
//         required
//         placeholder="Duration (e.g. 2h 35m)"
//         value={formData.duration}
//         onChange={handleChange}
//         className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <input
//         type="text"
//         name="language"
//         required
//         placeholder="Language"
//         value={formData.language}
//         onChange={handleChange}
//         className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <input
//         type="text"
//         name="format"
//         placeholder="Format (2D, 3D, IMAX...)"
//         value={formData.format}
//         onChange={handleChange}
//         className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <input
//         type="text"
//         name="certification"
//         placeholder="Certification"
//         value={formData.certification}
//         onChange={handleChange}
//         className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <input
//         type="number"
//         step="0.1"
//         min="0"
//         max="10"
//         name="rating"
//         placeholder="Rating (0-10)"
//         value={formData.rating}
//         onChange={handleChange}
//         className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <div className="md:col-span-2">
//   <label className="block text-sm text-gray-400 mb-2">
//     Poster
//   </label>

//   <div className="flex gap-4 bg-zinc-800 border border-zinc-700 rounded-xl p-4">

//     {/* Left */}
//     <div className="flex-1">
//       <input
//         type="url"
//         name="poster"
//         placeholder="Paste Poster URL..."
//         value={formData.poster}
//         onChange={handleChange}
//         required
//         className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <p className="text-xs text-gray-500 mt-2">
//         Paste a direct image URL.
//       </p>
//     </div>

//     {/* Right */}
//     <div className="w-28 shrink-0">

//       {formData.poster ? (
//         <img
//           src={formData.poster}
//           alt="Poster Preview"
//           className="w-28 h-40 object-cover rounded-lg border border-zinc-700"
//           onError={(e) => {
//             e.target.style.display = "none";
//           }}
//         />
//       ) : (
//         <div className="w-28 h-40 rounded-lg border-2 border-dashed border-zinc-700 flex items-center justify-center text-xs text-gray-500 text-center">
//           No Preview
//         </div>
//       )}

//     </div>

//   </div>
// </div>

//       <input
//         type="url"
//         name="banner"
//         placeholder="Banner URL"
//         value={formData.banner}
//         onChange={handleChange}
//         className="md:col-span-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//       <textarea
//         name="description"
//         placeholder="Description"
//         value={formData.description}
//         onChange={handleChange}
//         rows={5}
//         className="md:col-span-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
//       />

//     </div>

//     <button
//   type="submit"
//   className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
// >
//   Add Movie
// </button>
//   </form>
// );
