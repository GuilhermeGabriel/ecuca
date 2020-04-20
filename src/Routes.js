import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from './pages/Login'
import Simulado from './pages/Simulado'
import Home from './pages/Home'
import Preload from './pages/Preload'

const StackNavigator = createStackNavigator({
    Preload: Preload,
    Login: Login,
    Home: Home,
    Simulado: Simulado
});

const Routes = createAppContainer(StackNavigator);
export default Routes;
