import React, { useState } from 'react';
import { MessageSquare, Store, Clock, Sparkles, DollarSign, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  onOptionSelect?: (optionTitle: string) => void;
  selectedOption?: string | null;
  onSendMessage: (content: string) => void;
}

export function ChatMessage({ message, onOptionSelect, selectedOption, onSendMessage }: ChatMessageProps) {
  const isUser = message.type === 'user';
  const [showProducts, setShowProducts] = useState<{ [key: string]: boolean }>({});
  const [showMissingItems, setShowMissingItems] = useState<{ [key: string]: boolean }>({});

  const getIconForOption = (icon: string) => {
    switch (icon) {
      case 'savings':
        return <DollarSign className="w-6 h-6 text-green-600" />;
      case 'fast':
        return <Clock className="w-6 h-6 text-blue-600" />;
      case 'premium':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      default:
        return null;
    }
  };

  const toggleProducts = (optionTitle: string) => {
    setShowProducts(prev => ({
      ...prev,
      [optionTitle]: !prev[optionTitle]
    }));
  };

  const toggleMissingItems = (optionTitle: string) => {
    setShowMissingItems(prev => ({
      ...prev,
      [optionTitle]: !prev[optionTitle]
    }));
  };

  const calculateTotal = (products: any[]) => {
    return products.reduce((total, product) => {
      const price = parseFloat(product.price.replace('R$ ', ''));
      return total + price;
    }, 0);
  };

  return (
    <div className={`py-8 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4">
        <div className="flex-shrink-0">
          {isUser ? (
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="font-medium text-sm text-gray-500">
            {isUser ? 'Você' : 'Uber Grocery Assistant'}
          </div>
          <div className="prose prose-sm max-w-none">
            {message.content}
            {message.options && (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {message.options.map((option, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => onOptionSelect?.(option.title)}
                      className={`w-full text-left p-4 transition-all duration-200 ${
                        selectedOption === option.title
                          ? 'bg-green-50 border-green-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getIconForOption(option.icon)}
                          <div>
                            <h3 className="font-semibold text-lg">{option.title}</h3>
                            <p className="text-gray-600 text-sm">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{option.savings}</div>
                          <div className="text-sm text-gray-500">{option.delivery}</div>
                          {option.products && (
                            <div className="text-lg font-bold text-gray-900 mt-1">
                              R$ {calculateTotal(option.products).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>

                    <div className="border-t border-gray-100">
                      <button
                        onClick={() => toggleProducts(option.title)}
                        className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>Ver produtos disponíveis</span>
                        </div>
                        {showProducts[option.title] ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      {showProducts[option.title] && option.products && (
                        <div className="px-4 py-2 bg-gray-50">
                          <ul className="space-y-2">
                            {option.products.map((product, idx) => (
                              <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-200 last:border-0 py-2">
                                <div>
                                  <span className="text-gray-800">{product.name}</span>
                                  <span className="text-gray-500 text-xs block">{product.brand}</span>
                                  {product.alternatives && (
                                    <div className="mt-1 pl-4 border-l-2 border-gray-200">
                                      <p className="text-xs text-gray-500 mb-1">Alternativas:</p>
                                      {product.alternatives.map((alt, altIdx) => (
                                        <div key={altIdx} className="text-xs text-gray-600 flex justify-between">
                                          <span>{alt.name}</span>
                                          <span className="text-gray-900">{alt.price}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{product.price}</span>
                                  {product.available === false && (
                                    <span className="text-xs text-red-500">Indisponível</span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-semibold text-gray-900">Total</span>
                              <span className="text-lg font-bold text-gray-900">
                                R$ {calculateTotal(option.products).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}