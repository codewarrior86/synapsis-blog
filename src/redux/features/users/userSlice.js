import urlAPI, { usersAPI } from "@/pages/api/api.config";
import axios from "axios";
import { toast } from "react-toastify";
import UserDataService from "./userService";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    data: [],
    isSuccess: false,
    error: null,
    responseStatus: null,
    message: "",
    loading: false,
    // page: 1,
    // limit: 25
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (arg, { rejectWithValue }) => {
        try {
            // const { data } = await axios.get(`https://gorest.co.in/public/v2/users`);
            // const { data } = await urlAPI.get(`${usersAPI}?page=1&per_page=10`);
            const { data } = await UserDataService.getAll();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const deleteUser = createAsyncThunk(
    "users/delete",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await UserDataService.delete(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createUser = createAsyncThunk(
    "users/create",
    async (dataUser, { rejectWithValue }) => {
        try {
            const { data } = await UserDataService.create(dataUser);
            // toast.success("User Created Successfully!");

            return data;

        } catch (error) {
            console.log("=============error create user===============")
            console.log(error)
            // return rejectWithValue(error.message);

            if (error.response.data[0].message === "has already been taken") {
                return rejectWithValue("Email has been registered, please input another email !");
            }
            else if (error.response.data[0].message === "can't be blank" || error.response.data[0].message === "can't be blank, can be male of female") {
                return rejectWithValue("Please fill all input's form !");
            }
            else {
                return rejectWithValue("Failed to Create User!");
            }



            // return rejectWithValue(error.response.status);

        }
    }
);

// export const editUser = createAsyncThunk(
//     "users/edit",
//     async (id, dataUser, { rejectWithValue }) => {
//         // async (updatedUser, { rejectWithValue }) => {
//         //     const { id, ...dataUser } = updatedUser;
//         try {
//             // const { data } = await UserDataService.update(id, { ...dataUser });
//             const { data } = await UserDataService.update(id, dataUser);
//             // console.log("=========editUser========")
//             // console.log(id)
//             // console.log(dataUser)
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

export const editUser = createAsyncThunk(
    "users/edit",
    async ({id, dataUser}, { rejectWithValue }) => {
        try {
            const { data } = await UserDataService.update(id, dataUser);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// export function bindComments(postId) {
//     return function(dispatch) {
//         return API.fetchComments(postId).then(comments => {
//             // dispatch
//             dispatch({
//                 type: BIND_COMMENTS,
//                 comments,
//                 postId
//             });
//         });
//     };
// }

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // deleteUser(state, action) {
        //     const { id } = action.payload;
        //     const existingUser = state.data.find((user) => user.id === id);     //cari id user di store
        //     if (existingUser) {
        //         state.data = state.data.filter((user) => user.id !== id);       //simpan semua data kecuali data id yg dihapus
        //     }
        // },
    },
    extraReducers: {
        // GET
        [fetchUsers.pending]: (state, action) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.isSuccess = true;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        },

        // DELETE
        [deleteUser.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            // state.message = action.payload;

            // let index = state.data.findIndex(({ id }) => id === action.payload.id);
            // state.data.splice(index, 1);

            const id = action.payload; // id yang akan dihapus
            const existingUser = state.data.find((user) => user.id === id);     //cari id user yg akan dihapus di store
            if (existingUser) {
                state.data = state.data.filter((user) => user.id !== id);       //simpan semua data kecuali data id yg dihapus
            }

            state.isSuccess = true;
        },
        [deleteUser.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },


        // CREATE
        [createUser.pending]: (state, action) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [createUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.message = payload;

            // Re-render
            state.data.push(payload);
            state.isSuccess = true;

        },
        [createUser.rejected]: (state, { payload }) => {
            console.log("======payload=======")
            console.log(payload)

            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },


        // PUT
        [editUser.pending]: (state, action) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [editUser.fulfilled]: (state, action) => {
            state.loading = false;

            // const index = state.data.findIndex(usr => usr.id === action.payload.id);
            // state.data[index] = {
            //     ...state.data[index],
            //     ...action.payload,
            // };

            // Re-render
            // state.data.push(payload);
            // state.data = action.payload;

            // const index = state.data.findIndex(usr => usr.id === action.payload.id);
            // action.payload.id >>> hasil return id dari editUser berupa object user


            const userUpdatedData = state.data.find((user) => user.id === action.payload.id);     //cari id user di store

            const index = state.data.findIndex(usr => usr.id === action.payload.id);
            // const updatedUser = state.data.map(usr =>
            //     usr.id === action.payload.id ?
            //         { ...usr, ...action.payload } :
            //         action.payload
            // );
            console.log("=======state.data[index]=============")
            console.log(state.data[index])

            state.data[index] = {
                ...state.data[index],
                // updatedUser

                // userUpdatedData
                ...action.payload
            }

            // state.data = {
            //     ...state.data[index],
            //     ...action.payload,
            // };



            // const { id, ...rest } = action.payload;
            // const index = state.data.findIndex(usr => usr.id === id);
            // if (index !== -1) {
            //     state.data[index] = {
            //         ...state.data[index],
            //         ...rest
            //     }
            // }


            // const userUpdatedData = state.data.find((user) => user.id === action.payload.id);     //cari id user di store
            // const userUpdatedData = state.data.map((user) => user.id === action.payload.id);     //cari id user di store
            // if (userUpdatedData) {
            //     state.data = {
            //         ...state.data,
            //         ...action.payload,
            //     };
            // }


            // const {
            //     arg: { id },
            // } = action.meta;

            // console.log("===id meta====")
            // console.log(id)

            // if (id) {
            //     state.data = state.data.map((user) =>
            //         user.id === id ? action.payload : user
            //     );
            //     state.tours = state.tours.map((user) =>
            //         user.id === id ? action.payload : user
            //     );
            // }

            state.isSuccess = true;
        },
        [editUser.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },

    }
})

export default userSlice;

// store - reducer -  initialState
export const getAllUsers = (state) => state.user.data;
// export const { deleteUser } = userSlice.actions;
