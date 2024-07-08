// https://www.davidhu.io/react-spinners/
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input
        value={color}
        onChange={(input) => setColor(input.target.value)}
        placeholder="Color of the loader"
      />

      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <ClimbingBoxLoader color="#358cc8" />
    </div>
  );
}

export default App;
