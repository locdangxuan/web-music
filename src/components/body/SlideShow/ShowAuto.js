import React from 'react';
import './ShowAuto.css';
import Slideshow from "./Slideshow"
import img1 from '../../Image/img1.jpg';
import img2 from '../../Image/img2.jpg';
import img3 from '../../Image/img3.jpg';
import img4 from '../../Image/img4.jpg';
import img5 from '../../Image/img5.jpg';
import img6 from '../../Image/img6.jpg';

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
  { src: img4, caption: "Caption four" },
  { src: img5, caption: "Caption five" },
  { src: img6, caption: "Caption six" },
];

export default class ShowAuto extends React.Component {
  render() {
    return (
      <div className="show">
        <Slideshow 
          input={collection}  
          ratio={`3:2`}
          mode={`automatic`}
          timeout={`3000`}
        />
      </div>
    );
  }
}