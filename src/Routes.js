import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from './pages/Login'
import Simulado from './pages/Simulado'
import Home from './pages/Home'

const StackNavigator = createStackNavigator({
    Home: Home,
    Login: Login,
    Simulado: Simulado
});

const Routes = createAppContainer(StackNavigator);
export default Routes;
