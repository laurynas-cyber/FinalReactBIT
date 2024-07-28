import { useState, useRef } from "react";
import { MdCancel } from "react-icons/md";

function Upload() {
  const [image, setImage] = useState(null);
  const imageInput = useRef();

  const imageReader = (img) => {
    return new Promise((resolve, reject) => {
      //sukuriam eile
      const reader = new FileReader(); //sukuriam failu readeri
      reader.readAsDataURL(img); //skaitom faila ir laukiam
      reader.onload = (_) => resolve(reader.result); // kai sulaukiam  grazinam rezultata
      reader.onerror = (error) => reject; // jeigu negero nutinka tai rejectinam
    });
  };

  const handleImage = (e) => {
    imageReader(e.target.files[0])
      .then((res) => {
        setImage(res);
      })

      .catch((_) => {
        setImage(null);
      });
  };

  console.log(image);

  const ClearImage = (_) => {
    imageInput.current.value = null;
    setImage(null);
  };

  return (
    <>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupFile01">
          Upload picture
        </label>
        <input
          ref={imageInput}
          onChange={handleImage}
          type="file"
          className="form-control"
          id="inputGroupFile01"
        />
      </div>
      <div className="up-img">
        {image ? (
          <>
            <img src={image} alt="uploaded"></img>
            <span className="cb-svg remove" onClick={ClearImage}>
              <MdCancel />
            </span>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Upload;
