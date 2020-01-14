import React from 'react';
import {
    Animated,
} from 'react-native';
import Svg, {
    Circle,
    Path,
    Text as SvgText,
    G,
} from 'react-native-svg';
import PropTypes from 'prop-types';

const AniCircle = Animated.createAnimatedComponent(Circle);
const AniG = Animated.createAnimatedComponent(G);

export default class PieChart extends React.Component {
    static propTypes = {
        r: PropTypes.number,
        title: PropTypes.string,
        titleSize: PropTypes.number,
        titleColor: PropTypes.string,
        total: PropTypes.string,
        totalSize: PropTypes.number,
        totalColor: PropTypes.string,
        startPosition: PropTypes.number,
        dataList: PropTypes.array,
    };

    static defaultProps = {
        r: 155,
        title: 'Team Total FYC',
        titleSize: 18,
        titleColor: '#333333',
        total: '10,000,000',
        totalSize: 30,
        totalColor: '#F47721',
        startPosition: 2,
        dataList: [
            { angle: 0.6, fill: '#F47721' },
            { angle: 0.2, fill: '#0097A9' },
            { angle: 0.1, fill: '#006269' },
            { angle: 0.06, fill: '#FED141' },
            { angle: 0.04, fill: '#6ECEB2' },
        ],
    };

    constructor(props) {
        super(props);
        this.state = {
            strokeDashOffset: new Animated.Value(0),
            opacity: new Animated.Value(0),
        };
        const { strokeDashOffset, opacity } = this.state;
        this.ani = Animated.sequence([
            Animated.timing(
                strokeDashOffset,
                {
                    toValue: 1,
                    duration: 4000,
                    delay: 500,
                },
            ),
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 1000,
                    delay: 500,
                },
            ),
        ]);
    }

    componentDidMount() {
        this.ani.start();
    }

    renderPieChart(pieData) {
        const elem = [];
        const { r: newR, dataList } = pieData;
        const cx = newR;
        const cy = newR;
        const r = newR * 0.8;
        const r_txt = newR * 0.92;
        let angle = 0;

        // 饼状图的分片
        let starttangle = 0;
        for (let i = 0; i < dataList.length; i++) {
            angle = dataList[i].angle * Math.PI * 2;
            const endangle = starttangle + angle;
            const endangleTxt = starttangle + angle * 0.5;
            // 以12点钟方向为0°,顺时针方向角度递增
            const x1 = cx + r * Math.sin(starttangle);
            const y1 = cy - r * Math.cos(starttangle);
            const x2 = cx + r * Math.sin(endangle);
            const y2 = cy - r * Math.cos(endangle);

            const x2_txt = cx + r_txt * Math.sin(endangleTxt);
            const y2_txt = cy - r_txt * Math.cos(endangleTxt);
            // 角度大于半圆
            let big = 0;
            if (endangle - starttangle > Math.PI) {
                big = 1;
            }

            // 路径信息
            const d = `M ${cx},${cy // 从圆心开始
            } L ${x1},${y1 // 画一条到(x1,y1)的线段
            } A ${r},${r // 再画一条半径为r的弧
            } 0 ${big} 1 ${ // 弧的详细信息
                x2},${y2 // 弧到(x2,y2)结束
            } Z`; // d当前路径到(cx,cy)结束

            elem.push(<Path key={i} d={d} fill={dataList[i].fill} stroke={dataList[i].stroke} strokeWidth={dataList[i].strokeWidth} />);
            // 輔助線
            // elem.push(<Line key={'line'+i} x1={cx} y1={cy} x2={x2_txt} y2={y2_txt} stroke="red" strokeWidth="2" />)
            elem.push(
                <SvgText
                    key={`txt${i}`}
                    x={x2_txt}
                    y={y2_txt + 5}
                    fontFamily="FWDCircularTT-Medium"
                    fontSize="15"
                    textAnchor="middle"
                    fill={dataList[i].fill}
                >
                    {dataList[i].msg ? dataList[i].msg : `${parseInt(dataList[i].angle * 100)}%`}
                </SvgText>,
            );

            // 当前的结束就是下一个的开始
            starttangle = endangle;
        }
        return elem;
    }

    render() {
        const {
            r, total, totalSize, totalColor, title, titleSize, titleColor, dataList, startPosition,
        } = this.props;
        const { opacity, strokeDashOffset } = this.state;
        return (
            <Svg width={r * 2} height={r * 2} {...this.props} viewBox={`0 0 ${r * 2} ${r * 2}`}>
                {this.renderPieChart({ r, dataList })}
                <Circle
                    cx="50%"
                    cy="50%"
                    r={r * 0.6}
                    fill="#ffffff"
                    stroke="#ffffff"
                    strokeWidth={0}
                />

                <AniG opacity={opacity}>
                    <SvgText
                        x={r}
                        y={r}
                        fontFamily="FWDCircularTT-Book"
                        fontSize={totalSize}
                        textAnchor="middle"
                        fill={totalColor}
                    >
                        {total}
                    </SvgText>
                    <SvgText
                        x={r}
                        y={r + 30}
                        fontFamily="FWDCircularTT-Book"
                        fontSize={titleSize}
                        textAnchor="middle"
                        fill={titleColor}
                    >
                        {title}
                    </SvgText>
                </AniG>

                <AniCircle
                    cx="50%"
                    cy="50%"
                    r={r * 0.5}
                    fill="transparent"
                    stroke="#fff"
                    strokeWidth={r}
                    strokeDasharray={2 * Math.PI * r * 0.5}
                    strokeDashoffset={strokeDashOffset.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2 * Math.PI * r * 0, startPosition == 2 ? -2 * Math.PI * r * 0.5 : 2 * Math.PI * r * 0.5],
                    })}
                    // strokeLinecap="round"
                    transform={`rotate(-90,${r},${r})`}
                />
            </Svg>
        );
    }
}
