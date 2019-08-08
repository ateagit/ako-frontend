import React from "react";
import GoogleLogin from 'react-google-login';

const responseGoogle = (response: any) => {
    console.log(response);
}

class LoginPage extends React.Component<{}, {}> {

    render() {

        const googleButton = (
            <GoogleLogin
                clientId="568175375094-akbedu10kqssq578062a3ijsvsvdvttb.apps.googleusercontent.com"
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