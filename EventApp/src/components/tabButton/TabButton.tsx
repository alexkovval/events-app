import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from './TabButtonStyle'

type TabButtonProps = {
    tabLabel?: string
    focused?: boolean
    onPress?: () => void
}

export const TabButton: React.FC<TabButtonProps> = ({ tabLabel, focused, onPress }) => {
    return (
        <Pressable
            style={[
                styles.tabButton,
                { borderColor: focused ? 'blue' : 'lightgray' },
            ]}
            onPress={onPress}
        >
            <Text style={styles.tabText}>
                {tabLabel}
            </Text>
        </Pressable>
    )
}
