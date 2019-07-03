import React from "react"

import EachCard from "./Components/EachCard"
import ds from "./Data/Datastructures";
import algos from "./Data/Algorithms";
import Custombar from "./Components/Navbar.js"
import Loader from './Components/Loader'

function Cards() {
  const dsComponents = ds.map(structure => <EachCard key={structure.id} Ecard={{ image: structure.img, title: structure.title, type: structure.type }} />)
  const algoComponents = algos.map(structure => <EachCard key={structure.id} Ecard={{ image: structure.img, title: structure.title, type: structure.type }} />)
  const cardStyle = {
    display: "flex",
    overflowX: "scroll",
    flexShrink: 0,
    overflowScrolling: "touch",
    WebkitOverflowScrolling: "touch",
    WebkitScrollbarDisplay: "none",
    padding: "50px",
    margin: "20px",
    backgroundColor: "	#F0F0F0",
  };

  return (
    <div className="jumbotron" style={{ margin: "20px" }}>
      <h1 style={{ margin: "20px" }}>Data structures</h1>
      <hr className="style14" />
      <div className="carousel-inner" style={cardStyle}>
        {dsComponents}
      </div>
      <h1 style={{ margin: "20px" }}>Algorithms</h1>
      <hr className="style14" />
      <div className="cardContainer" style={cardStyle}>
        {algoComponents}
      </div>
    </div>
  )
}


export default Cards