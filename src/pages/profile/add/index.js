import CustomButton, { SIZES, STYLES } from "@/components/CustomButton";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import urlAPI, { postsAPI, tokenAPI } from "@/pages/api/api.config";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../profile.module.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext } from "@/context/GlobalContext";

const Add = () => {
    const formRef = useRef();
    const scrollToForm = () => {
        formRef.current.scrollIntoView();
    }

    const { forceUpdate, valueForce } = useGlobalContext();
    const defaultState = {
        title: "",
        body: "",
        user_id: ""
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

    const getUserData = (title, body, user_id) => {
        let update = {
            "title": title,
            "body": body,
            "user_id": user_id
        }

        setState(update);
    }

    const [submitStatus, setSubmitStatus] = useState('create');
    const [idPost, setIdPost] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(state);
        setTimeout(() => {
            if (submitStatus === "create") {
                createPost();
            } else {
                updatePost(idPost);
            }
        }, 2000);
    };

    // posts list
    const [listPosts, setListPosts] = useState([]);
    const fetchListPosts = async () => {
        try {
            const res = await urlAPI.get(
                `${postsAPI}?page=1&per_page=25`
            );
            const data = await res.data;
            setListPosts(data);
        } catch (error) {
            console.log("error fetch posts!")
        }
    };
    useEffect(() => {
        fetchListPosts();
        // console.log("value : " + valueForce)
    }, [valueForce])


    // POST
    const createPost = async () => {
        // validations
        // title
        if (state.title == "") {
            setErrorMessage(prev => ({
                ...prev,
                title: "Title not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                title: ""
            }))
        }
        // body
        if (state.body == "") {
            setErrorMessage(prev => ({
                ...prev,
                body: "Body not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                body: ""
            }))
        }
        // user_id
        if (state.user_id == "") {
            setErrorMessage(prev => ({
                ...prev,
                user_id: "User ID not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                user_id: ""
            }))
        }

        try {
            const res = await urlAPI.post(`${postsAPI}`,
                {
                    "title": state.title,
                    "body": state.body,
                    "user_id": state.user_id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenAPI}`
                    }
                }
            )

            if (res.status == 200 || res.status == 201) {
                console.log("create post success!")
                console.log(res)
                toast.success("Post Created Successfully!");
                forceUpdate();
            }

        } catch (error) {
            console.log("error create Post!");
            console.log(error);
            toast.error("Post Failed to Create!");
        }

    }

    // PUT
    const updatePost = async (id) => {
        // validations
        // title
        if (state.title == "") {
            setErrorMessage(prev => ({
                ...prev,
                title: "Title not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                title: ""
            }))
        }
        // body
        if (state.body == "") {
            setErrorMessage(prev => ({
                ...prev,
                body: "Body not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                body: ""
            }))
        }
        // user_id
        if (state.user_id == "") {
            setErrorMessage(prev => ({
                ...prev,
                user_id: "User ID not filled !"
            }))
        } else {
            setErrorMessage(prev => ({
                ...prev,
                user_id: ""
            }))
        }

        try {
            const res = await urlAPI.put(`${postsAPI}/${id}`,
                {
                    "title": state.title,
                    "body": state.body,
                    "user_id": state.user_id
                },
                // {
                //     headers: {
                //         "Content-Type": "application/json",
                //         "Authorization": `Bearer ${tokenAPI}`

                //     }
                // }
            )

            if (res.status == 200 || res.status == 201 || res.status == 204) {
                console.log("Update Post Success!");
                console.log(res);
                toast.success("Post Succesfully to Updated!");
                forceUpdate();
            }

        } catch (error) {
            console.log("error update post!");
            console.log(error);
            toast.error("Post Failed to Updated!");
        }

    }

    // DELETE
    const deletePost = async (id) => {
        try {
            const res = await urlAPI.delete(`${postsAPI}/${id}`,
                // {
                //     headers: {
                //         // "Content-Type": "multipart/form-data",
                //         "Content-Type": "application/json",
                //         "Authorization": `Bearer ${tokenAPI}`

                //     }
                // }
            )

            if (res.status == 200 || res.status == 201 || res.status == 204) {
                console.log("delete user success!")
                console.log(res)
                toast.success("Post Deleted!");
                forceUpdate();
            }

        } catch (error) {
            console.log("error delete user!");
            console.log(error);
            toast.error("Failed to Delete Post!");
        }
    }

    return (
        <>
            <Layout>
                <div className={styles.layoutAdd}>
                    <Sidebar />
                    <div className={styles.content}>
                        <section ref={formRef}>
                            <h2>Create Blog Post</h2>
                            <form onSubmit={handleSubmit} className={`${styles["form-wrap"]}`}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="title"
                                        value={state.title}
                                        onChange={handleInputChange}
                                        placeholder="ex: How to ...."
                                    />
                                    {
                                        errorMessage?.title &&
                                        <div className="error">{errorMessage.title}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Article</label>
                                    <textarea
                                        className="form-input-area"
                                        rows={9}
                                        type="text"
                                        name="body"
                                        value={state.body}
                                        onChange={handleInputChange}
                                        placeholder="write your blog content ..."
                                    />
                                    {
                                        errorMessage?.body &&
                                        <div className="error">{errorMessage.body}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>User ID</label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="user_id"
                                        value={state.user_id}
                                        onChange={handleInputChange}
                                        placeholder="ex: 16793"
                                    />
                                    {
                                        errorMessage?.user_id &&
                                        <div className="error">{errorMessage.user_id}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label></label>
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
                            <h2>Posts List</h2>

                            <div className="tableWrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Id Post</th>
                                            <th>Title</th>
                                            <th>Body</th>
                                            <th>User Id</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listPosts?.map((post, index) => {
                                                return (
                                                    <tr key={post.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{post.id}</td>
                                                        <td className="titlePostTable">{post.title}</td>
                                                        <td className="bodyPostTable">{post.body}</td>
                                                        <td>{post.user_id}</td>
                                                        <td className="colActions">
                                                            <CustomButton
                                                                buttonStyle={STYLES.warningSolid}
                                                                buttonSize={SIZES.small}
                                                                onClick={() => {
                                                                    setIdPost(post.id);
                                                                    getUserData(post.title, post.body, post.user_id)
                                                                    scrollToForm();
                                                                }
                                                                }
                                                            >
                                                                Edit
                                                            </CustomButton>
                                                            <CustomButton
                                                                buttonStyle={STYLES.alertSolid}
                                                                buttonSize={SIZES.small}
                                                                onClick={() => deletePost(post.id)}
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
                        </section>
                    </div>
                </div>
            </Layout>

            <ToastContainer />
        </>
    )
}

export default Add;