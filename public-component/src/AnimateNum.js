import React from 'react';
import {
    Animated,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class AnimateNum extends React.Component{
    static propTypes = {
        startNum: PropTypes.number,
        endNum: PropTypes.number,
        speed: PropTypes.number,
        format: PropTypes.func,
    };
    
    static defaultProps = {
        startNum: 0,
        endNum: 100,
        speed: 20,
        format: (n)=>{return n}
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
        const nLength = Math.abs(endNum-startNum).toString().length;
        //step: 1-99=>1、100-999=>11、1000-9999=>111 ...
        const step = nLength>2?parseInt("1".repeat(nLength-1)):1;
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
        const { format } = this.props;
        const { num } = this.state;
        
        return(
            <Text>{ format(num) }</Text>
        )
    }
}