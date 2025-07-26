import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from 'theme';

const { height, width } = Dimensions.get('window')
const Loading = () => {
    return (
        <View className='absolute flex-row justify-center items-center' style={{ width, height }}>
            <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
        </View>
    )
}

export default Loading  