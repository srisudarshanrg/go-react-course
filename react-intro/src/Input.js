const Input = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <input
                type={props.type}
                className={props.className}
                id={props.name} // as it should be equal to the label htmlFor property
                autoComplete={props.autoComplete}
                onChange={props.onChange}
                ref={props.ref}
            ></input>
        </div>
    )
}

export default Input