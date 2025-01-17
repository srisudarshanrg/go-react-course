import { useState } from "react";
import Input from "./form/Input";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setJwtToken } = useOutletContext(); // setJwtToken destructures the setJwtToken property from the useOutletContext() hook
                                                // curly brackets are put around the setJwtToken constant as
                                                // it is being used to destructure an object, rather than an array
                                                // like in lines 6 and 7
    const { setAlertMessage } = useOutletContext();
    const { setAlertClassName } = useOutletContext();

    const navigate = useNavigate(); // navigates to some page

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("email/pass", email, "/", password);
        
        if (email === "admin@example.com" && password==="adminpassword") {
            setJwtToken("abc");
            setAlertMessage("");
            setAlertClassName("d-none");

            navigate("/") // if someone logs in successfully, navigate to page with address "/", i.e. "home"
        } else {
            setAlertMessage("Invalid credentials");
            setAlertClassName("alert-danger");
        }
    }

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <hr />

            <form onSubmit={handleSubmit}>
                <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />

                <hr />

                <input 
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
        </div>
    )
}

export default Login;