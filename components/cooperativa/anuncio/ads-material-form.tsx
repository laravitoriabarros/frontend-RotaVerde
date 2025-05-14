import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { ArrowUpRightFromSquare, FileText,  Leaf, Milk, Package, PillBottle, Refrigerator, Shirt, Smartphone, Wine } from 'lucide-react-native';


interface MaterialSelectionFormProps {

}

export const MaterialSelectionForm = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<any>({});
  const [otherMaterials, setOtherMaterials] = useState('');

      const materials = [
    { id: 'pet', name: 'PET', icon: PillBottle },
    { id: 'papelao', name: 'Papelão', icon: Package },
    { id: 'vidro', name: 'Vidro', icon: Wine },
    { id: 'papel', name: 'Papel', icon: FileText },
    { id: 'latas', name: 'Latas', icon: Refrigerator },
    { id: 'eletronicos', name: 'Eletrônicos', icon: Smartphone },
    { id: 'podas', name: 'Podas', icon: Leaf },
    { id: 'roupas', name: 'Roupas', icon: Shirt },
    { id: 'caixas-de-leite', name: 'Caixas-de-leite', icon: Milk },
    { id: 'outros', name: 'Outros', icon: ArrowUpRightFromSquare },
  ];

    const toggleMaterial = (id: string) => {
    setSelectedMaterials((prev: any) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <SafeAreaView className="bg-white p-4">
      <View>
        <Text className="text-xl font-medium mb-5 text-center">
          Selecione os materiais que você quer comprar:
        </Text>

        <View className="h-px bg-green-200 mb-5" />

        <View className="flex-row flex-wrap justify-between">
          {materials.map((material) => (
            <TouchableOpacity
              key={material.id}
              className={`w-[30%] items-center mb-5 ${selectedMaterials[material.id] ? 'opacity-80' : 'opacity-100'}`}
              onPress={() => toggleMaterial(material.id)}
            >
              <View className="w-14 h-14 rounded-full bg-green-500 justify-center items-center mb-2">
                <material.icon
                  width={24}
                  height={24}
                  color='white'
                />
              </View>
              <Text className="text-center text-green-500">
                {material.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedMaterials.outros && (
          <View className="mt-3 mb-5">
            <Text className="text-lg font-bold mb-2">
              Se marcou "Outros", especifique abaixo
            </Text>
            <TextInput
              className="border border-gray-200 rounded-lg p-3 text-base"
              placeholder="Digite os tipos de materiais para coleta"
              value={otherMaterials}
              onChangeText={setOtherMaterials}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
