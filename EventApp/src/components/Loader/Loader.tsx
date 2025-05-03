import React from "react";
import { View, Image } from "react-native";
import loader from "../../assets/loader.json";
import LottieView from "lottie-react-native";

type LoaderProps = {
    loading?: boolean;
};
export default function Loader({ loading }: LoaderProps) {

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    position: "absolute",
                    zIndex: 2,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LottieView
                    source={loader}
                    style={{ width: 200, height: 200 }}
                    autoPlay
                    loop
                />
            </View>
        );
    }
    return null;
}
