import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';
// import Spinner from 'react-native-spinkit';
import Loading from './loading';
ViewToast = null;
dismissHandler = null;

export default class ToastView extends Component {

  static propTypes = {
    toastType: PropTypes.string,
    loadType: PropTypes.string,
    message:PropTypes.string,
    duration: PropTypes.number,
    size: PropTypes.number,
    color: PropTypes.string,
  };

  static defaultProps = {
    toastType: "loading", //loading、info
    //loadType: "Circle", //'CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'
    message: "",
    duration: 2000,
    size: 30,
    color: "#fff"
  };

  opacityAnim = new Animated.Value(0);

  constructor(props) {
    super(props);
    ViewToast = this;
    this.state = {
      toastType: props.toastType,
      loadType: props.loadType,
      size: props.size,
      color: props.color,
      message: props.message,
      duration: props.duration,
    }
  }
  static getDerivedStateFromProps(props, state) {
    dismissHandler && clearTimeout(dismissHandler);
    if (
      props.toastType !== state.toastType ||
      props.message !== state.message
    ) {
      return {
        toastType: props.toastType,
        loadType: props.loadType,
        size: props.size,
        color: props.color,
        message: props.message,
        duration: props.duration,
      };
    }
    return null;
  }

  componentDidMount() {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      },
    ).start(this.timingDismiss);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      props.toastType !== prevProps.toastType ||
      props.message !== prevProps.message
    ) {
      this.timingDismiss();
    }
    
  }

  componentWillUnmount() {
    dismissHandler && clearTimeout(dismissHandler)
  }

  timingDismiss = () => {
    (this.state.toastType == 'info') && (dismissHandler = setTimeout(() => {
      ToastView.dismiss();
    }, this.state.duration));
  };

  static dismiss = () => {
    ViewToast && Animated.timing(
      ViewToast.opacityAnim,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      },
    ).start(ViewToast.onDismiss);
  };

  onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  };

  render() {
    const { toastType, loadType, size, color, message } = this.state;
    return (
      <View style={styles.container} pointerEvents='box-none'>
        <Animated.View style={[styles.textContainer, {opacity: this.opacityAnim, transform: [{ scale: this.opacityAnim }]}]}>
          {toastType == "loading" && <Loading />}
          {!!message && <Text style={styles.defaultText}>{message}</Text>}
        </Animated.View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(255,255,255,.6)',
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    margin:10,
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    elevation: 1,
  },
  defaultText: {
    color: "#000",
    fontSize: 15,
  },
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  }
});
