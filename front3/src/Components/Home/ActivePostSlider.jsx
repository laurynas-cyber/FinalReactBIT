import * as l from "../../Constants/urls";

export default function ActivePostSlider({ postData }) {
  const NewPostData = [];

  for (let i = 0; i < postData.length; i += 3) {
    NewPostData.push(postData.slice(i, i + 3));
  }

  console.log(NewPostData[0][0].image);

  return (
    <section className="ActivePostSliderSection">
      <div className="ActivePostSliderContainer">
        {NewPostData.map((arr, i) => (
          <div className="PostSlider" key={arr[i].image}>
            {arr.map((p) => (
              <img key={arr.image} src={l.SERVER_IMAGES_URL + p.image}></img>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
