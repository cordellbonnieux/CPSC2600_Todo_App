export default function ClearButton(props) {
    return (
        <div className='filters'>
            <button
                type='button' 
                onClick={() => props.delete()}
                className="btn btn__danger btn__lg"
            >
                Clear All
            </button>
        </div>
    )
}