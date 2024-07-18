import HashLoader from "react-spinners/HashLoader";
import { LoaderContext } from "../Context/Loader";
import { useContext } from "react";

export const LoaderContainer = () => {
  const { show } = useContext(LoaderContext);

  if (!show) return null;

  return (
    <div className="loader-container">
      <HashLoader color="#38f5b1" size={150} />
    </div>
  );
};
