import React from 'react'

function Loader(props) {
    console.log(props)
    const style = {
        position: props.position,
        top: props.top,
        left: props.left,
    }
    return (
        <div class="d-flex justify-content-center"
            style={style}>
            <div class="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span class="sr-only">Loading...</span></div>
        </div>
    )
}


export default Loader