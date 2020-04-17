import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

const StackNavigator = createStackNavigator({
    Home: Home,
    Login: Login,
});

const Routes = createAppContainer(StackNavigator);
export default Routes;
