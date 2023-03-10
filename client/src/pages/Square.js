
const Square = (props) => {
    return (
        <div className="Square" onClick={props.onClick.bind(this, props.index)}>
            <h1>{props.value}</h1>
        </div>
    )
}

export default Square