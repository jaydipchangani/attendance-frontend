type ButtonProps = {
  label: string;
  onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 sm:px-4 py-2 rounded bg-blue-500 text-white text-sm sm:text-base font-medium hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto"
    >
      {label}
    </button>
  );
}
