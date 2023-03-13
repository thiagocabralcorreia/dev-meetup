import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-pblue to-ppurple">
      <Header />
      <Login />
    </div>
  );
}

export default App;
