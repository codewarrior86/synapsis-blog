import { useEffect, useState } from "react";
import CustomButton, { SIZES, STYLES } from "../CustomButton";
import styles from "./Layout.module.css";
import Router from "next/router";
import Link from "next/link";


const Header = () => {

    const [iconToggle, setIconToggle] = useState(false);
    const handleToggle = () => {
        setIconToggle(!iconToggle);
    }

    const [valueSearch, setValueSearch] = useState();
    const handleSearch = (e) => {
        setValueSearch(e.target.value)
    }

    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    // window.addEventListener("scroll", changeBackground)

    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
        return () => window.removeEventListener("scroll", changeBackground);
    });

    // useEffect(() => {
    //     console.log(window.scrollY)
    // }, [])

    return (
        <div
        // style={{ position: "relative" }} 
        >
            <nav className={`
                ${styles.navbar} 
                ${iconToggle ? styles.navbar_toggle : ""} 
                ${navbar ? styles.headerActive : ""}
            `}
            >
                <div className={styles.wrapBrand} onClick={() => { Router.push("/") }}>
                    <img src="../icons/blog.png" alt="logo" className={styles.logo} />
                    <div className={styles.brand}>SynapsisBlog</div>
                </div>


                <div className={styles.wrapMenu}>
                    <div className={styles.wrapSearch}>
                        <input type="text" placeholder="Search..." value={valueSearch} onChange={handleSearch} className={styles.search} />
                        <i className={`fa-solid fa-magnifying-glass ${styles.iconSearch}`}></i>
                    </div>
                    <ul className={`${styles.menu} ${iconToggle ? styles.menu__active : ""}`}>
                        <div className={`${styles.menuHeaderMobile}  m-b-30`}>
                            <img src="../img/corp.jpg" className={`${styles.avaHeader} `} />
                            <h4>Anonymous</h4>
                        </div>
                        <li>
                            <Link href="#">
                                <i className={`${styles.iconMenu}  fa-solid fa-user`} style={{ marginRight: 10 }} ></i>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/add">
                                <i className={`${styles.iconMenu}  fa-brands fa-blogger-b`} style={{ marginRight: 10 }} ></i>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <i className={`${styles.iconMenu}  fa-solid fa-address-book`} style={{ marginRight: 10 }} ></i>
                                Contacts
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/add" className={`${styles.itemMenu} ${styles.mobile}`}>
                                <i style={{ marginRight: 10 }} className={`${styles.iconMenu}  fa-solid fa-plus`} ></i>
                                Create Post
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/add_user" className={`${styles.itemMenu} ${styles.mobile}`}>
                                <i style={{ marginRight: 10 }} className={`${styles.iconMenu}  fa-solid fa-plus`} ></i>
                                Create User
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/add" className={`${styles.itemMenu} ${styles.mobile}`}>
                                <i style={{ marginRight: 10 }} className={`${styles.iconMenu}  fa-solid fa-list`}></i>
                                Posts List
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/add_user" className={`${styles.itemMenu} ${styles.mobile}`}>
                                <i style={{ marginRight: 10 }} className={`${styles.iconMenu}  fa-solid fa-list`}></i>
                                Users List
                            </Link>
                        </li>
                        <li>
                            <Link href="#logout" className={`${styles.itemMenu} ${styles.mobile}`}>
                                <i style={{ marginRight: 10 }} className={`${styles.iconMenu}  fa-solid fa-right-from-bracket`}></i>
                                Logout
                            </Link>
                        </li>

                        {/* button Login & Register- mobile */}
                        {/* <li className={styles.wrapButtonsMobile}>
                            <CustomButton
                                buttonStyle={STYLES.primaryOutline}
                                buttonSize={SIZES.small}
                            >
                                Login
                            </CustomButton>
                            <CustomButton
                                buttonStyle={STYLES.primarySolid}
                                buttonSize={SIZES.small}
                            >
                                Register
                            </CustomButton>
                        </li> */}
                    </ul>
                </div>

                {/* <div className={styles.wrapButtons}>
                    <CustomButton
                        buttonStyle={STYLES.primaryOutline}
                        buttonSize={SIZES.large}
                    >
                        Login
                    </CustomButton>
                    <CustomButton
                        buttonStyle={STYLES.primarySolid}
                        buttonSize={SIZES.large}
                    >
                        Register
                    </CustomButton>
                </div> */}

                {/* avatar - hover menu */}
                <div className={styles.wrapAva}>
                    <img src="../img/corp.jpg" className={styles.avaHeader} />
                    <div className={styles.avaMenu}>
                        <ul>
                            <li>
                                <Link href="/profile/add" className={styles.itemMenu}> <i className="fa-solid fa-plus" style={{ marginRight: 10 }}></i>Create Post</Link>
                            </li>
                            <li>
                                <Link href="/profile/add_user" className={styles.itemMenu}> <i className="fa-solid fa-plus" style={{ marginRight: 10 }}></i>Create User</Link>
                            </li>
                            <li>
                                <Link href="/profile/add" className={styles.itemMenu}><i className="fa-solid fa-list" style={{ marginRight: 10 }}></i>Posts List</Link>
                            </li>
                            <li>
                                <Link href="/profile/add_user" className={styles.itemMenu}><i className="fa-solid fa-list" style={{ marginRight: 10 }}></i>Users List</Link>
                            </li>
                            <li>
                                <Link href="#logout" className={styles.itemMenu}><i className="fa-solid fa-right-from-bracket" style={{ marginRight: 3 }}></i> Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* hamburger icon */}
                <div className={`${styles.menuToggle}`} onClick={handleToggle}>
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </nav>

        </div>
    )
}

export default Header;
