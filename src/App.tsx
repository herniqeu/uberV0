import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingAnimation } from './components/LoadingAnimation';
import type { Message } from './types';
import { ShoppingCart, Store, Search, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { ContainerScroll } from './components/ui/container-scroll-animation';

const EXAMPLE_LIST = {
  title: "Lista de Festa de Aniversário",
  items: [
    "15 Refrigerantes 2L (Coca-Cola)",
    "5 Pacotes de Salgadinhos",
    "3 Pacotes de Guardanapos",
    "2 Pacotes de Pratos Descartáveis",
    "4 Pacotes de Copos Descartáveis",
    "2 Bolos de Chocolate",
    "3 Pacotes de Balões",
    "4 Garrafas de Suco Natural",
    "2kg de Pão de Queijo",
    "3 Pacotes de Balas",
    "2 Pacotes de Pirulitos",
    "3 Potes de Sorvete",
    "4 Pacotes de Amendoim",
    "2 Pacotes de Chocolate",
    "3 Pacotes de Biscoitos"
  ]
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Olá! Para demonstrar como nossa IA resolve os problemas comuns de compras, vamos usar um exemplo de lista de festa de aniversário. Digite qualquer coisa para ver a análise inteligente desta lista.',
      timestamp: new Date(),
    },
  ]);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [processingOrder, setProcessingOrder] = useState(false);
  
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: EXAMPLE_LIST.items.join("\n"),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Analisei sua lista usando nossa IA avançada e encontrei as melhores opções baseadas no seu histórico de compras e preferências:',
        options: [
          {
            title: 'Solução Completa - St Marche',
            description: 'Todos os 15 itens disponíveis em um único lugar',
            store: 'St Marche',
            delivery: '40-50 min',
            savings: 'Melhor custo-benefício',
            icon: 'savings',
            availability: '100%',
            products: [
              {
                name: 'Refrigerante Coca-Cola 2L (15 unidades)',
                price: 'R$ 134,85',
                brand: 'Coca-Cola',
                available: true
              },
              {
                name: 'Salgadinho Ruffles Original 167g (5 pacotes)',
                price: 'R$ 64,95',
                brand: 'Elma Chips',
                available: true
              },
              {
                name: 'Guardanapos Folha Dupla (3 pacotes)',
                price: 'R$ 17,97',
                brand: 'Kitchen',
                available: true
              },
              {
                name: 'Pratos Descartáveis 21cm (2 pacotes)',
                price: 'R$ 23,98',
                brand: 'Festa Clean',
                available: true
              },
              {
                name: 'Copos Descartáveis 300ml (4 pacotes)',
                price: 'R$ 31,96',
                brand: 'Copobras',
                available: true
              },
              {
                name: 'Bolo de Chocolate Premium (2 unidades)',
                price: 'R$ 159,80',
                brand: 'Confeitaria St Marche',
                available: true
              },
              {
                name: 'Balões Coloridos N°9 (3 pacotes)',
                price: 'R$ 29,97',
                brand: 'São Roque',
                available: true
              },
              {
                name: 'Suco Natural Del Valle 1L (4 garrafas)',
                price: 'R$ 27,96',
                brand: 'Del Valle',
                available: true
              },
              {
                name: 'Pão de Queijo Congelado (2kg)',
                price: 'R$ 59,80',
                brand: 'Forno de Minas',
                available: true
              },
              {
                name: 'Pacote de Balas Sortidas (3 unidades)',
                price: 'R$ 23,97',
                brand: 'Diversos',
                available: true
              },
              {
                name: 'Pirulitos Sortidos (2 pacotes)',
                price: 'R$ 19,98',
                brand: 'Diversos',
                available: true
              },
              {
                name: 'Sorvete Häagen-Dazs 473ml (3 potes)',
                price: 'R$ 179,70',
                brand: 'Häagen-Dazs',
                available: true
              },
              {
                name: 'Amendoim Japonês (4 pacotes)',
                price: 'R$ 39,96',
                brand: 'Santa Helena',
                available: true
              },
              {
                name: 'Chocolate ao Leite (2 pacotes)',
                price: 'R$ 29,98',
                brand: 'Lacta',
                available: true
              },
              {
                name: 'Biscoitos Sortidos (3 pacotes)',
                price: 'R$ 23,97',
                brand: 'Bauducco',
                available: true
              }
            ],
            smartFeatures: [
              'Lista completa em um único pedido',
              'Produtos alternativos disponíveis',
              'Preços otimizados baseados no seu histórico',
              'Entrega garantida no horário da festa'
            ]
          },
          {
            title: 'Opção Premium - Pão de Açúcar',
            description: '12/15 itens disponíveis com alternativas premium',
            store: 'Pão de Açúcar',
            delivery: '30-40 min',
            savings: 'Produtos Premium',
            icon: 'premium',
            availability: '80%',
            products: [
              {
                name: 'Refrigerante Coca-Cola 2L (15 unidades)',
                price: 'R$ 149,85',
                brand: 'Coca-Cola',
                available: true
              },
              {
                name: 'Salgadinho Ruffles Gourmet 167g (5 pacotes)',
                price: 'R$ 74,95',
                brand: 'Elma Chips',
                available: true
              },
              {
                name: 'Guardanapos Premium (3 pacotes)',
                price: 'R$ 29,97',
                brand: 'Kitchen Premium',
                available: true
              },
              {
                name: 'Pratos Descartáveis Biodegradáveis',
                price: 'R$ 39,98',
                brand: 'Green Party',
                available: false,
                alternatives: [
                  { name: 'Pratos de Bambu Premium', price: 'R$ 59,90' },
                  { name: 'Pratos de Papel Especial', price: 'R$ 45,90' }
                ]
              },
              {
                name: 'Copos Descartáveis Biodegradáveis',
                price: 'R$ 47,96',
                brand: 'Green Party',
                available: false,
                alternatives: [
                  { name: 'Copos de PLA Biodegradável', price: 'R$ 69,90' }
                ]
              },
              {
                name: 'Bolo de Chocolate Gourmet (2 unidades)',
                price: 'R$ 199,80',
                brand: 'Confeitaria Premium',
                available: true
              },
              {
                name: 'Balões Metalizados (3 pacotes)',
                price: 'R$ 59,97',
                brand: 'Festcolor Premium',
                available: true
              },
              {
                name: 'Suco Natural Orgânico 1L (4 garrafas)',
                price: 'R$ 47,96',
                brand: 'Do Bem',
                available: true
              },
              {
                name: 'Pão de Queijo Artesanal',
                price: 'R$ 89,80',
                brand: 'Casa do Pão de Queijo',
                available: false,
                alternatives: [
                  { name: 'Mini Pão de Queijo Gourmet', price: 'R$ 99,90' }
                ]
              },
              {
                name: 'Balas Gourmet Importadas (3 pacotes)',
                price: 'R$ 53,97',
                brand: 'Haribo',
                available: true
              },
              {
                name: 'Pirulitos Artesanais (2 pacotes)',
                price: 'R$ 39,98',
                brand: 'Candy Art',
                available: true
              },
              {
                name: 'Sorvete Häagen-Dazs Specials 473ml',
                price: 'R$ 209,70',
                brand: 'Häagen-Dazs',
                available: false,
                alternatives: [
                  { name: "Sorvete Ben & Jerry's", price: 'R$ 189,90' }
                ]
              },
              {
                name: 'Amendoim Premium Torrado (4 pacotes)',
                price: 'R$ 59,96',
                brand: 'Sem Rival Premium',
                available: true
              },
              {
                name: 'Chocolate Belga (2 pacotes)',
                price: 'R$ 79,98',
                brand: 'Godiva',
                available: true
              },
              {
                name: 'Biscoitos Importados (3 pacotes)',
                price: 'R$ 53,97',
                brand: 'Walkers',
                available: true
              }
            ],
            smartFeatures: [
              'Baseado em suas compras anteriores de produtos premium',
              'Alternativas gourmet disponíveis',
              'Embalagem especial para festa',
              'Atendimento prioritário'
            ]
          },
          {
            title: 'Entrega Express - Mercearia Butantã',
            description: '10/15 itens disponíveis com alternativas locais',
            store: 'Mercearia Butantã',
            delivery: '20-30 min',
            savings: 'Entrega Express',
            icon: 'fast',
            availability: '67%',
            products: [
              {
                name: 'Refrigerante 2L',
                price: 'R$ 149,85',
                brand: 'Diversas marcas',
                available: false,
                alternatives: [
                  { name: 'Pepsi 2L', price: 'R$ 8,99' },
                  { name: 'Guaraná Antarctica 2L', price: 'R$ 7,99' }
                ]
              },
              {
                name: 'Salgadinhos Diversos 150g',
                price: 'R$ 64,95',
                brand: 'Diversas marcas',
                available: false,
                alternatives: [
                  { name: 'Doritos 140g', price: 'R$ 12,99' },
                  { name: 'Cheetos 140g', price: 'R$ 9,99' }
                ]
              },
              {
                name: 'Guardanapos',
                price: 'R$ 20,97',
                brand: 'Marca local',
                available: true
              },
              {
                name: 'Pratos Descartáveis',
                price: 'R$ 25,98',
                brand: 'Marca local',
                available: true
              },
              {
                name: 'Copos Descartáveis',
                price: 'R$ 35,96',
                brand: 'Marca local',
                available: true
              },
              {
                name: 'Bolo de Chocolate',
                price: 'R$ 139,80',
                brand: 'Padaria local',
                available: false,
                alternatives: [
                  { name: 'Bolo de Cenoura', price: 'R$ 59,90' },
                  { name: 'Bolo de Fubá', price: 'R$ 49,90' }
                ]
              },
              {
                name: 'Balões',
                price: 'R$ 29,97',
                brand: 'Marca local',
                available: false,
                alternatives: [
                  { name: 'Balões Simples', price: 'R$ 19,90' }
                ]
              },
              {
                name: 'Suco Natural',
                price: 'R$ 39,96',
                brand: 'Suco do dia',
                available: true
              },
              {
                name: 'Pão de Queijo',
                price: 'R$ 49,80',
                brand: 'Padaria local',
                available: true
              },
              {
                name: 'Balas Sortidas',
                price: 'R$ 29,97',
                brand: 'Diversas',
                available: true
              },
              {
                name: 'Pirulitos',
                price: 'R$ 19,98',
                brand: 'Diversas',
                available: false,
                alternatives: [
                  { name: 'Pirulitos Ploc', price: 'R$ 15,90' }
                ]
              },
              {
                name: 'Sorvete',
                price: 'R$ 149,70',
                brand: 'Kibon',
                available: true
              },
              {
                name: 'Amendoim',
                price: 'R$ 39,96',
                brand: 'Marca local',
                available: true
              },
              {
                name: 'Chocolate',
                price: 'R$ 29,98',
                brand: 'Diversas',
                available: false,
                alternatives: [
                  { name: 'Chocolate Garoto', price: 'R$ 24,90' },
                  { name: 'Chocolate Nestlé', price: 'R$ 26,90' }
                ]
              },
              {
                name: 'Biscoitos',
                price: 'R$ 23,97',
                brand: 'Diversas',
                available: true
              }
            ],
            smartFeatures: [
              'Baseado no histórico de compras da região',
              'Alternativas locais populares',
              'Entrega em até 30 minutos',
              'Motoboy exclusivo'
            ]
          }
        ],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 2000);
  };

  const handleOptionSelect = (optionTitle: string) => {
    setSelectedOption(optionTitle);
    setProcessingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      setProcessingOrder(false);
      // Here you would typically handle the order confirmation
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Pedido confirmado! Seu pedido da ${optionTitle} está sendo preparado e será entregue conforme o prazo estimado.`,
        timestamp: new Date()
      }]);
    }, 4000); // Longer delay for order processing
  };

  return (
    <div className={`min-h-screen ${showChat ? 'bg-white' : 'bg-[#222222]'} font-['Uber Move Text']`}>
      {processingOrder && <LoadingAnimation />}
      
      {!showChat ? (
        <div className="relative min-h-screen">
          <div className="pt-8 pb-0 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-semibold text-white">
                <span className="text-4xl md:text-[6rem] font-bold leading-none text-white">
                  Listfy
                </span>
              </h1>
              <p className="mt-2 text-xl text-gray-300 max-w-2xl mx-auto">
                Otimize suas compras com IA. Encontre os melhores produtos, preços e mercados próximos.
              </p>
              <button 
                onClick={() => setShowChat(true)}
                className="mt-2 px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Começar Agora
              </button>
            </div>
          </div>

          <ContainerScroll titleComponent={<div className="h-8" />}>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
                <Search className="w-12 h-12 mb-4 text-green-400" />
                <h3 className="text-xl font-semibold mb-2 text-white">Busca Inteligente</h3>
                <p className="text-gray-300">Encontre exatamente o que procura com nossa IA avançada</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
                <Clock className="w-12 h-12 mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2 text-white">Entrega Rápida</h3>
                <p className="text-gray-300">Receba suas compras em minutos, não horas</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
                <CheckCircle className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2 text-white">Garantia de Qualidade</h3>
                <p className="text-gray-300">Produtos frescos e de alta qualidade garantidos</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
                <Sparkles className="w-12 h-12 mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2 text-white">Recomendações Personalizadas</h3>
                <p className="text-gray-300">Sugestões baseadas em suas preferências</p>
              </div>
            </div>
          </ContainerScroll>
        </div>
      ) : (
        <>
          <header className="bg-black text-white py-4 px-4 sm:px-6 lg:px-8 fixed top-0 w-full z-50">
            <div className="max-w-3xl mx-auto flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <h1 className="text-xl font-semibold">Listfy</h1>
            </div>
          </header>

          <div className="pb-32 pt-16">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onOptionSelect={handleOptionSelect}
                selectedOption={selectedOption}
                onSendMessage={handleSendMessage}
              />
            ))}
          </div>

          <ChatInput onSend={handleSendMessage} disabled={loading || processingOrder} />
        </>
      )}
    </div>
  );
}

export default App;