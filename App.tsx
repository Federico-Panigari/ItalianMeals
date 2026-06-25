import { AppNavigator } from './src/navigation/AppNavigator';
import { FavoriteProvider } from './src/context/FavoriteContext';
export default function App(){
    
    return (
    <FavoriteProvider>
        <AppNavigator />
    </FavoriteProvider>)

}