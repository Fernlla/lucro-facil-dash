import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, TrendingUp, DollarSign } from 'lucide-react';

interface ProductsProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

const Products: React.FC<ProductsProps> = ({ theme, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const isDark = theme === 'dark';

  const products = [
    { id: 1, name: 'Sorvete Chocolate', cost: 2.50, price: 5.00, stock: 150, category: 'Sorvetes', sales: 245 },
    { id: 2, name: 'Sorvete Morango', cost: 2.30, price: 5.00, stock: 120, category: 'Sorvetes', sales: 198 },
    { id: 3, name: 'Picolé Limão', cost: 1.80, price: 3.50, stock: 200, category: 'Picolés', sales: 312 },
    { id: 4, name: 'Picolé Morango', cost: 1.80, price: 3.50, stock: 180, category: 'Picolés', sales: 267 },
    { id: 5, name: 'Sorvete Baunilha', cost: 2.40, price: 5.00, stock: 90, category: 'Sorvetes', sales: 156 },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              Produtos
            </h1>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Gerencie seu catálogo de produtos
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                isDark 
                  ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              Voltar
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Novo Produto
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Total de Produtos</span>
              <Package size={20} className="text-blue-600" />
            </div>
            <p className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              {products.length}
            </p>
          </div>

          <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Estoque Total</span>
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <p className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              {products.reduce((acc, p) => acc + p.stock, 0)}
            </p>
          </div>

          <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Margem Média</span>
              <DollarSign size={20} className="text-blue-600" />
            </div>
            <p className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              {(products.reduce((acc, p) => acc + ((p.price - p.cost) / p.price * 100), 0) / products.length).toFixed(0)}%
            </p>
          </div>
        </div>

        <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? 'bg-slate-900' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Produto
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Categoria
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Custo
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Preço
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Margem
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Estoque
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Vendas
                  </th>
                  <th className={`px-6 py-4 text-right text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const margin = ((product.price - product.cost) / product.price * 100).toFixed(1);
                  return (
                    <tr key={product.id} className={`border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-100' : 'text-gray-900'} font-medium`}>
                        {product.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {product.category}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        R$ {product.cost.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        R$ {product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          parseFloat(margin) >= 50 ? 'text-green-600' : 
                          parseFloat(margin) >= 30 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {margin}%
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        {product.stock} un
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        {product.sales}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                          }`}>
                            <Edit size={16} className="text-blue-600" />
                          </button>
                          <button className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                          }`}>
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`rounded-2xl p-6 w-full max-w-2xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              Novo Produto
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Nome do produto"
                className={`px-4 py-3 rounded-xl border outline-none ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="text"
                placeholder="Categoria"
                className={`px-4 py-3 rounded-xl border outline-none ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="number"
                placeholder="Custo"
                className={`px-4 py-3 rounded-xl border outline-none ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="number"
                placeholder="Preço de venda"
                className={`px-4 py-3 rounded-xl border outline-none ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="number"
                placeholder="Estoque inicial"
                className={`px-4 py-3 rounded-xl border outline-none ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isDark ? 'bg-slate-700 text-slate-100 hover:bg-slate-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                Cancelar
              </button>
              <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
