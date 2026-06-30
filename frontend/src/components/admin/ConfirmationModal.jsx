// const ConfirmationModal = ({
//   isOpen,
//   title,
//   message,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   confirmButtonClass = "bg-red-600 hover:bg-red-700",
//   onCancel,
//   onConfirm,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
//       onClick={onCancel}
//     >
//       <div
//         className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md p-6 shadow-2xl animate-[fadeIn_.2s_ease-out]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 className="text-2xl font-bold text-white mb-4">
//           {title}
//         </h2>

//         <p className="text-gray-300 mb-8">
//           {message}
//         </p>

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition cursor-pointer"
//           >
//             {cancelText}
//           </button>

//           <button
//             onClick={onConfirm}
//             className={`px-4 py-2 rounded-lg text-white transition cursor-pointer ${confirmButtonClass}`}
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationModal;



const ConfirmationModal = ({
  isOpen,
  title,
  message,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-red-600 hover:bg-red-700",
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md p-6 shadow-2xl animate-[fadeIn_.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          {title}
        </h2>

        {children ? (
          children
        ) : (
          <p className="text-gray-300 mb-8">
            {message}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition cursor-pointer ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;