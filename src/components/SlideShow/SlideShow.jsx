import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./SlideShow.css";

const Slideshow = (props) => {
  const srcImg = ['http://res.cloudinary.com/dz2fcqjpg/image/upload/v1694097599/g0qcgauuz4axgeaso2bw.jpg', 'http://res.cloudinary.com/dz2fcqjpg/image/upload/v1694097604/kpwtuhtekwbd42euusag.jpg']
  return (
    <div className="slide-container" style={props.styleContainer}>
      <Fade>
        {props.srcImg?.map((fadeImage, index) => (
          <div key={index}>
            <img style={props.style} src={fadeImage} />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
