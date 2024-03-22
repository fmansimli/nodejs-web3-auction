interface IProps extends React.InputHTMLAttributes<any> {
  label: string;
}

const MyInput: React.FC<IProps> = ({ label, ...props }) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        {...props}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default MyInput;
