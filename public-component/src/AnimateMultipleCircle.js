import React from 'react';
import {
    Animated
} from 'react-native';
import Svg, {
    Circle,
    Text,
    TSpan,
} from 'react-native-svg';
import PropTypes from 'prop-types';
let AniCircle = Animated.createAnimatedComponent(Circle);

export default class AnimateMultipleCircle extends React.Component{
    static propTypes = {
        radius: PropTypes.number,
        size: PropTypes.number,
        fColor: PropTypes.string,
        bColor: PropTypes.string,
        progress: PropTypes.number,
        duration: PropTypes.number,
        delay: PropTypes.number,
        rotate: PropTypes.number,
        textShow: PropTypes.bool,
    };
    
    static defaultProps = {
        radius: 150,
        size: 34,
        outBackSize: 4,
        outFrontSize: 12, 
        fColor: "#00BEA0",
        bColor: "#F5F5F5",
        outBackColor: "#e5e5e5",
        outFrontColor: "#F47E2A",
        progress: 50,//值為：0-100
        outProgress: 50,
        duration: 3000,
        delay: 1000,
        rotate: 135,
        textShow: false
    };

    constructor(props){
        super(props)
        this.state = {
            strokeDashOffset: new Animated.Value(0),
            outStrokeDashOffset: new Animated.Value(0)
        }
    }

    componentDidMount(){
        Animated.timing(
            this.state.strokeDashOffset,
            {
                toValue: 1,
                duration: this.props.duration,
                delay: this.props.delay
            }
        ).start();
        Animated.timing(
            this.state.outStrokeDashOffset,
            {
                toValue: 1,
                duration: this.props.duration,
                delay: this.props.delay
            }
        ).start();
    }

