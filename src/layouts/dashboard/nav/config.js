// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    role: ['owner'],
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    role: ['owner'],
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    role: ['owner', 'employee'],
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
    role: ['owner'],
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
    role: ['owner', 'employee'],
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
    role: ['owner', 'employee'],
  },
];

export default navConfig;
