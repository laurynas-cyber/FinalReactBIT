import { useRef } from "react";
import { MdCancel } from "react-icons/md";

function Upload({ post, setPost }) {
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

  // console.log(image);

  const handleImage = (e) => {
    imageReader(e.target.files[0])
      .then((res) => {
        setPost((p) => ({ ...p, image: res }));
      })

      .catch((_) => {
        setPost((p) => ({ ...p, image: null }));
      });
  };

  const ClearImage = (_) => {
    imageInput.current.value = null;

    setPost((p) => ({ ...p, image: null }));
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
          name="image"
          className="form-control"
          id="inputGroupFile01"
        />
      </div>
      <div className="up-img">
        {post.image ? (
          <>
            <img src={post.image} alt="uploaded"></img>
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
