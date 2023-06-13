import axios from "axios";

// let tokenAPI = process.env.TOKEN_API;
let tokenAPI = "ca3bf82c70a1d2276fe21da6a06ae0372b7d1f15c9e60301752f237aac494631";

const urlAPI = axios.create({
    baseURL: "https://gorest.co.in/public/v2",
    headers: {
        "Content-type": "application/json",
        'Authorization': 'Bearer ' + tokenAPI
    }
});
export default urlAPI;

let postsAPI = `/posts`;
let usersAPI = `/users`;
let commentsAPI = `/comments`;

// url base
let urlBase = "https://gorest.co.in/public/v2";

// let postsAPI = `${urlBase}/posts`;
// let usersAPI = `${urlBase}/users`;
// let commentsAPI = `${urlBase}/comments`;


export {
    urlBase,
    postsAPI,
    usersAPI,
    commentsAPI,
    tokenAPI
}





