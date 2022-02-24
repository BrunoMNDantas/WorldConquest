import PlayersUnitsInfo from "./playersUnitsInfo/PlayersUnitsInfo";
import styles from './Info.module.css'

const Info = (props) => {
    console.log(":Info::")

    return (
        <div className={styles.root}>
            <PlayersUnitsInfo/>
        </div>
    )
}

export default Info;