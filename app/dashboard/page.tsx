import React from "react";
import * as motion from "framer-motion/client";
const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      Dashboard
    </motion.div>
  );
};

export default Dashboard;
