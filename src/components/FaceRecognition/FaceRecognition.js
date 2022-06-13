import React from "react";
import './FaceRecognition.css';

const FaceRecognition = (prop) => {
    return (
        <div className='custom-center ma'>
            <div className='absolute mt5'>
                <img id="inputImage" src={prop.imageUrl} width="300px" height="auto"/>
                <div className="bounding-box absolute" style={{ top: prop.box.topRow, right: prop.box.rightCol, bottom: prop.box.bottomRow, left: prop.box.leftCol}}></div>
            </div>
        </div>
    )
}


export default FaceRecognition;