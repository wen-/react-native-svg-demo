import React from 'react';
import {
    Animated,
    DeviceEventEmitter,
} from 'react-native';
import Svg, {
    Circle,
    Path,
    Text as SvgText,
    TextPath,
    G,
    Image,
} from 'react-native-svg';
import PropTypes from 'prop-types';

const AniCircle = Animated.createAnimatedComponent(Circle);
const AniG = Animated.createAnimatedComponent(G);

export default class PieChartRank extends React.Component {
    static propTypes = {
        d: PropTypes.number,
        type: PropTypes.string,
        site: PropTypes.string,
        title: PropTypes.string,
        titleSize: PropTypes.number,
        titleColor: PropTypes.string,
        total: PropTypes.string,
        totalSize: PropTypes.number,
        totalColor: PropTypes.string,
        startPosition: PropTypes.number,
        eventName: PropTypes.string,
        icon: PropTypes.number,
        data: PropTypes.array,
        dataList: PropTypes.array,
    };

    static defaultProps = {
        d: 310,
        type: 'YTD',
        site: 'in Hong Kong',
        title: '10,000 Agents',
        titleSize: 16,
        titleColor: '#333333',
        total: '10,000',
        totalSize: 30,
        totalColor: '#F47721',
        startPosition: 1,
        eventName: 'showPieChat',
        icon: require('../assets/images/team/flag-hk.png'),
        data: [
            {
                angle: 0.1875, fill: '#0097A9', title: 'Average', position: '12.5%',
            },
            {
                angle: 0.1875, fill: '#6ECEB2', title: 'TOP75%', position: '37.5%',
            },
            {
                angle: 0.1875, fill: '#F47721', title: 'TOP50%', position: '62.5%',
            },
            {
                angle: 0.1875, fill: '#FED141', title: 'TOP25%', position: '87.5%',
            },
        ],
        dataList: [
            { progress: 0.1, name: 'FWD' },
            { progress: 0.3, name: 'FWD' },
            { progress: 0.45, name: 'FWD' },
            { progress: 0.74, name: 'FWD' },
            { progress: 0.9, name: 'FWD' },
        ],
    };

    constructor(props) {
        super(props);
        this.state = {
            strokeDashOffset: new Animated.Value(0),
            opacity: new Animated.Value(0),
        };
        const { strokeDashOffset, opacity } = this.state;
        this.ani = [
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
        ];
    }

    componentDidMount() {
        const { eventName } = this.props;
        this.showPieChat = DeviceEventEmitter.addListener(eventName, () => {
            Animated.sequence(this.ani).start();
        });
    }

    componentWillUnmount() {
        this.showPieChat.remove();
    }

    renderPieChart(pieData) {
        const elem = [];
        const { r: initR, d, data } = pieData;
        const cx = d * 0.5;
        const cy = d * 0.5;
        const r = initR || (d * 0.5 - 15);
        let angle = 0;

        // 饼状图的分片
        let starttangle = pieData.sTangle || 0;
        for (let i = 0; i < data.length; i++) {
            angle = data[i].angle * Math.PI * 2;
            const endangle = starttangle + angle;
            // 以12点钟方向为0°,顺时针方向角度递增
            const x1 = cx + r * Math.sin(starttangle);
            const y1 = cy - r * Math.cos(starttangle);
            const x2 = cx + r * Math.sin(endangle);
            const y2 = cy - r * Math.cos(endangle);
            // 角度大于半圆
            let big = 0;
            if (endangle - starttangle > Math.PI) {
                big = 1;
            }

            // 路径信息
            const dPath = `M ${cx},${cy // 从圆心开始
            } L ${x1},${y1 // 画一条到(x1,y1)的线段
            } A ${r},${r // 再画一条半径为r的弧
            } 0 ${big} 1 ${ // 弧的详细信息
                x2},${y2 // 弧到(x2,y2)结束
            } Z`; // d当前路径到(cx,cy)结束

            elem.push(
                <Path
                    key={i}
                    d={dPath}
                    fill={data[i].fill}
                    stroke={data[i].stroke}
                    strokeWidth={data[i].strokeWidth}
                />,
            );

            // 当前的结束就是下一个的开始
            starttangle = endangle;
        }
        return elem;
    }

    renderTitle(params) {
        const {
            data, d, sTangle, eTangle,
        } = params;
        const r = d * 0.5;
        const elem = [];
        elem.push(
            <Path key="path" id="path" d={`M ${r + (r - 40) * Math.sin(sTangle)} ${r - (r - 40) * Math.cos(sTangle)} A ${r - 40} ${r - 40} 0 1 1 ${r + (r - 40) * Math.sin(eTangle)} ${r - (r - 40) * Math.cos(eTangle)}`} fill="none" strokeWidth="1" />,
        );

        data.forEach((v) => {
            elem.push(
                <SvgText
                    key={v.title}
                    fill="#ffffff"
                    fontFamily="FWDCircularTT-Medium"
                    fontSize="12"
                    textAnchor="middle"
                >
                    <TextPath
                        href="#path"
                        textAnchor="middle"
                        startOffset={v.position}
                    >
                        {v.title}

                    </TextPath>
                </SvgText>,
            );
        });
        return elem;
    }

