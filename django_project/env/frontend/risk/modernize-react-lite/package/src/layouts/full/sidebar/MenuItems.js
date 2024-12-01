import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,IconCalculator
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Risk Calculator',
  },
  {
    id: uniqueId(),
    title: 'Operational risk',
    icon: IconCalculator,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Credit Risk',
    icon: IconCalculator,
    href: '/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Authentification',
  },
  {
    id: uniqueId(),
    title: 'Sign in',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Sign up',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  
];

export default Menuitems;
