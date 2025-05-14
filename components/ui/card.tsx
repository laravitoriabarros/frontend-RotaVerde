import { Text, View } from "react-native"

interface CardProps {
    minorDescription?: string
    title?: string
    subtitle?: string
    description?: string
    children?: React.ReactNode
}

export const Card = ({ minorDescription, title, subtitle, description, children }: CardProps) => {
    return (
    <View>
        <Text className="text-sm text-muted-foreground">{minorDescription}</Text>
        <Text className="font-bold text-[#2F2F2F] text-3xl">{title}</Text>
        <Text className="mt-1.5 text-[#888888]">
            {description}
        </Text>
        {children}
    </View>
    )
}
