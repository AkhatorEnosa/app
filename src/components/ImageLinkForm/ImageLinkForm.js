import React from "react";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className="w-50 center">
            <p className="f5">
                {'With the help of this app, you can easily recognise a face in a picture. Give it a try.'}
            </p>
            <div className="pa4 br3 shadow-5">
                <input type="text" autoFocus className="f4 pa2 w-70 center" style={{ outline: "none", border:  "none"}} onChange={onInputChange}/>
                <button className="w-30 grow ph2 dib pv2 white bg-red pointer" style={{ outline: "none", border: "none"}} onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;