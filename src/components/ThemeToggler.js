export default function ThemeToggler(props) {
    return (
        <label className="switch">
            <input type="checkbox" onChange={() => props.toggler()}></input>
            <span className="slider round"></span>
        </label>
    )
}