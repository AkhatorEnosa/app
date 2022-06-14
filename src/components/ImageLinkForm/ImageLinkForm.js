import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className="w-50 center">
            <p className="f5">
                {'With the help of this app, you can easily recognise a face in a picture. Give it a try.'}
            </p>
            <div id="form" className="pa4 br3 shadow-5 f6">
                <input type="text" autoFocus className="pa2 br2 w-70 bg-white-70 center" style={{ outline: "none", border:  "none"}} onChange={onInputChange}/>
                <button className="grow br2 dib white pointer" style={{ padding: "10px", outline: "none", border: "none", background: "rgb(61, 223, 255)"}} onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;