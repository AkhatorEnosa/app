import React from "react";


const Navigation = (prop) => {
    if(prop.isSignedIn === true){
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end"}} className="mb5">
                <small className="f7 link dim white underline pa3 pointer bg-black" onClick={()=>prop.onRouteChange("signin")}>Sign Out</small>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end"}} className="mb5">
                <small className="f7 link dim white underline pa3 pointer bg-black" onClick={()=>prop.onRouteChange("register")}>Register</small>
                <small className="f7 link dim white underline pa3 pointer bg-black" onClick={()=>prop.onRouteChange("signin")}>Sign In</small>
            </nav>
        );
    }
}

export default Navigation;