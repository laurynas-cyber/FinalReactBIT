import tabletsImg from "../../assets/images/tablet.png";
import candysImg from "../../assets/images/candys.png";
import hearthImg from "../../assets/images/hearth.png";
import kitImg from "../../assets/images/kit.png";

export default function HelpCounter({ rangeValue }) {
  return (
    <div className="HelpCountContainer">
      <div className="HelpKitContainer">
        <div className="divide-line"></div>
        <div className="HelpKitImgContainer">
          <img src={tabletsImg} alt="tablet"></img>

          <span className="CounterKit">{Math.floor(rangeValue / 0.12)}</span>
          <p>water purification tablets</p>
        </div>
      </div>
      <div className="HelpKitContainer">
        <div className="divide-line">
          <span className="divide-text">OR</span>
        </div>
        <div className="HelpKitImgContainer">
          <img src={candysImg} alt="candy"></img>
          <span className="CounterKit">{Math.floor(rangeValue / 0.17)}</span>
          <p>malnutrition treating food sachets</p>
        </div>
      </div>
      <div className="HelpKitContainer">
        <div className="divide-line">
          <span className="divide-text">OR</span>
        </div>
        <div className="HelpKitImgContainer">
          <img src={hearthImg} alt="hearth"></img>
          <span className="CounterKit">{Math.floor(rangeValue / 1.69)}</span>
          <p>midwives' birth kits</p>
        </div>
      </div>
      <div className="HelpKitContainer">
        <div className="divide-line">
          <span className="divide-text">OR</span>
        </div>
        <div className="HelpKitImgContainer">
          <img src={kitImg} alt="kit"></img>
          <span className="CounterKit">{Math.floor(rangeValue / 25)}</span>
          <p>new-born baby hygiene kits</p>
        </div>
      </div>
    </div>
  );
}
