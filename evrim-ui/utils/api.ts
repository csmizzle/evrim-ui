import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

// ser up axios crsftoken
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"


class EvrimClient {
    private client: AxiosInstance;

    constructor() {
        const runtimeConfig = useRuntimeConfig();
        console.log("API URL: ", runtimeConfig.public.EVRIM_API_URL);
        this.client = axios.create({
            baseURL: runtimeConfig.public.EVRIM_API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
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
        return this.client.post('/register/', {
            username: username,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,
        });
    }

    createStripeCheckoutSession(token: string) {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.post('/checkout/session/', {}, config);
    }

    getTokens(username: string, password: string) {
        return this.client.post('/token/' , {
            username: username,
            password: password,
        })
    }

    subscribe() {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.post('/subscribe/', {}, config);
    }

    isSubscribed() {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.get('/subscribed/', config);
    }

    getUserInfo() {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.get('/user-info/', config);
    }

    updateUserInfo(
        username: string,
        email: string,
        firstName: string,
        lastName: string,
    ) {
        return this.client.put('/user-info/', {
            username: username,
            email: email,
            first_name: firstName,
            last_name: lastName,
        });
    }

    updatePartialUserInfo(
        username: string | null,
        email: string | null,
        firstName: string | null,
        lastName: string | null,
    ) {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.patch('/user-info/', {
            username: username,
            email: email,
            first_name: firstName,
            last_name: lastName,
        }, config);
    }

    getReports(token: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return this.client.get('/reports/', config);
    }

    submitReport(
        url: string,
        title: string,
        description: string,
        style: string,
        tone: string,
        point_of_view: string
    ) {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.post('/research/', {
            url: url,
            title: title,
            description: description,
            style: style,
            tone: tone,
            point_of_view: point_of_view,
        }, config);
    }

    deleteReport(reportId: string) {
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': getCookie('csrftoken'),
            }
        }
        return this.client.post(`/reports/${reportId}/`, config);
    }

    deleteTask(taskId: string) {
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': getCookie('csrftoken'),
            }
        }
        return this.client.delete(`/tasks/${taskId}/`, config);
    }

    getTasks() {
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': getCookie('csrftoken'),
            }
        }
        return this.client.get('/tasks/', config);
    }

    getReportFromTaskId(token: string, taskId: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return this.client.get(`/tasks/${taskId}/report/`, config);
    }

    generateReportPdf(token: string, reportId: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return this.client.get(`/generate/${reportId}/pdf/`, config);
    }

    generateReportDocx(token: string, reportId: string) {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return this.client.get(`/generate/${reportId}/docx/`, config);
    }

    getAllGraphs() {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.get('/graphs/', config);
    }

    getTasksByDay() {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.get('/utils/tasks-by-day/', config);
    }

    getReportSources() {
        const cookie = useCookie('csrftoken');
        const config: AxiosRequestConfig = {
            headers: {
                'X-CSRFTOKEN': cookie.value,
            }
        }
        return this.client.get('/utils/reports-sources/', config);
    }
}

export default EvrimClient;