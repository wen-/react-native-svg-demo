import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
  } from 'react-native';
  import { connect } from '../../../tools/dva';
  import Actions from '../actions/test';

class Test2 extends React.Component{
    constructor(props){
        super(props)
        new Actions(this);
    }

    static navigationOptions = {
        title: 'Test2Page',
    };

    componentDidMount(){

    }

    render(){

        return(
            <View style={styles.content}>
                <Text style={styles.textColorRed}>TEST2</Text>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Test3');
                    }}
                >
                    <Text>to test3</Text>
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

export default connect(({ testData }) => ({ testData, title: '测试页' }))(Test2);