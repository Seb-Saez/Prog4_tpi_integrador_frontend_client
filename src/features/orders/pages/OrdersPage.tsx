const OrdersPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Pedidos</h1>
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-500 text-lg">No tenés pedidos aún.</p>
        <p className="text-gray-400 text-sm mt-2">Los pedidos que confirmes aparecerán acá.</p>
      </div>
    </div>
  );
};

export default OrdersPage;
