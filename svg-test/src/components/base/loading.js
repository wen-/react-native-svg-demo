import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends Component {

  static propTypes = {
    radius: PropTypes.number,
    size: PropTypes.number,
    color: PropTypes.string,
    OutBG: PropTypes.string,
    InBG: PropTypes.string
  };

  static defaultProps = {
    radius: 20,
    size: 6,
    color: '#555',
    OutBG: '#efefef',
    InBG: '#fff'
  };

  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.rotate();
  }

  rotate(){
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      },
    ).start(()=>this.rotate());
  }

  render() {
    const { radius, color, size, OutBG, InBG } = this.props;
    return (
      <Animated.View style={[
        styles.container, {
          width: radius*2,
          height: radius*2,
          borderRadius: radius,
          backgroundColor: OutBG,
          transform: [
              {rotate: this.spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              })},
            ]
        }]}>
        <View style={[
          styles.outRound,{
            width: radius,
            height: radius,
            borderTopLeftRadius: radius,
            backgroundColor: color,
          }]}
        />
        <View style={[styles.inRound,{
          backgroundColor: '#fff',
          width: radius*2-size,
          height: radius*2-size,
          borderRadius: (radius*2-size)*0.5,
          backgroundColor: InBG
        }]} />
      </Animated.View>
    )
  }

}

const styles = StyleSheet.create({
  
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    alignItems: "center",
    justifyContent: "center",
  },
  inRound: {
    backgroundColor: '#fff'
  },
  inRound1: {
    backgroundColor: '#fff'
  },
  outRound: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    backgroundColor: 'red',
    borderBottomRightRadius: 0,
    borderTopRightRadius:0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 25,
  },
});
