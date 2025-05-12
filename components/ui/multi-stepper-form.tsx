import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

export interface Step {
    container: React.JSX.ElementType
    children: React.ReactNode
}


interface StepperProps {
    steps: Step[]
    totalSteps?: number
    children?: React.ReactNode
    handleSubmitForm: (data: any) => void
}

export const MultiStepperForm = ({ children, steps, totalSteps, handleSubmitForm }: StepperProps) => {
    const [currentStep, setCurrentStep] = useState<number>(1)
    const amountOfSteps = totalSteps || 3

    const handleNext = () => {
        setCurrentStep(prevStep => Math.min(prevStep + 1, amountOfSteps));
    };

    const handlePrevious = () => {
        setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
    };

    const renderStepIndicator = () => {
        const indicators = [];
        for (let i = 1; i <= amountOfSteps; i++) {
            indicators.push(
                <View key={i} className='flex flex-row items-center mb-5'>
                    <View
                    className={`w-9 h-9 rounded-[20px] items-center justify-center ${i <= currentStep ? 'border-[#4EC063] bg-[#4EC063]' : 'bg-gray-300 border-gray-300'}`}
                  >
                        <Text
                            className={`font-bold text-base ${i <= currentStep ? 'text-[#E7E7E7]' : 'text-white'}`}>{i}</Text>
                    </View>
                    {i < amountOfSteps &&
                        <View
                            className={`h-0.5 w-5 mx-2.5 ${i < currentStep ? 'bg-[#4EC063]' : 'bg-gray-300'}`}
                        />}
                </View>
            );
        }
        return <View className="flex flex-row">{indicators}</View>;
    };
    console.log(steps)
    return (
        <View className="items-center">
            {renderStepIndicator()}
            <View className='items-center justify-center mb-5'>
                {
                    steps.map((step: Step, index: number) =>
                        index + 1 === currentStep &&
                        <step.container key={index}>
                            {step.children}
                        </step.container>
                    )
                }
            </View>

            <View className="flex-row mb-5">
                {currentStep > 1 && (
                    <TouchableOpacity
                        className="bg-[#E7E7E7] py-2.5 px-5 rounded-[20px] mr-4"
                        onPress={handlePrevious}>
                        <Text className="text-gray-500 font-bold">Voltar</Text>
                    </TouchableOpacity>
                )}
                {currentStep < amountOfSteps ? (
                    <TouchableOpacity
                        className='bg-[#3629B7] py-2.5 px-5 rounded-[20px]'
                        onPress={handleNext}>
                        <Text className="text-white font-bold">Continuar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleSubmitForm}
                        className='bg-[#3629B7] py-2.5 px-5 rounded-[20px]'>
                        <Text className="text-white font-bold">Finalizar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
