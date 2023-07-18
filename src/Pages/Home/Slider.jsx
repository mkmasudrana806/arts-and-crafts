import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./Home.css"
import { Link } from "react-router-dom"

const carousel = (slider) => {
  const z = 300
  function rotate() {
    const deg = 360 * slider.track.details.progress
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
    })
    rotate()
  })
  slider.on("detailsChanged", rotate)
}

const Slider=()=> {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  )

  return (
    <div className="wrapper my-5">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
        <div className="carousel__cell number-slide1">
        <div className="d-flex align-items-center flex-column">
            <img src="https://media.istockphoto.com/id/507451973/photo/little-boy-painting-bird-house.jpg?s=612x612&w=0&k=20&c=HMU5aqKqtySe0bnWO3YITHRvxSxrPgtsTr21SahcX34=" alt="" />
            <h2 className="text-center"> Learn and Fun</h2>
            <button><Link  to={'/classes'} className="text-center m-auto text-decoration-none text-white">Explore Class</Link></button>
            
        </div>
        </div>
        <div className="carousel__cell number-slide3">
        <div className="d-flex align-items-center flex-column">
            <img src="https://media.istockphoto.com/id/612263694/vector/kids-creativity-creation-symbols-vector-set.jpg?s=612x612&w=0&k=20&c=02NSrPOAdR_0jNnwrb2l0mg3kVIIs_-SvuWVkP23XOM=" alt="" />
            <h2 className="text-center"> Art and Craft </h2>
            <button><Link  to={'/register'} className="text-center m-auto text-decoration-none text-white">Join Now</Link></button>
        </div>
        </div>
        <div className="carousel__cell number-slide4">
        <div className="d-flex align-items-center flex-column">
            <img src="https://img-c.udemycdn.com/course/480x270/5210972_6b39.jpg" alt="" />
            <h2 className="text-center">Let's learn </h2>
            <button><Link  to={'/instructors'} className="text-center m-auto text-decoration-none text-white">Our Instructor</Link></button>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Slider