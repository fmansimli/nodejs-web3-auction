interface IProps extends React.ButtonHTMLAttributes<any> {}

const MyButton: React.FC<IProps> = (props) => {
  return (
    <button
      {...props}
      className="justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
      {props.children}
    </button>
  );
};

export default MyButton;
