import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Login } from "../screens/Login/Login";

const Stack = createNativeStackNavigator<RootStackParamList>();


export const LoginNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                animation: "slide_from_right",
                headerShadowVisible: false,
                headerTitleAlign: "center",
                headerBackVisible: false,
                headerStyle: {
                    backgroundColor: "transparent"
                }
            })}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}