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

export default class AnimateCircle extends React.Component{
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
        radius: 30,
        size: 6,
        fColor: "#F47721",
        bColor: "#EBEBEB",
        progress: 0,//值為：0-100
        duration: 3000,
        delay: 1000,
        rotate: -90,
        textShow: false
    };

    constructor(props){
        super(props)
        this.state = {
            strokeDashOffset: new Animated.Value(0)
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
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.progress !== prevProps.progress){
            this.setState({
                strokeDashOffset: new Animated.Value(0)
            },()=>{
                Animated.timing(
                    this.state.strokeDashOffset,
                    {
                        toValue: 1,
                        duration: this.props.duration,
                        delay: this.props.delay
                    }
                ).start();
            })
        }
    }

    render(){
        const { radius, size, fColor, bColor, progress, rotate, textShow } = this.props;
        const diameter = radius*2;
        const newRadius = radius - size;
        let originalProgress = progress<=0?0:(progress>100?100:progress);
        let newProgress = (100-originalProgress)/100;
        return(
            <Svg width={diameter} height={diameter} {...this.props} viewBox={`0 0 ${diameter} ${diameter}`}>
                <Circle
                    cx="50%"
                    cy="50%"
                    r={newRadius}
                    fill="transparent"
                    stroke={bColor}
                    strokeWidth={size}
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