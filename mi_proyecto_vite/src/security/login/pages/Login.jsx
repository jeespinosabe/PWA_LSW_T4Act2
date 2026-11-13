import { useForm } from "../../../hooks/useForm";

export default function Login() {

    const { formulario, email, password, onChange } = useForm({
        email: 'Pruebas@test.com',
        password: "InAllPassword",
    });

    return (
        <div id="div-module">
            <div className="m-3 p-4 bg-white rounded align-self-start" style={{ width: 480 }}>
                <h3>Formulario Login</h3>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={({ target }) => onChange(target.value, "email")}
                />
                <input
                    type="password"
                    className="form-control mt-2 mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={({ target }) => onChange(target.value, "password")}
                />

                <code>
                    <pre>
                        {JSON.stringify(formulario, null, 2)}
                    </pre>
                </code>
            </div>
        </div>
    );
}
