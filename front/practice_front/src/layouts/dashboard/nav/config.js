// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Welcome Page',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Registration',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Update Record',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Status',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  
  {
    title: 'About',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
