import React, { Component } from "react";

// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";

export class ChefGallery extends Component {

  render() {

    const { user } = this.props

    return (
      <div className="carousel">
        
        {/* <Carousel swipeable={true} autoPlay infiniteLoop interval={3000} showThumbs={false} transitionTime="500">
          {user.chef.imgs.map(img => <img className="carousel-img" src={img} alt="" key={user._id} />)}
        </Carousel> */}

        {user.chef.imgs.map((img, idx) => <img className="carousel-img" src={img} alt="" key={idx} />)}

      </div>
    );
  }
}