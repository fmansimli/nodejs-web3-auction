interface IProps {
  children: React.ReactNode;
}

const MyCard: React.FC<IProps> = (props) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      {props.children}
    </div>
  );
};

export default MyCard;