    renderAgent(params) {
        const { d, r, sTangle } = params;
        const { dataList: data } = this.props;
        const l = data.length <= 10;
        const elem = [];
        const sAniEvery = new Animated.Value(0);

        data.forEach((v, i) => {
            let tangle = sTangle;
            // eslint-disable-next-line no-nested-ternary
            v.progress = v.progress < 0 ? 0 : (v.progress > 1 ? 1 : v.progress);
            if (v.progress === 1) {
                tangle = sTangle + 0.75 * Math.PI * 2;
            }
            if (v.progress !== 0 && v.progress !== 1) {
                tangle = sTangle + 0.75 * v.progress * Math.PI * 2;
            }
            const sAni = new Animated.Value(0);
            elem.push(
                <AniG
                    key={i}
                    x={d * 0.5 + r * Math.sin(tangle)}
                    y={d * 0.5 - r * Math.cos(tangle)}
                    opacity={l ? sAni : sAniEvery}

                    // transform={sAni.interpolate({
                    //     inputRange: [0, 1],
                    //     outputRange: ['scale(0)', 'scale(1)'],
                    // })}
                >
                    <Circle
                        cx={d * 0.5 + r * Math.sin(tangle)}
                        cy={d * 0.5 - r * Math.cos(tangle)}
                        r={15}
                        fill="#fff"
                    />
                    <Circle
                        cx={d * 0.5 + r * Math.sin(tangle)}
                        cy={d * 0.5 - r * Math.cos(tangle)}
                        r={14}
                        fill="#006269"
                    />
                    <SvgText
                        x={d * 0.5 + r * Math.sin(tangle)}
                        y={d * 0.5 - r * Math.cos(tangle) + 3}
                        fill="#fff"
                        fontFamily="FWDCircularTT-Book"
                        fontSize="10"
                        textAnchor="middle"
                    >
                        {v.name}

                    </SvgText>
                </AniG>,
            );
            l && this.ani.push(
                Animated.timing(
                    sAni,
                    {
                        toValue: 1,
                        duration: 500,
                        delay: 0,
                    },
                ),
            );
        });
        !l && this.ani.push(
            Animated.timing(
                sAniEvery,
                {
                    toValue: 1,
                    duration: 500,
                    delay: 0,
                },
            ),
        );

        return elem;
    }

    render() {
        const {
            d, title, titleSize, titleColor, data, type, site, icon, startPosition, topText = 'Top',
        } = this.props;
        const { opacity, strokeDashOffset } = this.state;
        const sTangle = 0.625 * Math.PI * 2;
        const eTangle = sTangle + 0.75 * Math.PI * 2;
        return (
            <Svg width={d} height={d} {...this.props} viewBox={`0 0 ${d} ${d}`}>
                {this.renderPieChart({ d, sTangle, data: [{ angle: 0.75, fill: '#D8E0E4' }] })}

                {this.renderPieChart({
                    d, sTangle, data, r: d * 0.5 - 19,
                })}

                {this.renderTitle({
                    d, data, sTangle, eTangle,
                })}

                <Circle
                    cx="50%"
                    cy="50%"
                    r={d * 0.5 - 50}
                    fill="#ffffff"
                    stroke="#ffffff"
                    strokeWidth={0}
                />

                <SvgText
                    x={d * 0.5 - 90}
                    y={d - 45}
                    fill="#A7A7A7"
                    fontFamily="FWDCircularTT-Medium"
                    fontSize="13"
                    textAnchor="start"
                >
                    {`0 ${type}`}
                </SvgText>

                <SvgText
                    x={d * 0.5 + 90}
                    y={d - 45}
                    fill="#A7A7A7"
                    fontFamily="FWDCircularTT-Medium"
                    fontSize="13"
                    textAnchor="end"
                >
                    {`${topText} ${type}`}
                </SvgText>

                {this.renderAgent({ d, sTangle, r: d * 0.5 - 15 })}

                <AniG opacity={opacity}>
                    <Image
                        x={d * 0.5 - 25}
                        y={d * 0.5 - 40}
                        width="50"
                        height="34"
                        opacity="1"
                        href={icon}
                    />
                    <SvgText
                        x={d * 0.5}
                        y={d * 0.5 + 20}
                        fontFamily="FWDCircularTT-Book"
                        fontSize={titleSize}
                        textAnchor="middle"
                        fill={titleColor}
                    >
                        {title}
                    </SvgText>
                    <SvgText
                        x={d * 0.5}
                        y={d * 0.5 + 40}
                        fontFamily="FWDCircularTT-Book"
                        fontSize={titleSize}
                        textAnchor="middle"
                        fill={titleColor}
                    >
                        {site}
                    </SvgText>
                </AniG>

                <AniCircle
                    cx="50%"
                    cy="50%"
                    r={d * 0.5 * 0.5}
                    fill="transparent"
                    stroke="#fff"
                    strokeWidth={d * 0.5}
                    strokeDasharray={2 * Math.PI * (d * 0.5) * 0.5}
                    strokeDashoffset={strokeDashOffset.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                            2 * Math.PI * (d * 0.5) * 0,
                            startPosition == 2
                                ? -2 * Math.PI * (d * 0.5) * 0.5
                                : 2 * Math.PI * (d * 0.5) * 0.5],
                    })}
                    // strokeLinecap="round"
                    transform={`rotate(90,${d * 0.5},${d * 0.5})`}
                />
            </Svg>
        );
    }
}
