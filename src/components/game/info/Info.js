import RegionsInfo from "./regionsInfo/RegionsInfo";
import MovesInfo from "./movesInfo/MovesInfo";
import styles from './Info.module.css'
import RegionDetail from "./regionDetail/RegionDetail";

const Info = () => {
    console.log(":Info::")

    return (
        <div className={styles.root}>
            <div className={styles.regionsInfo}>
                <RegionsInfo/>
            </div>
            <div className={styles.movesInfo}>
                <MovesInfo/>
            </div>
            <div className={styles.regionDetail}>
                <RegionDetail/>
            </div>
        </div>
    )
}

export default Info;