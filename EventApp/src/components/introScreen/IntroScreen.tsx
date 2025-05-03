import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import splash from "../../assets/splash.json";

export default ({ onVideoEnd = () => { }, onReady = () => { } }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
            <LottieView
                source={splash}
                style={{ width: '100%', height: '100%' }}
                autoPlay
                loop={false}
                onAnimationFinish={onVideoEnd}
            />
        </View>
    );
};
