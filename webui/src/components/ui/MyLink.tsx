import { Link } from "react-router-dom";

interface IProps extends React.AnchorHTMLAttributes<any> {
  children: React.ReactNode;
  to: string;
  replace?: boolean;
}

const MyLink: React.FC<IProps> = ({ to, children, ...props }) => {
  return (
    <Link
      to={to}
      {...props}
      className="justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
      {children}
    </Link>
  );
};

export default MyLink;
