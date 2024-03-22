import * as Dialog from "@radix-ui/react-dialog";

type IProps = {
  title: string;
  open: boolean;
  children: React.ReactNode;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
  hasLeftButton: boolean;
  hasRightButton: boolean;
  leftButtonText?: string;
  rightButtonText?: string;
};

const MyDialog: React.FC<IProps> = (props) => (
  <Dialog.Root open={props.open}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow dark:bg-gray-800">
        <Dialog.Title className="m-0 text-center text-[17px] font-medium text-mauve12 dark:text-white">
          {props.title}
        </Dialog.Title>

        {props.children}

        <div className="mt-[25px] flex items-center justify-evenly">
          {props.hasLeftButton && (
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
              onClick={props.onLeftButtonClick}>
              {props.leftButtonText}
            </button>
          )}
          {props.hasRightButton && (
            <button
              onClick={props.onRightButtonClick}
              className=" justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
              {props.rightButtonText}
            </button>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

MyDialog.defaultProps = {
  leftButtonText: "",
  rightButtonText: ""
};

export default MyDialog;
