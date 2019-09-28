import React from 'react';
import {
    Animated
} from 'react-native';
import Svg, {
    Circle,
    Text,
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
        progress: 10,//值為：0-100
        outProgress: 80,
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
                        outputRange: [2*Math.PI*newRadius, 2*Math.PI*newRadius*newProgress],
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
                    strokeDasharray={2*Math.PI*outFrontNewRadius*0.75}
                    strokeDashoffset={this.state.outStrokeDashOffset.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2*Math.PI*outFrontNewRadius*0.75, 2*Math.PI*outFrontNewRadius*0.75*newFrontProgress],
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
                        outputRange: [2*Math.PI*outFrontNewRadius, 2*Math.PI*outFrontNewRadius*0.75*newFrontProgress],
                    })}
                    strokeLinecap="round"
                    transform={`rotate(${rotate},${radius},${radius})`}
                />

                {!!textShow && <Text x={radius-9} y={radius+5} 
                    font-family="Verdana" 
                    font-size="32"
                >
                    {originalProgress+ "%"}
                </Text>}
            </Svg>
        )
    }
}