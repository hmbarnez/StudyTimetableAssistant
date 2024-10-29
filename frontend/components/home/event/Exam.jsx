import { Text, View } from 'react-native'

export const Exam = ({ event }) => {
    return (
        <View >
            <View className="w-96 h-28 mt-1 bg-slate-100  ">
                <View className="flex-row p-3 ">
                    <View>
                        <Text className="font-psemibold text-xs">{event.startingTime}</Text>
                        <Text className="font-font-pregular text-xs">{event.endingTime}</Text>
                    </View>
                    <View className=" ml-6 ">
                        <Text className=" text-teal-600 font-psemibold text-base">{event.subject}</Text>
                        <Text className=" font-psemibold mt-2 text-xs">{event.subjectName}</Text>
                        <Text className=" font-pthin mt-2 text-xs">Room {event.room}, building {event.building}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}