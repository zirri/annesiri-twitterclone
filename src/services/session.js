const API_URL = '/api';

export function createSession(handle, password){
    return fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({handle, password})
    })
    .then(res => res.json());
}

export function checkSession(){
    console.log(localStorage.getItem('twitter_clone_token'));
    const headers = {
        'Content-type': 'application/json',
        'x-auth-token': localStorage.getItem('twitter_clone_token')
    } 
    console.log(headers)

    return fetch(`${API_URL}/session`,{
        method: 'GET',
        headers
    }).then(res => {
        console.log(res)
        return res.status === 200});
}