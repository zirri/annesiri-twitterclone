import React from 'react';
import {createSession} from '../services/session'

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loginForm: {
                handle: '',
                password: ''
            },
            error: null,
            isLoggingIn: false
        }
    }
    
    handleLinkSignup(event){
        const { history } = this.props;
        history.push('/signup');
    }

    handleInputChange(field, event){
        this.setState({
            loginForm: 
                {
                ...this.state.loginForm,
                [field]: event.target.value
                }
            }
        )
    };

    async handleLoginAttempt(event){
        event.preventDefault();
        const { handle, password } = this.state.loginForm;
        const { history } = this.props;

        try{
            this.setState({isLoggingIn: true, error: null});
            const { token, error} = await createSession(handle, password);
            if(error){
                throw new Error(error);
            }
            if(!token){
                throw new Error('No token recieved - try again');
            }

            localStorage.setItem('twitter_clone_token', token);
            history.push('/');

        }catch(error){
            this.setState({
                error,
                isLoggingIn: false
            })
        }

    }

    render(){
        const { isLoggingIn, error } = this.state;

        if(error){

        }
        return (
        <main>
            <h1>login</h1>
            <form>
                <div>
                    <label>
                        Username:
                        <input 
                            type='text' 
                            value={this.state.loginForm.handle} 
                            onChange={this.handleInputChange.bind(this, 'handle')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input      
                            type='password' 
                            value={this.state.loginForm.password} 
                            onChange={this.handleInputChange.bind(this, 'password')}
                        
                        />
                    </label>
                </div>
                <button onClick={this.handleLoginAttempt.bind(this)}>Login</button>
                <div>
                    {isLoggingIn ? <p>Logging in ...</p> : ''}
                    {error ? <p>Unable to log in {error.message}</p> : ''}
                </div>
            </form>
            <button onClick={this.handleLinkSignup.bind(this)}>Sign up</button>
        </main>)
    }
}

export default Login;