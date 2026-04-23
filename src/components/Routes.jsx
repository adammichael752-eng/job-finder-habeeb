import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobFinder from "./JobFinder";
import About from "./About";

function RoutesConfig() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<JobFinder />} />
                <Route path="/job-finder" element={<JobFinder />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default RoutesConfig;
