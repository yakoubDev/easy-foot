import React from "react";
import * as motion from "framer-motion/client";
const Requests = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      Requests
    </motion.div>
  );
};

export default Requests;
