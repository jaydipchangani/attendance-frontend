type ButtonProps = {
  label: string;
  onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
    >
      {label}
    </button>
  );
}
