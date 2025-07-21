import axios from "axios";

export const AuthService = {
    async login(email: string, password: string) {
        try {
            const { data } = await axios.post("/api/login", {
                email,
                password,
            })

            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw new Error("Ocurrió un error inesperado al iniciar sesión");
            }
        }
    },
    async register(name: string, email: string, password: string) {
        try {
            const { data } = await axios.post("/api/register", {
                name,
                email,
                password,
            })

            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw new Error("Ocurrió un error inesperado al registrarse");
            }
        }
    },
    async logout() {
        await axios.post("/api/logout")
    },
};