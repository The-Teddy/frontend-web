import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { AuthContext } from "./modules/auth/AuthContext";
import Routers from "./routers/Routers";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <main className="App">
      <BrowserRouter basename="/">
        <AuthContext>
          <Routers />
        </AuthContext>
        <ToastContainer autoClose={2500} />
      </BrowserRouter>
    </main>
  );
}

export default App;
