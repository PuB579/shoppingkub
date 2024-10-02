import React, { useState, useMemo } from 'react';

const productsData = [
  { id: 1, name: 'ANTEC ATOM B650 650W 80 PLUS BRONZE', price: 45000, image: 'ANTEC ATOM B650 650W 80 PLUS BRONZE.jpg' },
  { id: 2, name: 'Falcon-A-BK-V2-computer-case-1', price: 2500, image: 'Falcon-A-BK-V2-computer-case-1.jpg' },
  { id: 3, name: 'FANTECH MPR800 Gaming Mouse Pad', price: 450, image: 'FANTECH MPR800 Gaming Mouse Pad.jpg' },
  { id: 4, name: 'G502X Lightspeed', price: 2500, image: 'G502X Lightspeed.jpg' },
  { id: 5, name: 'gaming chair', price: 10000, image: 'gaming chair.jpg' },
  { id: 6, name: 'Lenovo ThinkVision S22i-30', price: 5500, image: 'Lenovo ThinkVision S22i-30.jpg' },
  { id: 7, name: 'product-3400-angle3-2-all-others', price: 650, image: 'product-3400-angle3-2-all-others.jpg' },
  { id: 8, name: 'RX7900XTX', price: 17900, image: 'RX7900XTX.jpg' },
  { id: 9, name: 'TC-92-600x600', price: 500, image: 'TC-92-600x600.jpg' },
  { id: 10, name: 'Zifriend KA981', price: 2000, image: 'Zifriend KA981.jpg' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleApplyDiscount = (coupon) => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(0.1);
      setDiscountError('');
    } else {
      setDiscountError('Invalid coupon code.');
    }
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalWithShipping = useMemo(() => {
    return total > 0 ? total + 100 - total * discount : 0;
  }, [total, discount]);

  return (
    <div  className="App bg-blue-100 min-h-screen p-8">
      <h1 style={{color:'white', textDecoration: 'underline'}} className="text-4xl font-bold text-center mb-8 text-gray-800 underline">Unity PC</h1>

      {/* Product grid in 4 columns */}
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8">
        {productsData.map((product) => (
          <div key={product.id} className="product-card border p-6 bg-blue-500 hover:shadow-lg transition-shadow flex flex-col items-center rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="mb-2 w-36 h-36 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold text-black">{product.name}</h2>
            <p className="text-lg text-black">Price: {product.price}฿</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-700 text-white px-4 py-2 mt-4 rounded hover:bg-blue-800 transition w-3/4"
              aria-label={`Add ${product.name} to cart`}
            >
              เพิ่มลงในตะกร้า
            </button>
          </div>
        ))}
      </div>

      <h2 style={{color:'white' , textDecoration: 'underline'}} className="text-2xl font-bold text-center mt-12 text-gray-800">ตะกร้าสินค้า</h2>
      <div className="cart p-4 border-t mt-6 bg-white rounded-lg shadow-lg">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-2 my-2 bg-gray-50 rounded">
              <span className="font-medium text-gray-800">{item.name}</span>
              <div className="flex items-center">
                <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-600">Qty:</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border w-12 p-1 text-center"
                />
              </div>
              <span className="text-gray-600">{item.price * item.quantity}฿</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600 transition"
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p style={{color:'white'}} className="text-gray-600">รถเข็นของคุณ</p>
        )}
            <div style={{color: 'white'}} className="mt-4 p-4 bg-gray-100 rounded shadow-md flex justify-between">
        <p>รวม: {total}฿</p>
        <p>ค่าจัดส่ง: ฿</p>
        <p>ส่วนลด: {discount * 79}%</p>
        <p className="font-bold">รวมค่าจัดส่ง: {totalWithShipping}฿</p>
      </div>
      </div>
    </div>
  );
}

export default App;
