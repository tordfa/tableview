export async function login() {

}



export async function signup(email_input, password_input) {
    const signupUrl = process.env.REACT_APP_HOST_URL + "/api/signup"
    try {
        const response = await fetch(signupUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email_input, password: password_input })
        });
        if (!response.ok) {
            throw new Error('Response status:' + response.status)
        }
        return response;
    }
    catch (error) {
        console.error('There was an error signing up');
    }
}

export async function signIn(email_input, password_input) {
    const signinUrl = process.env.REACT_APP_HOST_URL + "/api/login"
    try {
        const response = await fetch(signinUrl, {
            credentials: 'include',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email_input, password: password_input })
        });
        if (!response.ok) {
            throw new Error('Response status:' + response.status)
        }
        return response;
    }
    catch (error) {
        console.error('There was an error signing in');
    }
}

export async function logout() {
const logoutUrl = process.env.REACT_APP_HOST_URL + "/api/logout"
console.log('Logging out!');

    try {
        const response = await fetch(logoutUrl,{
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Response status:' + response.status)
        }
        console.log('BSALGA');
        
        console.log(response);
        
        return response;
    }
    catch (error) {
        console.error('There was an error logging out');
    }
}
