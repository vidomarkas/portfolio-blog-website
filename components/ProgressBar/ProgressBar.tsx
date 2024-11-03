"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./ProgressBar.scss";

const ProgressBar = () => {
	const { scrollYProgress } = useScroll();
	const scaleY = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});
	return <motion.div className="progress-bar" style={{ scaleY }} />;
};

export default ProgressBar;
