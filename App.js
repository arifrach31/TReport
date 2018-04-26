import {StackNavigator} from 'react-navigation'

import Dashboard from './screens/Dashboard';
import Reports from './screens/Reports';
import Login from './screens/Login';
import Register from './screens/Register';
import ReportDetail from './screens/ReportDetail';
import AddReport from './screens/AddReport'
import Settings from './screens/Settings'
import Organization from './screens/Organization'

const App = StackNavigator({
  Login:{
    screen: Login,
  },
  Register:{
    screen: Register,
  },
  Dashboard:{
    screen: Dashboard,
  },
  Reports:{
    screen: Reports,
  },
  ReportDetail:{
    screen: ReportDetail,
  },
  AddReport: {
    screen: AddReport,
  },
  Settings: {
    screen: Settings,
  },
  Organization: {
    screen: Organization,
  },
}, {
  initialRouteName: 'Register',
  navigationOptions: {
    header: null
  }
})

export default App;
