import { Eye, EyeOff } from "lucide-react-native"
import { TouchableOpacity } from "react-native"

interface ShowHiddenPasswordProps {
    setShowPassword: (data: (currentState: boolean) => boolean) => void
    showPassword: boolean
}


export function ShowHiddenPassword({ setShowPassword, showPassword }: ShowHiddenPasswordProps) {
    return (
        <TouchableOpacity
          onPress={() => {
            setShowPassword(() => !showPassword)
          }}
        >
          {showPassword ? (
            <>
              <EyeOff size={20} color="#999" />
            </>
          ) : (
            <>
              <Eye size={20} color="#999" />
            </>
          )}
        </TouchableOpacity>
    )
}
