import BaseActions from '../../../tools/baseActions'

export default class Actions extends BaseActions{

  init(){
    this.props.dispatch({ type: 'testData/getOrderDetail', params: { id: 123 } });
  }

  change(n) {
    this.props.dispatch({ type: 'testData/setOrdersDetail', data: { name: n } });
  }

}
