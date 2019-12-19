import React from 'react';

class Signup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            signupForm: {
                name: '',
                handle: '',
                password: ''
            },
            error: null,
            isLoggingIn: false
        }
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
            

            const token = '';
            //Post to server
            //Get back new user
            //login / get token

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
            <h1>Signup</h1>
            <form>
                <div>
                    <label>
                        Name:
                        <input 
                            type='text' 
                            value={this.state.signupForm.handle} 
                            onChange={this.handleInputChange.bind(this, 'handle')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Username:
                        <input 
                            type='text' 
                            value={this.state.signupForm.handle} 
                            onChange={this.handleInputChange.bind(this, 'handle')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input      
                            type='password' 
                            value={this.state.signupForm.password} 
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
        </main>)
    }
}

export default Signup;