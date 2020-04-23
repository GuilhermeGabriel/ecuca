import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from './pages/Login'
import Simulado from './pages/Simulado'
import Home from './pages/Home'
import Preload from './pages/Preload'
import Payments from './pages/Payments'

const StackNavigator = createStackNavigator({
    Preload: Preload,
    Login: Login,
    Home: Home,
    Simulado: Simulado,
    Payments: Payments
});

const Routes = createAppContainer(StackNavigator);
export default Routes;
