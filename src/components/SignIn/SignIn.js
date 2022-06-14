import React from "react";
import './SignIn.css';

const SignIn = (prop) => {
    return (
        <div className="pa4 br3 shadow-5 f6 w-40 center white">
            <main className="pa1 black-80">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input className="pa2 input-reset bg-white-70 ba br2 w-100" style={{ outline: "none", border:  "none"}} type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" for="password">Password</label>
                            <input className="pa2 input-reset bg-white-70 ba br2 w-100" style={{ outline: "none", border:  "none"}} type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b br2 ph3 pv2 input-reset ba grow pointer f6 dib" style={{ outline: "none", border:  "none", background: "rgb(61, 223, 255)"}} type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" className="f6 link dim black db">Register</a>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default SignIn;