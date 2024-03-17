import { type FC, memo } from "react";

interface IProps {}

const Footer: FC<IProps> = memo((_props) => {
  return (
    <footer className="w-full bg-gray-600">
      <div className="container mx-auto">
        <div className="py-5">Footer</div>
      </div>
    </footer>
  );
});

export default Footer;
