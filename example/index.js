import React, { useState } from "react";
import ReactDOM from "react-dom";
import SlidingVerification from "../src/index";

const App = () => {
    const [text, setText] = useState("待验证");
    return (
        <div>
            <SlidingVerification
                src="https://avatars0.githubusercontent.com/u/20512530?s=460&v=4"
                onSlide={number => console.log(number)}
                onFinish={isOK => {
                    if (isOK) {
                        setText("验证成功");
                    } else {
                        setText("待验证");
                    }
                }}
            />
            <div style={{ marginTop: "5px" }}>{text}</div>
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById("app"));
