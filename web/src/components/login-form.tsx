import { FormEvent, useState } from "react";
import { useWebSocket } from "../hooks/use-websocket.ts";

function LoginForm() {
  const [name, setName] = useState<string>("");

  const { sendWebSocketMessage } = useWebSocket();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sendWebSocketMessage({ event: "login", payload: name });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label htmlFor="" className="label">
            Nome
          </label>
          <div className="control">
            <input
              type="text"
              name="name"
              placeholder="Fulano de Tal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
              className="input"
            />
          </div>
        </div>

        <div className="field">
          <input className="button is-success" type="submit" value="Entrar" />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
