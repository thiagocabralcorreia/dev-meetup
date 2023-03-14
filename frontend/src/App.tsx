import AppRoutes from "./routes";
import "./App.css";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
      className="w-full h-screen bg-gradient-to-br from-pblue to-ppurple"
    >
      <AppRoutes />
    </motion.div>
  );
}

export default App;
