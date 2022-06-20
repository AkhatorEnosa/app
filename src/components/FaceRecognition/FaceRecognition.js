import React from "react";
import './FaceRecognition.css';

const FaceRecognition = (props) => {
    return (
        <div className='custom-center ma'>
            <small className="mt4" style={{ marginTop: "40px", color: "white" }}>{props.message}</small>
            <div className='absolute mt5'>
                <img id="inputImage" src={props.imageUrl} width="300px" height="auto"/>
                <div className="bounding-box absolute" style={{ top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow, left: props.box.leftCol}}></div>
            </div>
        </div>
    )
}


export default FaceRecognition;