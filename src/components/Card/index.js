import styles from "./Card.module.css";

const Card = ({ title, desc, img, alt, ava, namaUser, time, onClick }) => {
    return (
        <div className={styles.postCard}>
            <div className={styles.wrapImgCard} onClick={onClick}>
                <img src={img} alt={alt} className={styles.imgCard}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "../img/gallery.jpg";
                    }}
                />
            </div>
            <div className={styles.cardBody}>
                <div className={styles.title} onClick={onClick}>{title}</div>
                <p className={styles.desc}>{desc}</p>

                <div className={styles.wrapUser}>
                    <img src={ava} className={styles.ava} alt="ava" />
                    <div className={styles.infoUser}>
                        <div className={styles.namaUser}>{namaUser}</div>
                        <div className={styles.time}>{time}</div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Card;


