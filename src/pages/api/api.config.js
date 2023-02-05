// import axios from "axios";

// export const MyAxios = axios.create({
//     baseURL: "https://gorest.co.in",
//     headers: {
//         'Authorization': 'Bearer ' + tokenAPI
//     }
// });

// let postsAPI = `/posts`;
// let usersAPI = `/users`;
// let commentsAPI = `/comments`;

// export default MyAxios;


// url base
let urlBase = "https://gorest.co.in/public/v2";

let postsAPI = `${urlBase}/posts`;
let usersAPI = `${urlBase}/users`;
let commentsAPI = `${urlBase}/comments`;

// let tokenAPI = process.env.TOKEN_API;
let tokenAPI = "ca3bf82c70a1d2276fe21da6a06ae0372b7d1f15c9e60301752f237aac494631";

export {
    urlBase,
    postsAPI,
    usersAPI,
    commentsAPI,
    tokenAPI
}





