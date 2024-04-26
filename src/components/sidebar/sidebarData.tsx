import { classNames } from 'primereact/utils';
import { title } from 'process';
import * as LuIcons from 'react-icons/lu';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LuIcons.LuLineChart size={22} />,
    cName: 'nav-text'
  },
  {
    title: 'Upload',
    path: '/upload',
    icon: <LuIcons.LuUpload size={22} />,
    cName: 'nav-text'
  },
  {
    title: 'Cadastro de Usuários',
    path: '/cadastro-usuarios',
    icon: <LuIcons.LuUserPlus size={40} />,
    cName:'nav-text'
  },
  {
    title: 'Sair',
    path: '',
    icon: <LuIcons.LuLogOut size={22} />,
    cName: 'nav-text logout-text'
  }
];