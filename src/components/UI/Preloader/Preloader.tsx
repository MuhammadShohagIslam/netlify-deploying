import React from "react";
import classes from "./Preloader.module.css";

const Preloader = () => {
    return (
        <>
            <div className={classes.loader}>
                <div className={classes.spinner}></div>
            </div>
        </>
    );
};

export default Preloader;
