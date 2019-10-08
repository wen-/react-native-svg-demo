import React from 'react';
import {
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
            sNum: props.startNum,
            eNum: props.endNum,
            num: props.startNum,
            sTime: Date.now(),
        }
    }

    static getDerivedStateFromProps(props, state) {
        this.count && cancelAnimationFrame(this.count);
        if (
            props.startNum !== state.sNum ||
            props.endNum !== state.eNum
        ) {
            return {
                sNum: props.startNum,
                eNum: props.endNum,
                num: props.startNum,
                sTime: Date.now()
            };
        }
        return null;
    }

    componentDidMount(){
        this.count = requestAnimationFrame(this.countNum);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.startNum !== prevProps.startNum || this.props.endNum !== prevProps.endNum){
            this.count = requestAnimationFrame(this.countNum);
        }
    }

    componentWillUnmount(){
        this.count && cancelAnimationFrame(this.count);
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
            let n;
            if(addBool){
                const tempNum = num+step;
                n = tempNum>endNum?endNum:tempNum;
            }else{
                const tempNum = num-step;
                n = tempNum<endNum?endNum:tempNum;
            }
            this.setState({
                num: n,
                sTime: currentTime
            });
            if(n == endNum){
                return;
            }
        }
        this.count = requestAnimationFrame(this.countNum);
    }

    render(){
        const { format } = this.props;
        const { num } = this.state;
        
        return(
            <Text>{ format(num) }</Text>
        )
    }
}