import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { baseUrl } from '../../../config';

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getProduct = async () => {
    const jwtToken = localStorage.getItem(window.location.origin);
    const AuthStr = 'Bearer '.concat(jwtToken);
    const response = await axios
        .get(`${baseUrl}/api/v1/menus?size=20&page=1`, { headers: { Authorization: AuthStr } });

    setProducts(response);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem(window.location.origin);

    if (jwtToken === null) {
      navigate('/login');
    }

    setLoading(false);
  }, [products]);

  const contextValue = useMemo(() => {
    return {
      products,
      getProduct
    };
  }, [products]);

  return (
    <ProductContext.Provider value={contextValue}>
      <>
        {loading && <div>Application loading...</div>}
        {loading === false && <>{children}</>}
      </>
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProduct = () => React.useContext(ProductContext);
