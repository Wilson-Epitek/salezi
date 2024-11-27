import React, { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/products?populate=*'); // Inclut les relations, notamment les images
        const data = await response.json();
        setProducts(data.data); // Données récupérées depuis l'API Strapi
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Nos Produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const { id, attributes } = product;
          const { name, description, price, stock, image } = attributes;
          const imageUrl = image?.data?.attributes?.url
            ? `http://localhost:1337${image.data.attributes.url}` // Construire l'URL de l'image
            : 'https://via.placeholder.com/150'; // Image par défaut si aucune image n'est disponible

          return (
            <div
              key={id}
              className="p-4 border rounded shadow hover:shadow-lg transition"
            >
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <p className="text-gray-600 mb-4 text-sm">{description}</p>
              <span className="block text-blue-600 font-bold mb-2">{price} €</span>
              <span
                className={`block text-sm font-semibold mb-4 ${
                  stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stock > 0 ? `En stock : ${stock}` : 'Rupture de stock'}
              </span>
              <button
                className={`w-full px-4 py-2 rounded text-white ${
                  stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={stock <= 0}
              >
                {stock > 0 ? 'Ajouter au panier' : 'Indisponible'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
