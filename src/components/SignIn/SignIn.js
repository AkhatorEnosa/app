import React from "react";
import './SignIn.css';

class SignIn extends React.Component{
    constructor (props) {
        super(props);

        this.state = ({
            signInEmail: "",
            signInPassword: "",
        })
    }

    onEmailChange =(e) => {
        this.setState({ signInEmail: e.target.value});
    }

    onPasswordChange =(e) => {
        this.setState({ signInPassword: e.target.value});
    }

    onSubmitSignIn = () => {
        fetch("https://pure-basin-46445.herokuapp.com/signin", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(res => res.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange("home")
            } else {
                alert("Wrong credentials");
                this.setState({signInPassword:""})
            }
        })
        .catch(console.log);
    }

    render() {
        return (
            <div className="pa4 br3 shadow-5 f6 w-40 center white wrapper">
                <main className="pa1 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6">Email</label>
                                <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset bg-white-70 ba br2 w-100" 
                                style={{ outline: "none", border:  "none"}} 
                                type="email" name="email-address"  
                                id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6">Password</label>
                                <input 
                                onChange={this.onPasswordChange}
                                className="pa2 input-reset bg-white-70 ba br2 w-100" 
                                style={{ outline: "none", border:  "none"}} 
                                type="password" name="password"  
                                id="password" 
                                value={this.state.signInPassword}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b br2 ph3 pv2 input-reset ba grow pointer f6 dib" 
                                style={{ outline: "none", border:  "none", background: "rgb(61, 223, 255)"}} 
                                type="submit" 
                                value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer" onClick={()=> this.props.onRouteChange("register")}>Register</p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default SignIn;
