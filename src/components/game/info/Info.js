import RegionsInfo from "./regionsInfo/RegionsInfo";
import AttacksInfo from "./attacksInfo/AttacksInfo";
import styles from './Info.module.css'

const Info = () => {
    console.log(":Info::")

    return (
        <div className={styles.root}>
            <div className={styles.panel}>
                <RegionsInfo/>
            </div>
            <div className={styles.panel}>
                <AttacksInfo/>
            </div>
        </div>
    )
}

export default Info;