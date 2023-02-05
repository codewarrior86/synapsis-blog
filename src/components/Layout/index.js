import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>
            <Header />
            <div className={`${styles.layout}`}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
