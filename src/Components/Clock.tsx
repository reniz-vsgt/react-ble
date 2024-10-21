interface Iprops {
    min: number
    sec: number
}
const Clock = ({ min, sec }: Iprops) => {

    return (
        <div className="timer-wrapper">
            <div>
                <span className="time">{min}</span>
                <span className="unit">min</span>
                <span className="time right">{sec}</span>
                <span className="unit">sec</span>
            </div>
        </div>
    )
}
export default Clock;