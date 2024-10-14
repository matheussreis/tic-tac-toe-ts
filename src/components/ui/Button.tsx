type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white text-center px-5 py-1.5 border border-blue-500 rounded hover:bg-opacity-90 hover:border-opacity-90 cursor-pointer font-medium w-full select-none"
    >
      {children}
    </button>
  );
}
