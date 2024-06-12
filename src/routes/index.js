import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./tab.routes";
export const Routes = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
