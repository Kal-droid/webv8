import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart2, Lightbulb, Users, Target, Briefcase, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavItem } from '../types/navigation';
import Logo from './common/Logo';
import NavLink from './navigation/NavLink';
import BurgerButton from './navigation/MobileNavigation/BurgerButton';
import MobileMenu from './navigation/MobileNavigation/MobileMenu';
import NavbarBackground from './navigation/NavbarBackground';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useMobileMenu } from '../hooks/useMobileMenu';

const navItems: NavItem[] = [
  { to: '/', icon: <BarChart2 className="h-5 w-5" />, text: 'Overview' },
  { to: '/vision', icon: <Target className="h-5 w-5" />, text: 'Our Vision' },
  { to: '/services', icon: <Briefcase className="h-5 w-5" />, text: 'Services' },
  { to: '/expertise', icon: <Lightbulb className="h-5 w-5" />, text: 'Expertise' },
  { to: '/partnerships', icon: <Users className="h-5 w-5" />, text: 'Partnerships' },
  { to: '/contact', icon: <Phone className="h-5 w-5" />, text: 'Contact' }
];

export default function Navigation() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <NavbarBackground isScrolled={isScrolled} />

      <div className="relative container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BurgerButton isOpen={isOpen} onClick={toggle} />
            <Logo className="ml-2 md:ml-0" />
          </div>
          
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                item={item}
                isActive={location.pathname === item.to}
              />
            ))}
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        onClose={close}
        navItems={navItems}
      />
    </motion.nav>
  );
}