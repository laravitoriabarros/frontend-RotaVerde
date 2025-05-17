export interface StyledText {
  text: string;
  style: {
    color?: string;
    fontWeight?: string;
  };
}

export interface TutorialContent {
  title: string;
  image: any;
  content: {
    separacao: {
      pode: string[];
      naoPode: string[];
    };
    limpeza: (string | StyledText)[];
    preparacao: (string | StyledText)[];
  };
}

export const tutorialContent: Record<string, TutorialContent> = {
  plastico: {
    title: 'Plástico',
    image: require('../../../assets/images/plastico.png'),
    content: {
      separacao: {
        pode: [
          'Garrafas PET',
          'Embalagens de produtos de limpeza',
          'Sacos e sacolas',
          'Copos e pratos descartáveis',
          'Brinquedos de plástico',
          'Tampas de garrafa',
          'Embalagens de alimentos'
        ],
        naoPode: [
          'Plásticos metalizados',
          'Embalagens de salgadinhos',
          'Fitas adesivas',
          'Plásticos com resíduos de gordura',
          'Brinquedos',
          'Isopor'
        ]
      },
      limpeza: [
        'Lave com água e sabão (Pode usar a água do enxágue da louça)',
        'Remova rótulos e tampas',
        'Deixe secar completamente',
        'Verifique se não há resíduos'
      ],
      preparacao: [
        'Amasse para ocupar menos espaço',
        'Separe por tipo (PET, PEAD, PVC)',
        'Use sacos transparentes ou caixas ventiladas.',
        'Identifique o tipo de plástico'
      ]
    }
  },
  metal: {
    title: 'Metal',
    image: require('../../../assets/images/metal.png'),
    content: {
      separacao: {
        pode: [
          'Latas de alumínio',
          'Latas de aço',
          'Tampas de metal',
          'Panelas sem cabo',
          'Arames',
          'Pregos e parafusos'
        ],
        naoPode: [
          'Latas de tinta',
          'Latas de verniz',
          'Aerosóis vazios',
          'Clipes',
          'Grampos'
        ]
      },
      limpeza: [
        'Lave com água e sabão',
        'Remova rótulos',
        'Lave com água para tirar restos de alimentos ou bebidas.',
        'Deixe secar completamente',
        'Verifique se não há resíduos',
        'Se for lata de óleo, enxágue bem por dentro.'
      ],
      preparacao: [
        'Separe por tipo de metal',
        'Verifique se está limpo',
        'Remova rótulos e resíduos',
        'Amasse para economizar espaço'
      ]
    }
  },
  vidro: {
    title: 'Vidro',
    image: require('../../../assets/images/vidro.png'),
    content: {
      separacao: {
        pode: [
          'Garrafas',
          'Potes',
          'Frascos',
          'Copos',
          'Vidros de conserva'
        ],
        naoPode: [
          'Espelhos',
          'Vidros temperados',
          'Louças',
          'Cristais',
          'Lâmpadas',
          'Tubos de TV'
        ]
      },
      limpeza: [
        'Enxágue os recipientes para tirar resíduos.',
        'Deixe secar naturalmente.',
        'Cuidado ao manusear se houver trincas.',
      ],
      preparacao: [
        { text: 'NUNCA quebre o vidro!', style: { color: '#E31B1B', fontWeight: 'bold' } },
        'Embrulhe cacos em jornal',
        'Separe por cor (transparente, verde, âmbar)',
        'Não misture com outros materiais',
        'Coloque em uma caixa resistente identificada (“CUIDADO: VIDRO”).'
      ]
    }
  },
  papel: {
    title: 'Papel',
    image: require('../../../assets/images/papel.png'),
    content: {
      separacao: {
        pode: [
          'Jornais',
          'Revistas',
          'Folhas de papel',
          'Caixas de papelão',
          'Sacos de papel',
          'Envelopes'
        ],
        naoPode: [
          'Papel higiênico',
          'Papel carbono',
          'Papel plastificado',
          'Papel parafinado',
          'Fitas adesivas',
          'Papel de presente metalizado'
        ]
      },
      limpeza: [
        'Remova clipes e grampos',
        'Remova fitas adesivas',
        'Dobre para ocupar menos espaço',
        'Mantenha seco'
      ],
      preparacao: [
        'Separe por tipo',
        'Verifique se está limpo',
        'Remova elementos não recicláveis',
        'Dobre para economizar espaço'
      ]
    }
  }
};