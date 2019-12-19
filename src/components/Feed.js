import React from 'react';
import jwtDecode from 'jwt-decode';
import { getTweets, postTweet } from '../services/tweets';
import { Link } from 'react-router-dom';


class Feed extends React.Component{
    constructor(props){
        super(props);

        const token = localStorage.getItem('twitter_clone_token');
        const payload = jwtDecode(token);

        this.state = {
            tweets: [],
            isLoading: false,
            error: null,
            message: '',
            session: payload
        }
    }

    async componentDidMount(){
        await this.populateTweets();
    }

    async populateTweets(){
        try{
            this.setState({isLoading: true})
            const tweets = await getTweets();
            this.setState({
                tweets,
                isLoading: false
            })
        }catch(error){
            this.setState = {
                error
            }
        };
    };

    handleInputChange(field, event){
        this.setState({
            [field]: event.target.value
        })
    }

    async handleSubmitTweet(event){
        event.preventDefault();
        const { message } = this.state;

        if(!message){
            return;
        }

        await postTweet(message);
        await this.populateTweets();
        this.setState({message: ''})
    }

    printTimeSince(timestamp){
        const timeDiffInMinutes = Math.floor((Date.now() - timestamp)/60000);
        const timeDiffInHours = Math.floor(timeDiffInMinutes/60);
        const timeDiffInDays = Math.floor(timeDiffInHours/24);
        const timeDiffInWeeks = Math.floor(timeDiffInDays/7);
        if(timeDiffInMinutes<60){
            return `${timeDiffInMinutes} minute${timeDiffInMinutes===1?'':'s'} ago`;
        }
        if(timeDiffInHours<24){
            return `${timeDiffInHours} hour${timeDiffInHours===1?'':'s'} ago`;
        }
        if(timeDiffInDays<7){
            return `${timeDiffInDays} day${timeDiffInDays===1?'':'s'} ago`;
        }
        else{
            return `${timeDiffInWeeks} week${timeDiffInWeeks===1?'':'s'} ago`;
        }
    }

    render(){
        const { name, handle } = this.state.session;
        const { tweets, error, isLoading, message} = this.state;
        
        if(error){
            return <main>Unable to fetch tweets: {error.message}</main>
        }
        
        if(isLoading){
            return <main>Loading tweets...</main>
        }

        const myDivStyle = {
            border: 'solid black',
            padding: '10px',
            margin: '10px'
        }

        const tweetElements = tweets.map(({ id, message, name, handle, created_at}, index) => {
            created_at = new Date(created_at);
            return(
                <div key={id} style={myDivStyle}>
                    <p>{name} (@{handle}) - {this.printTimeSince(created_at)}</p>
                    <p>{message}</p>
                    {console.log()}
                </div>
            )
        })

        return( 
            <main>
                <h1>Feed for 
                    <Link to={`/profile/${handle}`}> {name} (@{handle})</Link>
                </h1>
                <Link to='/logout'>Log out</Link>
                <form>
                    <input 
                        placeholder="What's going on?"
                        style={{width: '85%', margin: '10px'}}
                        type='textarea' 
                        value={message}
                        onChange={this.handleInputChange.bind(this, 'message')}
                    />
                    <button type='submit' onClick={this.handleSubmitTweet.bind(this)}>Tweet!</button>
                </form>
                <article>
                    {tweetElements}
                </article>
            </main>    
        )
    }
}

export default Feed;