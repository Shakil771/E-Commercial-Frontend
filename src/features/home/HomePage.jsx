import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaShieldAlt, FaHeadset, FaArrowRight } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { getProducts, getCategories } from '../products/productSlice.js';
import ProductCard from '../products/components/ProductCard.jsx';
import SearchBar from '../search/components/SearchBar.jsx';
import Spinner from '../../components/common/Spinner.jsx';

const PERKS = [
  { icon: FaTruck, title: 'Free Shipping', desc: 'On orders over $100' },
  { icon: FaShieldAlt, title: 'Secure Payment', desc: '100% protected transactions' },
  { icon: FaHeadset, title: '24/7 Support', desc: "We're here to help anytime" },
];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { list: products, status } = useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ featured: 'true', limit: 8 }));
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <section className="bg-gray-900 text-white">
        <div className="container-page flex flex-col items-center gap-6 py-20 text-center">
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Shop the Latest Trends, Delivered to Your Door
          </h1>
          <p className="max-w-xl text-gray-300">
            Discover quality electronics, fashion, home goods, and more — all in one place.
          </p>
          <SearchBar className="w-full max-w-lg" />
          <Link to="/shop" className="btn-primary bg-white !text-gray-900 hover:!bg-gray-100">
            Shop Now <FaArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 rounded-xl border border-gray-200 p-5">
              <Icon size={28} className="text-primary-600" />
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {categories.length > 0 && (
        <section className="container-page py-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat._id}
                to={`/shop?category=${cat._id}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-6 text-center hover:border-gray-900"
              >
                <img
                  src={cat.image?.url || 'https://via.placeholder.com/80'}
                  alt={cat.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-gray-900">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container-page py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/shop?featured=true" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            View all
          </Link>
        </div>

        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
