import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  ListItem,
  ListItemText,
  List,
  MenuItem,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { addQuantity, minusQuantity, removeFromCart } from '../../../services/products/cartSlice';


ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  const { cartItems } = useSelector((state) => state.carts)

  const dispatch = useDispatch()
  const handleDelete = (value) => {
    dispatch(removeFromCart(value))
  }

  const handleAdd = (value) => {
    dispatch(addQuantity(value))
  }

  const handleMinus = (value) => {
    dispatch(minusQuantity(value))
  }
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Checkout&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Menu Pesanan
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <List>
                {cartItems.length > 0 && cartItems.map((item) =>
                (
                  <React.Fragment key={item.id}>
                    <ListItem
                      secondaryAction={
                        <MenuItem onClick={() => handleDelete(item)} sx={{ color: 'error.main' }}>
                          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                        </MenuItem>
                      }
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={`${item.quantity} x ${item.price} = ${item.quantity*item.price}`}
                      />
                    </ListItem>
                    <ListItem>
                      <Button variant="contained" onClick={() => handleAdd(item)} startIcon={<Iconify icon="eva:plus-fill" />}/>
                      <Button variant="outlined" onClick={() => handleMinus(item)} startIcon={<Iconify icon="eva:minus-fill" />}/>
                    </ListItem>
                  </React.Fragment>
                ))
                }
              </List>
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
