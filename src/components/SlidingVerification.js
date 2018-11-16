import React from "react";

class SlidingVerification extends React.Component {
    static defaultProps = {
        src: "",
        errorRange: 10,
        innerLengthPencent: 0.2, // 内部缺块正方形的边长百分比  0-0.2
        innerColor: "#000000",
        isErrorChange: true, // 验证错误是否重新生成位置
        onFinish: () => {},
        onSlide: () => {}
    };
    state = {
        width: 0,
        height: 0,
        slideStyle: {},
        src: null
    };

    static getDerivedStateFromProps = (props, state) => {
        if (props.src !== state.src) {
            return {
                src: props.src
            };
        }
        return null;
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.src !== this.state.src) {
            this.generateImg();
        }
    };
    generateImg = () => {
        // 整张图片
        const context = this.canvas.getContext("2d");

        // 缺块原图
        const dirtyContext = this.dirtyCanvas.getContext("2d");

        const { innerLengthPencent, innerColor } = this.props;
        const { src } = this.state;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            this.innerLength = Math.min(innerLengthPencent, 0.2) * img.width;
            // 缺块偏移位置计算
            const innerX =
                this.innerLength +
                (img.width - 3 * this.innerLength) * Math.random();
            this.innerX = innerX;
            const innerY =
                this.innerLength +
                (img.height - 3 * this.innerLength) * Math.random();
            this.setState({
                width: img.width,
                height: img.height,
                slideStyle: {
                    top: `-${img.height - this.innerLength - innerY}px`
                }
            });
            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(
                innerX,
                innerY,
                this.innerLength,
                this.innerLength
            ); //

            dirtyContext.putImageData(imageData, 0, 0);

            const coverCanvas = document.createElement("canvas");
            coverCanvas.width = this.innerLength;
            coverCanvas.height = this.innerLength;

            const coverContext = coverCanvas.getContext("2d");
            coverContext.fillStyle = innerColor;
            coverContext.fillRect(0, 0, this.innerLength, this.innerLength);

            const coverImageData = coverContext.getImageData(
                0,
                0,
                this.innerLength,
                this.innerLength
            );

            context.putImageData(coverImageData, innerX, innerY);
        };
    };
    componentDidMount = () => {
        this.generateImg();
        document.addEventListener("mousemove", e => {
            if (this.isDown) {
                const { onSlide } = this.props;
                const { width } = this.state;
                const currentX = e.pageX;
                this.setState(preState => ({
                    slideStyle: {
                        ...preState.slideStyle,
                        left: `${Math.min(currentX - this.initialX, width)}px`
                    }
                }));
                if (typeof onSlide === "function") {
                    onSlide(
                        Math.abs(
                            this.innerLength +
                                this.innerX -
                                (currentX - this.initialX)
                        )
                    );
                }
            }
        });

        document.addEventListener("mouseup", e => {
            if (this.isDown) {
                const { onFinish, errorRange, isErrorChange } = this.props;
                const currentX = e.pageX;
                // 检测是否到了
                this.isDown = false;
                let isOK = false;
                if (typeof onFinish === "function") {
                    if (
                        Math.abs(
                            this.innerLength +
                                this.innerX -
                                (currentX - this.initialX)
                        ) <= errorRange
                    ) {
                        isOK = true;
                    }
                    onFinish(isOK); // or false
                }
                if (!isOK && isErrorChange) {
                    this.generateImg();
                    this.setState(preState => ({
                        slideStyle: {
                            ...preState.slideStyle,
                            left: `0px`
                        }
                    }));
                }
            }
        });
    };

    isDown = false;
    initialX = 0;

    handleMouseDown = e => {
        this.isDown = true;
        this.initialX = e.pageX;
    };

    render = () => {
        let { canvasClass } = this.props;
        const { width, height, slideStyle } = this.state;

        return (
            <div>
                <canvas
                    ref={node => (this.dirtyCanvas = node)}
                    width={this.innerLength || 0}
                    height={this.innerLength || 0}
                    style={{ position: "relative", ...slideStyle }}
                />
                <canvas
                    className={canvasClass}
                    ref={node => (this.canvas = node)}
                    width={width}
                    height={height}
                />

                <div
                    style={{
                        height: "8px",
                        width,
                        backgroundColor: "red",
                        position: "relative"
                    }}
                >
                    <div
                        ref={node => (this.slider = node)}
                        style={{
                            width: "20px",
                            backgroundColor: "gray",
                            borderRadius: "50%",
                            height: "20px",
                            position: "absolute",
                            ...slideStyle,
                            top: "0px"
                        }}
                        onMouseDown={this.handleMouseDown}
                    />
                </div>
            </div>
        );
    };
}

export default SlidingVerification;
