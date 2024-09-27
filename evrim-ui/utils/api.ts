import axios from 'axios';

class EvrimClient {
    client: any;
    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8000',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    login(username: string, password: string) {
        return this.client.post('/login/', { username, password });
    }

    logout() {
        return this.client.post('/logout/');
    }

    register(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
    ) {
        console.log("Registering user");
        return this.client.post('/register/', {
            username: username,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,
        });
    }
}

export default EvrimClient;