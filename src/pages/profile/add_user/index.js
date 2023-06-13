import CustomButton, { SIZES, STYLES } from "@/components/CustomButton";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import urlAPI, { postsAPI, tokenAPI, usersAPI } from "@/pages/api/api.config";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../profile.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext } from "@/context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getAllUsers, deleteUser, createUser, editUser } from "@/redux/features/users/userSlice";

const AddUser = () => {


    // =========== REDUX Init =============
    const dispatch = useDispatch();

    // const { data, loading, isSuccess, message } = useSelector(state => state.user);

    // const users = useSelector((store) => store.user.data);
    const users = useSelector(getAllUsers);
    const success = useSelector((store) => store.user.isSuccess);   //state isSuccess user
    const loading = useSelector((store) => store.user.loading);   //state loading user
    const message = useSelector((store) => store.user.message);   //state message user
    // const error = useSelector((store) => store.user.error);   //state error user






    const formRef = useRef();
    const scrollToForm = () => {
        formRef.current.scrollIntoView();
    }

    const { forceUpdate, valueForce } = useGlobalContext();

    const defaultState = {
        id: null,
        name: "",
        email: "",
        gender: "",
        status: ""
    }

    const [errorMessage, setErrorMessage] = useState(defaultState);
    const [state, setState] = useState(defaultState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const resetForm = () => {
        setState(defaultState)
    }


    // Switch CREATE or EDIT
    const [submitStatus, setSubmitStatus] = useState('create');
    const [idUser, setIdUser] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        setTimeout(() => {
            if (submitStatus === "create") {
                // createUser();

                // CREATE - REDUX
                handleCreateUser();

            } else {
                // updateUser(idUser);

                // UPDATE - REDUX
                handleUpdateUser();

            }
        }, 2000);
    };

    // POST
    // const createUser = async () => {
    //     // validations
    //     // name
    //     if (state.name == "") {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             name: "Name not filled !"
    //         }))
    //     } else {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             name: ""
    //         }))
    //     }
    //     // email
    //     if (state.email == "") {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             email: "Email not filled !"
    //         }))
    //     } else {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             email: ""
    //         }))
    //     }
    //     // gender
    //     if (state.gender == "") {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             gender: "Gender not selected !"
    //         }))
    //     } else {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             gender: ""
    //         }))
    //     }
    //     // status
    //     if (state.status == "") {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             status: "Status not selected !"
    //         }))
    //     } else {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             status: ""
    //         }))
    //     }

    //     try {
    //         const res = await urlAPI.post(`${usersAPI}`,
    //             {
    //                 "name": state.name,
    //                 "email": state.email,
    //                 "gender": state.gender,
    //                 "status": state.status
    //             }
    //         )

    //         if (res.status == 200 || res.status == 201) {
    //             console.log("create user success!")
    //             console.log(res)
    //             toast.success("User Created Successfully!");
    //             forceUpdate();
    //         }


    //     } catch (error) {
    //         console.log("error create user!");
    //         console.log(error);

    //         if (error.response.data[0].message === "has already been taken") {
    //             toast.error("Email has been registered, please input another email !");
    //         }
    //         else if (error.response.data[0].message === "can't be blank" || error.response.data[0].message === "can't be blank, can be male of female") {
    //             toast.error("Please fill all input's form !");
    //         }
    //         else {
    //             toast.error("Post Failed to Create!");
    //         }
    //     }

    // }

    // PUT
    // const updateUser = async (id) => {
    //     // validations
    //     // name
    //     if (state.name == "") {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             name: "Name not filled !"
    //         }))
    //     } else {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             name: ""
    //         }))
    //     }
    //     // email
    //     if (state.email == "") {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             email: "Email not filled !"
    //         }))
    //     } else {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             email: ""
    //         }))
    //     }
    //     // gender
    //     if (state.gender == "") {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             gender: "Gender not selected !"
    //         }))
    //     } else {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             gender: ""
    //         }))
    //     }
    //     // status
    //     if (state.status == "") {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             status: "Status not selected !"
    //         }))
    //     } else {
    //         setErrorMessage(prev => ({
    //             ...prev,
    //             status: ""
    //         }))
    //     }

    //     try {
    //         const res = await urlAPI.put(`${usersAPI}/${id}`,
    //             {
    //                 "name": state.name,
    //                 "email": state.email,
    //                 "gender": state.gender,
    //                 "status": state.status
    //             },
    //             // {
    //             //     headers: {
    //             //         // "Content-Type": "multipart/form-data",
    //             //         "Content-Type": "application/json",
    //             //         "Authorization": `Bearer ${tokenAPI}`

    //             //     }
    //             // }
    //         )

    //         if (res.status == 200 || res.status == 201) {
    //             console.log("edit user success!")
    //             console.log(res)
    //             toast.success("User Updated Successfully!");
    //             forceUpdate();
    //         }

    //     } catch (error) {
    //         console.log("error update user!");
    //         console.log(error);
    //         if (error.response.data[0].message === "has already been taken") {
    //             toast.error("Email has been registered, please input another email !");
    //         } else {
    //             toast.error("User Failed to Updated!");
    //         }
    //     }

    // }


    // DELETE
    // const deleteUser = async (id) => {        
    //     try {
    //         const res = await urlAPI.delete(`${usersAPI}/${id}`,
    //             {
    //                 headers: {
    //                     "Authorization": `Bearer ${tokenAPI}`

    //                 }
    //             }
    //         )

    //         if (res.status == 200 || res.status == 201 || res.status == 204) {
    //             console.log("delete user success!")
    //             console.log(res)
    //             toast.success("User Deleted!");
    //             forceUpdate();
    //         }

    //     } catch (error) {
    //         console.log("error delete user!");
    //         console.log(error);
    //         toast.error("Failed to Delete User!");
    //     }
    // }


    // GET
    // const [listUsers, setListUsers] = useState([]);
    // const fetchListUsers = async () => {
    //     try {
    //         const res = await urlAPI.get(
    //             `${usersAPI}?page=1&per_page=25`
    //         );
    //         const data = await res.data;
    //         setListUsers(data);
    //     } catch (error) {
    //         console.log("error fetch user!")
    //     }
    // };

    // useEffect(() => {
    //     fetchListUsers();
    //     console.log("value : " + valueForce)
    // }, [valueForce])



    // get data to form input for edit
    const getUserData = (id, name, email, gender, status) => {
        let update = {
            "id": id,
            "name": name,
            "email": email,
            "gender": gender,
            "status": status
        }

        setState(update);
    }

    // ===================================== REDUX =======================================


    // GET - REDUX
    useEffect(() => {
        dispatch(fetchUsers());
    }, [valueForce])

    // DELETE - REDUX
    const handleDeleteUser = async (id) => {
        dispatch(deleteUser(id))

        if (success) {
            console.log("delete user success!")
            toast.success("User Deleted!");
            // forceUpdate();
        } else {
            console.log("error delete user!");
            toast.error("Failed to Delete User!");
        }
    }

    // POST - REDUX
    const handleCreateUser = async () => {
        // validations
        // name
        if (state.name == "") {
            setErrorMessage(prev => ({
                ...prev,
                name: "Name not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                name: ""
            }))
        }
        // email
        if (state.email == "") {
            setErrorMessage(prev => ({
                ...prev,
                email: "Email not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                email: ""
            }))
        }
        // gender
        if (state.gender == "") {
            setErrorMessage(prev => ({
                ...prev,
                gender: "Gender not selected !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                gender: ""
            }))
        }
        // status
        if (state.status == "") {
            setErrorMessage(prev => ({
                ...prev,
                status: "Status not selected !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                status: ""
            }))
        }

        // } catch (error) {
        //     console.log("error create user!");
        //     console.log(error);

        //     if (error.response.data[0].message === "has already been taken") {
        //         toast.error("Email has been registered, please input another email !");
        //     }
        //     else if (error.response.data[0].message === "can't be blank" || error.response.data[0].message === "can't be blank, can be male of female") {
        //         toast.error("Please fill all input's form !");
        //     }
        //     else {
        //         toast.error("Post Failed to Create!");
        //     }
        // }



        let dataInput = {
            "name": state.name,
            "email": state.email,
            "gender": state.gender,
            "status": state.status
        }

        dispatch(createUser(dataInput))

        console.log("========message========");
        console.log(message)

        if (success) {
            toast.success("User Created Successfully!");
            // toast.success(message);
            forceUpdate();
        } else {
            // toast.error("Failed to Create User!");
            toast.error(message);
        }



    }

    // PUT - REDUX
    const handleUpdateUser = async () => {
        // validations
        // name
        if (state.name == "") {
            setErrorMessage(prev => ({
                ...prev,
                name: "Name not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                name: ""
            }))
        }
        // email
        if (state.email == "") {
            setErrorMessage(prev => ({
                ...prev,
                email: "Email not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                email: ""
            }))
        }
        // gender
        if (state.gender == "") {
            setErrorMessage(prev => ({
                ...prev,
                gender: "Gender not selected !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                gender: ""
            }))
        }
        // status
        if (state.status == "") {
            setErrorMessage(prev => ({
                ...prev,
                status: "Status not selected !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                status: ""
            }))
        }

        // try {
        //     const res = await urlAPI.put(`${usersAPI}/${id}`,
        //         {
        //             "name": state.name,
        //             "email": state.email,
        //             "gender": state.gender,
        //             "status": state.status
        //         },
        //         // {
        //         //     headers: {
        //         //         // "Content-Type": "multipart/form-data",
        //         //         "Content-Type": "application/json",
        //         //         "Authorization": `Bearer ${tokenAPI}`

        //         //     }
        //         // }
        //     )

        //     if (res.status == 200 || res.status == 201) {
        //         console.log("edit user success!")
        //         console.log(res)
        //         toast.success("User Updated Successfully!");
        //         forceUpdate();
        //     }

        // } catch (error) {
        //     console.log("error update user!");
        //     console.log(error);
        //     if (error.response.data[0].message === "has already been taken") {
        //         toast.error("Email has been registered, please input another email !");
        //     } else {
        //         toast.error("User Failed to Updated!");
        //     }
        // }


        let dataInput = {
            "name": state.name,
            "email": state.email,
            "gender": state.gender,
            "status": state.status
        }

        // dispatch(editUser(idUser, dataInput))
        // dispatch(editUser(state.id, dataInput))
        dispatch(editUser({
            id: state.id,
            dataUser: dataInput
        }))

        if (success) {
            console.log("Updated user success!")
            // toast.success("User Updated Successfully!");
            forceUpdate();
        } else {
            console.log("error update user!");
            // toast.error("User Failed to Updated!");
        }

    }



    return (
        <>
            <Layout>
                <div className={styles.layoutAdd}>
                    <Sidebar />
                    <div className={styles.content}>
                        <section ref={formRef}>
                            <h2>Create Users</h2>
                            <form onSubmit={handleSubmit} className={`${styles["form-wrap"]}`}>
                                <div>{state.id}</div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="name"
                                        value={state.name}
                                        onChange={handleInputChange}
                                        placeholder="ex: David"
                                    />
                                    {
                                        errorMessage?.name &&
                                        <div className="error">{errorMessage.name}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        className="form-input"
                                        type="email"
                                        name="email"
                                        value={state.email}
                                        onChange={handleInputChange}
                                        placeholder="ex: david@gmail.com"
                                    />
                                    {
                                        errorMessage?.email &&
                                        <div className="error">{errorMessage.email}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="radio-group">
                                        <label className="radio">
                                            <input
                                                className="form-input-radio"
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={state.gender === 'male'}
                                                onChange={handleInputChange}
                                            />
                                            Male
                                        </label>
                                        <label className="radio">
                                            <input
                                                className="form-input-radio"
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={state.gender === 'female'}
                                                onChange={handleInputChange}
                                            />
                                            Female
                                        </label>
                                    </div>
                                    {
                                        errorMessage?.gender &&
                                        <div className="error">{errorMessage.gender}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select name="status" value={state.status} onChange={handleInputChange} className="combobox">
                                        <option>-- Choose Status --</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {
                                        errorMessage?.status &&
                                        <div className="error">{errorMessage.status}</div>
                                    }
                                </div>
                                <div className="form-group m-t-40">
                                    <CustomButton
                                        type="submit"
                                        buttonStyle={STYLES.primarySolid}
                                        buttonSize={SIZES.large}
                                        onClick={() => setSubmitStatus('update')}
                                    >
                                        Edit
                                    </CustomButton>
                                    <CustomButton
                                        type="submit"
                                        buttonStyle={STYLES.primarySolid}
                                        buttonSize={SIZES.large}
                                        onClick={() => setSubmitStatus('create')}
                                    >
                                        Create
                                    </CustomButton>
                                    <CustomButton
                                        buttonStyle={STYLES.primarySolid}
                                        buttonSize={SIZES.large}
                                        onClick={() => resetForm()}
                                    >
                                        Reset
                                    </CustomButton>
                                </div>
                            </form>
                        </section>

                        {/* list users */}
                        <section className="m-t-100">
                            <h2>Users List</h2>

                            <div className="tableWrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Id User</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users?.map(({ id, name, email, gender, status }, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{id}</td>
                                                        <td>{name}</td>
                                                        <td>{email}</td>
                                                        <td>{gender}</td>
                                                        <td>{status}</td>
                                                        <td className="colActions">
                                                            <CustomButton
                                                                buttonStyle={STYLES.warningSolid}
                                                                buttonSize={SIZES.small}
                                                                onClick={() => {
                                                                    setIdUser(id);
                                                                    // alert("id : " + id);
                                                                    getUserData(id, name, email, gender, status);
                                                                    scrollToForm();
                                                                }}

                                                            >
                                                                Edit
                                                            </CustomButton>
                                                            <CustomButton
                                                                buttonStyle={STYLES.alertSolid}
                                                                buttonSize={SIZES.small}
                                                                // onClick={() => dispatch(deleteUser(id))}
                                                                onClick={() => handleDeleteUser(id)}
                                                            >
                                                                Delete
                                                            </CustomButton>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* <div>
                                {
                                    listUsers?.map(user => {
                                        return (
                                            <div style={{ borderBottom: "1px solid black", marginBottom: 20, width: 50 + "%" }}>
                                                <div>{user.id}</div>
                                                <div>{user.name}</div>
                                            </div>
                                        )
                                    })

                                }
                            </div> */}
                        </section>
                    </div>
                </div>
            </Layout>


            <ToastContainer />
        </>
    )
}

export default AddUser;