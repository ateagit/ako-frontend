import React from "react";
import GoogleLogin from 'react-google-login';

const responseGoogle = (response: any) => {
    console.log(response);
}

class LoginPage extends React.Component<{}, {}> {

    render() {

        const googleButton = (
            <GoogleLogin
                clientId="568175375094-3ee65feqm7s1o0nr43vv3bkhk8bipa70.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        )
        return googleButton;
    }
}

export default LoginPage;