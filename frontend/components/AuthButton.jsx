import { TouchableOpacity, Text} from 'react-native'
import React from 'react'

const AuthButton = ({title, handlesPress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        className={`bg-[#00664F] rounded-xl min-h-[62px] justify-center 
        items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        onPress={handlesPress}
        activeOpacity={0.5}
        disabled={isLoading}
    >
        <Text className={`text-white font-plight text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AuthButton