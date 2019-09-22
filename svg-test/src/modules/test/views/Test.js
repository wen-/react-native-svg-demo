import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
  } from 'react-native';
import { connect } from '../../../tools/dva';
import Actions from '../actions/test';

import {Test as TestComponent} from 'public-component';
import Loading from '../../../components/base/loading';

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
                <TouchableOpacity
                    onPress={()=>{
                        this.change(123);
                    }}
                >
                    <Text>change redux state</Text>
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