import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface IProps {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
}

const Pagination: React.FC<IProps> = (props) => {
  function handlePrev(): void {
    props.onPrev();
  }

  function handleNext(): void {
    props.onNext();
  }

  return (
    <div className="flex">
      <button
        disabled={props.prevDisabled}
        onClick={handlePrev}
        className="me-3 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <ChevronLeftIcon className="h-5 w-5" />
        Prev
      </button>
      <button
        disabled={props.nextDisabled}
        onClick={handleNext}
        className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Next
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
