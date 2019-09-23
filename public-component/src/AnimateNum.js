import React from 'react';
import {
    Animated,
    View,
    Text,
    //requestAnimationFrame
} from 'react-native';
import PropTypes from 'prop-types';

export default class AnimateNum extends React.Component{
    static propTypes = {
        startNum: PropTypes.number,
        endNum: PropTypes.number,
        speed: PropTypes.number,
    };
    
    static defaultProps = {
        startNum: 8888,
        endNum: 10000,
        speed: 20,
    };

    constructor(props){
        super(props)
        this.state = {
            num: this.props.startNum,
            sTime: Date.now(),
        }
    }

    componentDidMount(){
        requestAnimationFrame(this.countNum);
    }

    countNum = ()=>{
        const { startNum, endNum, speed } = this.props;
        const { num, sTime } = this.state;
        const addBool = startNum<endNum?true:false;
        const currentTime = Date.now();
        const step = Math.abs(endNum-startNum)>100?11:1;
        if((addBool && num >= endNum) || (!addBool && num <= endNum)){
            this.setState({
                num: endNum,
                sTime: currentTime
            });
            return;
        }
        if((currentTime-sTime) >= speed){
            this.setState({
                num: addBool?num+step:num-step,
                sTime: currentTime
            });
        }
        requestAnimationFrame(this.countNum);
    }

    render(){
        const { startNum, endNum, speed } = this.props;
        const { num } = this.state;
        
        return(
            <Text>{ num }</Text>
        )
    }
}