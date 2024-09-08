import React, { Component } from "react";
import Slider from "react-slick";
import "./Carousel.css";

class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "/public/sample-image.png",
        "/public/sample-image.png",
        "/public/sample-image.png",
        "/public/sample-image.png",
        "/public/sample-image.png",
      ],
    };

    this.fileInputRef = React.createRef(); // Create a ref for the file input
  }

  // Method to handle image upload
  handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState((prevState) => ({
          images: [...prevState.images, e.target.result], // Append the new image
        }));
      };
      reader.readAsDataURL(file); // Convert image to base64 for display
    }
  };

  // Method to trigger the file input click
  handleButtonClick = () => {
    this.fileInputRef.current.click(); // Trigger click on hidden file input
  };

  render() {
    const settings = {
      dots: false, // Global setting to disable dots
      infinite: false, // Global setting to disable infinite scrolling
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024, // Adjust for smaller screens
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false, // Override in responsive mode
            dots: false, // Ensure dots are still disabled in responsive
          },
        },
        {
          breakpoint: 600, // Mobile view
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false, // Ensure infinite scrolling is disabled
            dots: false, // Ensure dots are disabled
          },
        },
      ],
    };

    return (
      <div className="carousel-container">
        <div className="upload-container">
          <h1 className="gallery-heading">Gallery</h1>
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            onChange={this.handleAddImage}
            ref={this.fileInputRef} // Ref for the file input
            className="upload-input"
            style={{ display: "none" }} // Hidden file input
          />

          {/* Upload Button */}
          <button
            type="button"
            className="upload-button"
            onClick={this.handleButtonClick}
          >
            + ADD IMAGE
          </button>
        </div>

        {/* Carousel */}
        <Slider {...settings}>
          {this.state.images.map((img, index) => (
            <div key={index} className="carousel-card">
              <img
                src={img}
                alt={`carousel-${index}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5968 8.37648L1.40236 8.37648"
          stroke="#6F787C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.5968 1.37646L15.5968 8.37646L8.5968 15.3765"
          stroke="#6F787C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.40222 8.37645H15.5967"
          stroke="#6F787C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.40222 15.3765L1.40222 8.37646L8.40222 1.37646"
          stroke="#6F787C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default ImageSlider;
