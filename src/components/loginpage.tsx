import React from "react";
import GoogleLogin from 'react-google-login';
import { Redirect } from "react-router";



interface IProps {
    setAuthenticate: any
}

class LoginPage extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }
    public responseGoogle = (response: any) => {
        console.log("hi")
        this.props.setAuthenticate(true)
        if(response.ok) {
            this.props.setAuthenticate(true)
        }
    }

    public failGoogle = (response: any) => {
        alert("Invalid login");
    }
    render() {

        const googleButton = (
            <GoogleLogin
                clientId="568175375094-akbedu10kqssq578062a3ijsvsvdvttb.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        )
        return googleButton;
    }
}

export default LoginPage;