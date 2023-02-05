import styles from "./Layout.module.css";

const Footer = () => {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.wrapMenuFooter}>
                    <ul className={styles.menuFooter}>
                        <li><a href="">About</a></li>
                        <li><a href="">Contacts</a></li>
                        <li><a href="">Sport</a></li>
                        <li><a href="">Holiday</a></li>
                        <li><a href="">Photography</a></li>
                        <li><a href="">Editing</a></li>
                        <li><a href="">Graphic Design</a></li>
                        <li><a href="">Programming</a></li>
                    </ul>
                    <div className={styles.socialMediaFooter}>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-square-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                    </div>
                </div>
                <hr style={{ marginBlock: 15 }} />
                <div style={{ textAlign: "center" }}>@ Copyright 2023 Arjun Blog ~ All Right Reserved. </div>
            </footer>
        </>
    )
}

export default Footer;
