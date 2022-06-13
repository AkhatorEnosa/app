import React from "react";

const FaceRecognition = (prop) => {
    return (
        <div className="center w-30 mt5">
            <img src={prop.imageUrl}/>
        </div>
    )
}


export default FaceRecognition;