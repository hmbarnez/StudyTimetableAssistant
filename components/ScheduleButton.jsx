import { TouchableOpacity, Text, View, Image} from 'react-native'
import React from 'react'
import { icons } from '../constants'

const ScheduleButton = ({title, handlesPress, containerStyles, textStyles, isLoading, isActive}) => {
  return (
    <View className="items-center justify-center pb-5">
      <TouchableOpacity 
          className={` rounded-xl min-h-[70px] min-w-[70px] justify-center 
          items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} ${(isActive) ? 'bg-[#4DC591]' : 'bg-[#F2F2F7]'}`}
          onPress={handlesPress}
          activeOpacity={0.5} 
      >
          <Image 
            source={(title === 'Months') ? icons.monthview : icons.dayview}
            className="w-12 h-12"
            resizeMode='contain'
            tintColor={"#00664F"}
          />
      </TouchableOpacity>
      <Text className={`text-black font-plight text-lg pt-2 text-center${textStyles}`}>{title}</Text>
    </View>
  )
}

export default ScheduleButton