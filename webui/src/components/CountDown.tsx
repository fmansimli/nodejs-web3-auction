import { useEffect, useRef, useState } from "react";

interface IProps {
  className: string;
  secondsLeft: number;
  delta?: number;
  onFinish: () => void;
}

const CountDown: React.FC<IProps> = (props) => {
  const [time, setTime] = useState(props.secondsLeft < 0 ? 0 : props.secondsLeft);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (time <= 0) {
      props.onFinish();
    }
  }, [time]);

  useEffect(() => {
    if (time <= 0) return;

    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerRef.current);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, props.delta);

    return () => clearInterval(timerRef.current);
  }, []);

  return <div className={props.className}>{calculate(time)}</div>;
};

CountDown.defaultProps = {
  delta: 1000
};

export default CountDown;

function calculate(secondsLeft: number) {
  const hours = Math.floor(secondsLeft / 3600);
  const remainingSeconds = secondsLeft % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    `${hours}`.padStart(2, "0") +
    ":" +
    `${minutes}`.padStart(2, "0") +
    ":" +
    `${seconds}`.padStart(2, "0")
  );
}
