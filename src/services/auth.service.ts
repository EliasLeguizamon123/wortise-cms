import axios from "axios";

export const AuthService = {
    async saveToken(token: string) {
        await axios.post("/api/auth/session", { token });
    },

    async logout() {
        await axios.delete("/api/auth/session");
    },
};