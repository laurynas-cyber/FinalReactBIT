import { useState } from "react";
import HelpCounter from "./HelpCounter";
import FancyRange from "../UserSignAndLogin/Forms/FancyRange";

const Impact = () => {
  const [rangeValue, setRangeValue] = useState(0);

  return (
    <section className="ImpactContainer">
      <div className="textContainer">
        <h3>HOW YOUR CHARITY DONATION IMPACTS THOSE WHO NEED IT</h3>
        <p>
          Move the slider to see how your donation could make a difference for
          children every month
        </p>
      </div>
      <div className="RangeInputContainer">
        <FancyRange rangeValue={rangeValue} setRangeValue={setRangeValue} />
        <div className="RangeValue">{rangeValue} eur</div>
      </div>
      <HelpCounter rangeValue={rangeValue} />
    </section>
  );
};

export default Impact;
