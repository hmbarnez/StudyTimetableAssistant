import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons } from '../constants'

const AuthFormField = ({title, value, placeholder, handleChangeText, otherStyles, editable = true, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {/* <Text className="text-base text-gray-100 font-pmedium">{title}</Text> */}

      <View className="w-full h-16 px-4 bg-[#F5F9FE] rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput 
          className="flex-1 text-[#7C8BA0] font-plight text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7C8BA0"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          editable={editable} // Pass editable prop to TextInput
        />
        
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode='contain'
            />
          </TouchableOpacity>  
        )}
      </View>
    </View>
  )
}

export default AuthFormField