    render(){
        const { 
            radius, 
            size, 
            outBackSize,
            outFrontSize,
            outBackColor,
            outFrontColor,
            outProgress,
            fColor, 
            bColor, 
            progress, 
            rotate, 
            textShow 
        } = this.props;
        const diameter = radius*2;
        const outFrontNewRadius = radius - (outFrontSize*0.5);
        const outBackNewRadius = outFrontNewRadius;
        const newRadius = outBackNewRadius - (size*0.5);
        let originalProgress = progress<=0?0:(progress>100?100:progress);
        let newProgress = (100-originalProgress)/100;
        let originalFrontProgress = outProgress<=0?0:(outProgress>100?100:outProgress);
        let newFrontProgress = (100-originalFrontProgress)/100;
        return(
            <Svg width={300} height={300} {...this.props} viewBox={`0 0 ${diameter} ${diameter}`}>

                <Circle
                    cx="50%"
                    cy="50%"
                    r={newRadius}
                    fill="transparent"
                    stroke={bColor}
                    strokeWidth={size}
                    strokeDasharray={2*Math.PI*newRadius*.75}
                    transform={`rotate(${rotate},${radius},${radius})`}
                />
                <AniCircle
                    cx="50%"
                    cy="50%"
                    r={newRadius}
                    fill="transparent"
                    stroke={fColor}
                    strokeWidth={size}
                    strokeDasharray={2*Math.PI*newRadius}
                    strokeDashoffset={this.state.strokeDashOffset.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2*Math.PI*newRadius, newProgress===0?
                            2*Math.PI*newRadius*0.25:
                            newProgress===1?
                            2*Math.PI*newRadius:
                            2*Math.PI*newRadius*newProgress+(2*Math.PI*newRadius*(1-newProgress)*0.25)
                        ],
                    })}
                    // strokeLinecap="round"
                    transform={`rotate(${rotate},${radius},${radius})`}
                />

                <Circle
                    cx="50%"
                    cy="50%"
                    r={outBackNewRadius}
                    fill="transparent"
                    stroke={outBackColor}
                    strokeWidth={outBackSize}
                    strokeDasharray={2*Math.PI*outBackNewRadius*.75}
                    transform={`rotate(${rotate},${radius},${radius})`}
                />
                
                <AniCircle
                    cx="50%"
                    cy="50%"
                    r={outFrontNewRadius}
                    fill="transparent"
                    stroke={outFrontColor}
                    strokeWidth={outFrontSize}
                    strokeDasharray={2*Math.PI*outFrontNewRadius}
                    strokeDashoffset={this.state.outStrokeDashOffset.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2*Math.PI*outFrontNewRadius, newFrontProgress===0?
                            2*Math.PI*outFrontNewRadius*0.25+outFrontSize*0.5:
                            newFrontProgress===1?
                            2*Math.PI*outFrontNewRadius:
                            2*Math.PI*outFrontNewRadius*newFrontProgress+(2*Math.PI*outFrontNewRadius*(1-newFrontProgress)*0.25)+outFrontSize*0.5
                        ],
                    })}
                    // strokeLinecap="round"
                    transform={`rotate(${rotate},${radius},${radius})`}
                />
                
                <AniCircle
                    cx="50%"
                    cy="50%"
                    r={outFrontNewRadius}
                    fill="transparent"
                    stroke={outFrontColor}
                    strokeWidth={outFrontSize}
                    strokeDasharray={[0,2*Math.PI*outFrontNewRadius]}
                    strokeDashoffset={this.state.outStrokeDashOffset.interpolate({
                        inputRange: [0, 1],
                        outputRange: [newFrontProgress===1?
                            2*Math.PI*outFrontNewRadius-outFrontSize*0.5:
                            2*Math.PI*outFrontNewRadius, newFrontProgress===0?
                            2*Math.PI*outFrontNewRadius*0.25+outFrontSize*0.5:
                            newFrontProgress===1?
                            2*Math.PI*outFrontNewRadius-outFrontSize*0.5:
                            2*Math.PI*outFrontNewRadius*newFrontProgress+(2*Math.PI*outFrontNewRadius*(1-newFrontProgress)*0.25)+outFrontSize*0.5
                        ],
                    })}
                    strokeLinecap={"round"}
                    transform={`rotate(${rotate},${radius},${radius})`}
                />

                <Text x={"50%"} y={90} 
                    fontFamily="Verdana" 
                    fontSize="20"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#333"
                >
                    {"YTD"}
                </Text>
                <Text x={"50%"} y={110} 
                    fontFamily="Verdana" 
                    fontSize="13"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#A7A7A7"
                >
                    {"12/06/2019"}
                </Text>



                <Text x={"30%"} y={160} 
                    fontFamily="Verdana" 
                    fontSize="20"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#333"
                >
                    {"1,200"}
                </Text>
                <Text x={"30%"} y={180} 
                    fontFamily="Verdana" 
                    fontSize="14"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#333"
                >
                    {"FYC"}
                    <TSpan x={"30%"} y="200" fill="#333">(HKD)</TSpan>
                </Text>


                <Text x={"70%"} y={160} 
                    fontFamily="Verdana" 
                    fontSize="20"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#333"
                >
                    {"1,200"}
                </Text>
                <Text x={"70%"} y={180} 
                    fontFamily="Verdana" 
                    fontSize="14"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#333"
                >
                    {"FYC"}
                </Text>


                <Text x={"35%"} y={235} 
                    fontFamily="Verdana" 
                    fontSize="13"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#A7A7A7"
                >
                    {"0 CASE"}
                </Text>
                <Text x={"65%"} y={235} 
                    fontFamily="Verdana" 
                    fontSize="13"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#A7A7A7"
                >
                    {"50 CASE"}
                </Text>


                <Text x={"28%"} y={260} 
                    fontFamily="Verdana" 
                    fontSize="13"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#A7A7A7"
                >
                    {"0 FYC"}
                </Text>
                <Text x={"72%"} y={260} 
                    fontFamily="Verdana" 
                    fontSize="13"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#A7A7A7"
                >
                    {"3M FYC"}
                </Text>


            </Svg>
        )
    }
}