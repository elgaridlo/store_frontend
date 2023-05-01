import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import { ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import { fetchProducts, selectProducts } from '../services/products/productSlice';
import { FunctionalComponentWithFunctionalComponentToPrint } from '../print/ButtonPrint';


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);
  const { data: products } = useSelector(selectProducts)

  useEffect(() => {
    const jwtToken = localStorage.getItem(window.location.origin);
    if (jwtToken === null) {
      navigate('/login')
    } else {
      dispatch(fetchProducts());
    }
  }, [navigate, dispatch])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <FunctionalComponentWithFunctionalComponentToPrint />
          </Stack>
        </Stack>

        {products && (
          <ProductList products={products.map((item, index) => {
            const setIndex = index + 1

            return {
              ...item,
              cover: `/assets/images/products/product_${setIndex}.jpg`,
            }
          })} />
        )}
        <ProductCartWidget />
      </Container>
    </>
  );
}
