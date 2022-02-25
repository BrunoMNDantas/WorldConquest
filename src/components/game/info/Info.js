import RegionsInfo from "./regionsInfo/RegionsInfo";
import AttacksInfo from "./attacksInfo/AttacksInfo";
import styles from './Info.module.css'
import RegionDetail from "./regionDetail/RegionDetail";

const Info = () => {
    console.log(":Info::")

    return (
        <div className={styles.root}>
            <div className={styles.regionsInfo}>
                <RegionsInfo/>
            </div>
            <div className={styles.attacksInfo}>
                <AttacksInfo/>
            </div>
            <div className={styles.regionDetail}>
                <RegionDetail/>
            </div>
        </div>
    )
}

export default Info;