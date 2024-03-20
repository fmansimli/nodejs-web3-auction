import { useState } from "react";
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/24/outline";

interface IProps {
  text: string | undefined;
  className?: string;
}

const CopyClipboard: React.FC<IProps> = (props) => {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <button
      className=""
      onClick={() => copyToClipboard(props.text || "")}
      onBlur={() => setCopied(false)}>
      {copied ? (
        <CheckIcon className={props.className} />
      ) : (
        <DocumentDuplicateIcon className={props.className} />
      )}
    </button>
  );
};

CopyClipboard.defaultProps = {
  className: "h-5 w-5"
};

export default CopyClipboard;
