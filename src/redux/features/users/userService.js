import urlAPI, { usersAPI } from "@/pages/api/api.config";

class UserDataService {
    getAll() {
        return urlAPI.get(`${usersAPI}`);
    }

    getById(id) {
        return urlAPI.get(`${usersAPI}?id=${id}`);
    }

    create(data) {
        return urlAPI.post(`${usersAPI}`, data);
    }

    update(id, data) {
        return urlAPI.put(`${usersAPI}/${id}`, data);
    }

    delete(id) {
        return urlAPI.delete(`${usersAPI}/${id}`);
    }

}


export default new UserDataService();