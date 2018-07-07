import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

class App extends Component {


    constructor() {
        super();

        Amplify.configure({
            Auth: {
                // REQUIRED - Amazon Cognito Identity Pool ID
                identityPoolId: 'us-west-2:d679e943-eb38-466f-8d40-711747a0e6d0',
                // REQUIRED - Amazon Cognito Region
                region: 'us-west-2',
                // OPTIONAL - Amazon Cognito User Pool ID
                userPoolId: 'us-west-2_jIsIpCNOd',
                // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
                userPoolWebClientId: 'pv0n9flbal1es0lob2t1mj5rf'
            },
            API: {
                endpoints: [
                    {
                        region: "us-west-2",
                        service: "execute-api",
                        name: "ProjectYetiTicketService",
                        endpoint: "https://jfqrm8l4aj.execute-api.us-west-2.amazonaws.com/dev-lingfeil/tickets"
                    },
                    {
                        region: "us-west-2",
                        service: "execute-api",
                        name: "ProjectYetiOrderService",
                        endpoint: "https://gzcp4d3yzl.execute-api.us-west-2.amazonaws.com/dev-lingfeil/orders"
                    }
                ]
            }
        });

        this.initApiJwtToken()
            .then(apiJwtToken => {
                this.props.confirmSignIn(apiJwtToken);
                this.props.hideSignUpModal();
            }).catch(err => {
            console.error("Error initiating API jwt token. Error: " + err);
            this.props.signOut();
        });
    }



    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component = { Home }/>
                </div>
            </Router>
        )
    }
}

export default App;