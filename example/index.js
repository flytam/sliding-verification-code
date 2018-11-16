import React, { useState } from "react";
import ReactDOM from "react-dom";
import SlidingVerification from "../src/index";

const srcArr = [
    "https://avatars0.githubusercontent.com/u/20512530?s=460&v=4",
    "https://avatars2.githubusercontent.com/u/7917954?s=400&v=4"
];

const App = () => {
    const [text, setText] = useState("待验证");
    const [srcIndex, setSrcIndex] = useState(0);
    return (
        <div>
            <SlidingVerification
                src={srcArr[srcIndex % 2]}
                onSlide={number => console.log(number)}
                innerColor="#00BFFF"
                onFinish={isOK => {
                    if (isOK) {
                        setText("验证成功");
                    } else {
                        setText("待验证");
                    }
                }}
            />
            <button onClick={() => setSrcIndex(srcIndex + 1)}>切换图片</button>
            <div style={{ marginTop: "5px" }}>{text}</div>
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById("app"));
