import LoginForm from "../components/login-form.tsx";

function LoginScreen() {
  return (
    <>
      <section
        className="hero is-fullheight"
        style={{ backgroundColor: "#225b70" }}
      >
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginScreen;
