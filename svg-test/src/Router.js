
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import TestPage from './modules/test/views/Test';
import Test2Page from './modules/test/views/Test2';
import Test3Page from './modules/test/views/Test3';

const TransitionBootm = ["Test3"];
const AppNavigator = createStackNavigator(
  {
    Test: TestPage,
    Test2: Test2Page,
    Test3: Test3Page,
  },
  {
    initialRouteName: 'Test',
    headerLayoutPreset: 'center',
    transitionConfig: (transitionProps, prevTransitionProps) => {
      const t = TransitionBootm.some((screenName )=>{
        return (screenName === transitionProps.scene.route.routeName || (prevTransitionProps &&
          screenName === prevTransitionProps.scene.route.routeName))
      });
      return t?StackViewTransitionConfigs.FadeInFromBottomAndroid:StackViewTransitionConfigs.SlideFromRightIOS
    }
  }
);

export default createAppContainer(AppNavigator);