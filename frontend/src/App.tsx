import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes";
import { motion } from "framer-motion";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
        className="relative w-full bg-gradient-to-br from-pblue to-ppurple"
      >
        <AppRoutes />
      </motion.div>
    </UserProvider>
  );
}

export default App;
