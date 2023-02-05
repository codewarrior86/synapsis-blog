import Link from "next/link";
import styles from "./sidebar.module.css";

const Sidebar = () => {
    return (
        <>
            <aside className={styles.sidebar}>
                <div className={styles.containerSidebar}>
                    <ul className="ulV">
                        <li className="liV pd-liV">
                            <Link href="/profile" className="itemListV"><i className="fa-solid fa-timeline" style={{ marginRight: 10 }}></i>Overview</Link>
                        </li>
                        <li className="liV pd-liV">
                            <Link href="/profile/add_user" className="itemListV"><i className="fa-solid fa-users" style={{ marginRight: 10 }}></i>Users</Link>
                        </li>
                        <li className="liV pd-liV">
                            <Link href="/profile/add" className="itemListV"><i className="fa-solid fa-newspaper" style={{ marginRight: 10 }}></i>Posts</Link>
                        </li>
                        <li className="liV pd-liV">
                            <Link href="#4" className="itemListV"><i className="fa-solid fa-comments" style={{ marginRight: 10 }}></i>Comments</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar


