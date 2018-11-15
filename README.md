# sliding-verification-code

react 滑动验证码

```bash
npm i react-sliding-verification // 未发布
```

![example](./example.gif)

```javascript
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
```

### props

-   src string 必选

    图片的地址

-   onFinish: (isOK: boolean) => {}

    是否识别成功

-   onSlide: (length: number) =>{}

    还差多少像素重合

-   innerLengthPencent number (0-0.2)

    内部缺块正方形占图片的百分比

-   errorRange number 可选
    误差像素允许范围，默认 10px

### todo

样式弄好看点 && 自定义样式 && 测试

不规则图像生成、速度控制等等...

### 开发预览

```bash
npm run dev // 8000端口
```

### 构建

```bash
npm run build
```
