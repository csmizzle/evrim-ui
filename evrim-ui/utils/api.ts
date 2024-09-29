import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

class EvrimClient {
    private client: AxiosInstance;

    constructor() {
        const runtimeConfig = useRuntimeConfig();
        this.client = axios.create({
            baseURL: runtimeConfig.public.EVRIM_API_URL,
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

    createStripeCheckoutSession(token: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return this.client.post('/checkout/session/', {}, config);
    }

    getTokens(username: string, password: string) {
        return this.client.post('/token/' , {
            username: username,
            password: password,
        })
    }

    subscribe(token: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return this.client.post('/subscribe/', {}, config);
    }

    isSubscribed(token: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return this.client.get('/subscribed/', config);
    }
}

export default EvrimClient;