import React from "react";

const Rank = ({ name, entries}) => {
    return (
        <div className="white mb5">
            <span className="f5">{`${name}, your current entry count is...`}</span>
            <h2 className="f3">{entries}</h2>
        </div>
    )
}

export default Rank;