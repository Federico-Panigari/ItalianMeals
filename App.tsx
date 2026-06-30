import { AppNavigator } from './src/navigation/AppNavigator';
import { FavoriteProvider } from './src/context/FavoriteContext';
import { AuthProvider } from './src/context/AuthContext';
export default function App(){
    
    return (
    <AuthProvider>
        <FavoriteProvider>
            <AppNavigator />
        </FavoriteProvider>
    </AuthProvider>)

}