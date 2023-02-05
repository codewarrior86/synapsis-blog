import CustomButton, { SIZES, STYLES } from "@/components/CustomButton";
import Layout from "@/components/Layout";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { commentsAPI, postsAPI, usersAPI } from "../api/api.config";
import styles from "./detail.module.css";

const DetailPost = () => {
    const router = useRouter()
    const { idPost } = router.query

    const [detailPost, setDetailPost] = useState();
    const [detailUser, setDetailUser] = useState();
    const [idUser, setIdUser] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchDetailPost();
        fetchDetailUser();
        fetchComments();
    }, [idPost, idUser])

    const fetchDetailPost = async () => {
        try {
            const res = await axios.get(
                `${postsAPI}?id=${idPost}`
            );
            const data = await res.data;
            setDetailPost(data[0]);
            setIdUser(data[0]?.user_id)
        } catch (error) {
            console.log("error fetch post!")
        }
    };

    const fetchDetailUser = async () => {
        try {
            const res = await axios.get(
                `${usersAPI}?id=${idUser}`
            );
            const data = await res.data;
            setDetailUser(data[0])
        } catch (error) {
            console.log("error fetch user!")
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(
                `${commentsAPI}?post_id=${idPost}`
            );
            const data = await res.data;
            setComments(data)
        } catch (error) {
            console.log("error fetch comments!")
        }
    };

    return (
        <>
            <Layout>
                {/* <div>ID Post : {idPost}</div>
                <div>ID User : {idUser}</div> */}
                {/* <div>{detailPost?.title}</div> */}
                {/* <div>Detail User : {detailUser?.name}</div> */}
                {/* <div>Detail Post : {detailPost?.title}</div> */}

                <div className={`${styles.wrapPage}`}>
                    <section className={styles.wrapDetail}>
                        <img src="../img/corp.jpg" className={styles.imgDetail} />
                        <div>
                            <h2>{detailPost?.title || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ipsam."}</h2>

                            <div className={styles.userInfo}>
                                <img src="../img/corp.jpg" className={styles.ava} />
                                <div className={styles.namaUser}>{detailUser?.name || "Anonymous"}</div>
                                <div className={styles.date}>3 Februari 2023</div>
                            </div>

                            <CustomButton
                                buttonStyle={STYLES.primaryOutline}
                                buttonSize={SIZES.medium}
                                onClick={() => { Router.push("#") }}
                                customStyle={styles.btnShare}
                            >
                                <i className="fa-solid fa-share-nodes" style={{ marginRight: 5 }}></i>
                                Bagikan
                            </CustomButton>
                        </div>


                    </section>

                    <section className={styles.wrapPost}>
                        {
                            detailPost?.body ?
                                <>
                                    <p className={styles.post}>{detailPost?.body}</p>
                                    {/* <p className={styles.post}>{detailPost?.body}</p>
                                    <p className={styles.post}>{detailPost?.body}</p>
                                    <p className={styles.post}>{detailPost?.body}</p> */}
                                </>
                                :
                                <div>
                                    <p className={styles.post}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas repellendus tenetur est enim, at ad ratione porro mollitia molestias magnam corrupti. Recusandae soluta doloribus voluptatibus autem maxime minima iste dolorum laborum odio quos? Consequatur voluptas tempora, ut quam quisquam incidunt in corporis fugiat et a sunt voluptatum delectus suscipit, ipsam perferendis, odio nemo repellendus necessitatibus aspernatur ipsa sit! Necessitatibus repellendus debitis tempore eaque laborum? Assumenda voluptate esse et repudiandae. Inventore, sed sit modi expedita cumque quisquam in vitae veniam deleniti, nulla natus corporis provident dolorum! Perspiciatis hic cum repudiandae saepe ullam rem ipsam veritatis quod minima eos a assumenda ut officiis obcaecati, nemo earum nisi voluptatem commodi quidem non! Officia doloribus sit, cupiditate optio dicta sequi incidunt voluptates eos recusandae pariatur minima perspiciatis sed eum ab quis natus voluptate possimus atque perferendis vel. Corrupti, magnam neque a temporibus adipisci accusantium maxime, magni dolorum iure, esse eos voluptatum? Labore animi optio dolore, sunt, dicta quam nulla asperiores fuga, nisi cumque libero doloremque laudantium. Cumque pariatur officia quod odit ab ipsa, sint mollitia sequi ea? Natus facere quidem pariatur, adipisci iusto quis perferendis minima voluptates eaque beatae nesciunt cupiditate aliquid velit ad esse. Velit, iure impedit, eius quibusdam, possimus fuga voluptatem praesentium esse vitae porro nisi architecto nam at culpa. Numquam sed, explicabo totam quae rem doloremque, ipsum distinctio velit eum sapiente voluptatibus provident, est rerum harum voluptate officia sit! Quas atque, sint corporis impedit provident aperiam eveniet dignissimos earum sed reprehenderit tempore odio illum harum accusantium libero sit veniam perferendis nam velit molestias mollitia. Hic maiores dolor autem aliquid maxime in natus odio quidem iusto sunt enim, eos eligendi deleniti repellat eum nostrum ab aut delectus aliquam quis temporibus numquam. Voluptatem id, voluptate fuga aut ex nisi suscipit, dolorem distinctio pariatur itaque odio nam corrupti saepe cum placeat numquam rem error dignissimos neque eius exercitationem accusantium animi! Sit sint odio sequi hic molestias pariatur tempora fugiat nesciunt sed minus expedita consequatur nostrum necessitatibus, blanditiis assumenda voluptatibus obcaecati doloremque totam cumque saepe deleniti. Vel numquam, iste vero harum in incidunt iure ex et, laboriosam, natus quidem? Veritatis, deleniti iste. Quibusdam repellendus magni in dolorem labore nulla iusto quidem, doloribus voluptas debitis. Ea sequi adipisci quia quos optio nostrum sit, dolorum ratione nam vitae, quod amet possimus ipsam illum. Blanditiis, unde. Obcaecati recusandae distinctio beatae asperiores ab facilis ad dolorum provident doloremque vitae. Vitae sint tenetur quam voluptatum molestias quas doloremque, quia laborum possimus aperiam odio excepturi perferendis assumenda? Aliquid minima ullam reiciendis veniam aliquam accusantium a nesciunt molestiae delectus. Dolor ullam dicta est reiciendis voluptates, porro eligendi quas, eius distinctio voluptatibus vitae, incidunt modi. Fugit reiciendis eos est doloribus totam maiores debitis voluptas facilis ad harum quod soluta qui dolor autem corrupti rem, temporibus veritatis eligendi saepe ab numquam illo natus rerum nihil. Ipsa cum quam at ut sed culpa magnam tempore excepturi nam asperiores veniam rerum sunt impedit, illum quibusdam ipsam ex aperiam laborum corrupti magni cupiditate, labore distinctio. Doloribus voluptas culpa provident alias molestiae in sapiente inventore velit libero aliquam.</p>
                                </div>
                        }


                    </section>

                    <section className={styles.wrapComments}>
                        <h3>Comments</h3>

                        <div className={styles.giveComment}>
                            <img src="../img/corp.jpg" className={styles.avaComment} />
                            <input type="text" placeholder="Your Comments..." />
                            <CustomButton
                                buttonStyle={STYLES.primarySolid}
                                buttonSize={SIZES.large}
                                onClick={() => { }}
                            >
                                Send
                            </CustomButton>
                        </div>

                        {/* comments */}
                        {
                            comments?.length > 0 ?
                                comments?.map(comment => {
                                    return (
                                        <div className={styles.commentItem}>
                                            <div className={styles.comment}>
                                                <img src="../img/corp.jpg" className={styles.avaComment} />
                                                <div className={styles.infoComment}>
                                                    <h4>{comment.name || "No Name"}</h4>
                                                    <div>
                                                        <i className="fa-solid fa-clock" style={{ fontSize: 0.9 + "rem", marginRight: 5 }}></i>
                                                        <span className={styles.timeComment}>11 days ago</span>
                                                    </div>
                                                    <div>{comment.body}</div>
                                                </div>
                                                <div className={styles.emailComments}>{comment.email}</div>
                                            </div>
                                            <div className={styles.actionsComment}>
                                                <div className={styles.thumbs}>
                                                    <i className="fa-solid fa-thumbs-up"></i>
                                                    <span>0</span>
                                                </div>
                                                <div className={styles.thumbs}>
                                                    <i className="fa-solid fa-thumbs-down"></i>
                                                    <span>0</span>
                                                </div>
                                                <div className={styles.cta}>Reply</div>
                                                <div className={styles.cta}>Share {">"}</div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className={styles.commentItem}>
                                    <div className={styles.comment}>
                                        <img src="../img/corp.jpg" className={styles.avaComment} />
                                        <div className={styles.infoComment}>
                                            <h4>Anonymous</h4>
                                            <div>
                                                <i className="fa-solid fa-clock" style={{ fontSize: 0.9 + "rem", marginRight: 5 }}></i>
                                                <span className={styles.timeComment}>11 days ago</span>
                                            </div>
                                            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus adipisci ea iusto eius quae? Enim ad neque consequuntur ullam facere obcaecati minus vel velit deserunt?</div>
                                        </div>
                                        <div className={styles.emailComments}>noname@vkadi.com</div>
                                    </div>
                                    <div className={styles.actionsComment}>
                                        <div className={styles.thumbs}>
                                            <i className="fa-solid fa-thumbs-up"></i>
                                            <span>0</span>
                                        </div>
                                        <div className={styles.thumbs}>
                                            <i className="fa-solid fa-thumbs-down"></i>
                                            <span>0</span>
                                        </div>
                                        <div className={styles.cta}>Reply</div>
                                        <div className={styles.cta}>Share {">"}</div>
                                    </div>
                                </div>
                        }
                    </section>


                </div>
            </Layout>
        </>
    )
}


export default DetailPost;


// export async function getStaticPaths(){

// }



