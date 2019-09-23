import React from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Svg, {
    G,
    Path,
    Rect,
    Circle,
} from 'react-native-svg';
import { connect } from 'tools/dva';
import Actions from '../actions/test';

import {Test as TestComponent, AnimateCircle as AnimateCircleComponent} from 'public-component';
import Loading from 'components/base/loading';

import Toast from 'components/base/toast';
import Dialogs from 'components/base/dialogs';

class Test extends React.Component{
    constructor(props){
        super(props)
        new Actions(this);
    }

    static navigationOptions = {
        title: 'TestPage',
    };

    componentDidMount(){
        this.init();
    }

    render(){

        return(
            <View style={styles.content}>
                <Text style={styles.textColorRed}>TEST2: {this.props.testData.name}</Text>
                <Loading />
                <TestComponent />

                <AnimateCircleComponent progress={80} />

                <TouchableOpacity
                    onPress={()=>{
                        this.change(123);
                    }}
                >
                    <Text>change redux state</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                        Toast.loading({msg: '123'});
                    }}
                >
                    <Text>toast Loading</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                        Toast.info("Toast.info");
                    }}
                >
                    <Text>toast info</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                        Toast.hide();
                    }}
                >
                    <Text>toast hide</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                        Dialogs.alert({
                            msg: '11111111',
                            confirmTxt: 'OK',
                            confirmPress: ()=>{
                                console.log('点了OK');
                            }
                        });
                    }}
                >
                    <Text>dialogs alert show</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                        Dialogs.confirm({
                            msg: '22222222',
                            cancelTxt: 'no',
                            confirmTxt: 'yes',
                            cancelPress: ()=>{
                                console.log('点了no');
                            },
                            confirmPress: ()=>{
                                console.log('点了yes');
                            }
                        });
                    }}
                >
                    <Text>dialogs confirm show</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Test2');
                    }}
                >
                    <Text>to test2</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    textColorRed: {
        color: 'red',
        
    }
})

export default connect(({ testData }) => ({ testData, title: '测试页' }))(Test);