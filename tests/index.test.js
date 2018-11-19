import renderer from "react-test-renderer";
import SlidingVerification from "../src/index";
import React from "react";

test("test", () => {
    const component = renderer.create(
        <SlidingVerification
            src="https://avatars0.githubusercontent.com/u/20512530?s=460&v=4"
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
    );
    let tree = component.toJSON();
    console.log(tree);
});
