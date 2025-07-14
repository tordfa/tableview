export async function signup(email_input, password_input) {
    const signupUrl = process.env.REACT_APP_HOST_URL + "/api/signup"
    try {
        const response = await fetch(signupUrl, {
            credentials: 'include',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email_input, password: password_input })
        });
        if (!response.ok) {
            throw new Error('Response status:' + response)
        }
        return { success: true, response: response };
    }
    catch (error) {
        console.error('There was an error signing up');
        return { success: false, error: error }
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
        return { success: true, response: response };
    }
    catch (error) {
        console.log('There was an error signing in');
        return { success: false, error: error }
    }
}

export async function createTenant(tenant_name, tenant_url) {
    const createTenantUrl = process.env.REACT_APP_HOST_URL + "/api/createtenant"
    try {
        const response = await fetch(createTenantUrl, {
            credentials: 'include',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tenant_name: tenant_name, tenant_url: tenant_url })
        });
        if (!response.ok) {
            throw new Error('Response status:' + response.status)
        }
        return { success: true, response: response };
    }
    catch (error) {
        console.log('There was an error signing in');
        return { success: false, error: error }
    }
}

export async function logout() {
    const logoutUrl = process.env.REACT_APP_HOST_URL + "/api/logout"
    try {
        const response = await fetch(logoutUrl, {
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Response status:' + response.status)
        }
        return { success: true, response: response };
    }
    catch (error) {
        console.error('There was an error logging out');
        return { success: false, error: error }
    }
}

export async function isAuthenticated() {

    const authUrl = process.env.REACT_APP_HOST_URL + "/api/auth"
    try {
        const response = await fetch(authUrl, {
            credentials: 'include'
        })
        if (!response.ok) {
            throw new Error('Response status:' + response.status)
        }
        return { success: true, response: response };
    }
    catch (error) {
        return { success: false, error: error }
    }
}