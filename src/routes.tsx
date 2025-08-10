// Route definitions for the application
// This file contains route mappings and configurations

export interface Route {
  path: string;
  component: string;
  title: string;
  exact?: boolean;
}

// Define application routes
export const routes: Route[] = [
  {
    path: '/',
    component: 'Home',
    title: 'Home - YouthGovTrack',
    exact: true,
  },
  {
    path: '/dashboard',
    component: 'Projects',
    title: 'Projects - YouthGovTrack',
  },
  {
    path: '/projects',
    component: 'Projects',
    title: 'Projects - YouthGovTrack',
  },
  {
    path: '/projects/:id',
    component: 'ProjectDetail',
    title: 'Project Details - YouthGovTrack',
  },
  {
    path: '/reports',
    component: 'Reports',
    title: 'Reports - YouthGovTrack',
  },
  {
    path: '/profile',
    component: 'Profile',
    title: 'Profile - YouthGovTrack',
  },
  {
    path: '/about',
    component: 'About',
    title: 'About - YouthGovTrack',
  },
  {
    path: '/contact',
    component: 'Contact',
    title: 'Contact - YouthGovTrack',
  },
];

// Navigation menu items
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: '🏠',
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: '🏗️',
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: '📊',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: '📈',
  },
  {
    label: 'About',
    path: '/about',
    icon: 'ℹ️',
  },
];

// Footer navigation items
export const footerNavItems: NavItem[] = [
  {
    label: 'About Us',
    path: '/about',
  },
  {
    label: 'How It Works',
    path: '/how-it-works',
  },
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Reports',
    path: '/reports',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
  {
    label: 'Privacy Policy',
    path: '/privacy',
  },
  {
    label: 'Terms of Service',
    path: '/terms',
  },
];

// Utility functions for routing
export const getRouteByPath = (path: string): Route | undefined => {
  return routes.find(route => route.path === path);
};

export const getPageTitle = (path: string): string => {
  const route = getRouteByPath(path);
  return route?.title || 'YouthGovTrack';
};

// Breadcrumb generation
export const generateBreadcrumbs = (path: string): Array<{ label: string; path: string }> => {
  const pathSegments = path.split('/').filter(segment => segment !== '');
  const breadcrumbs = [{ label: 'Home', path: '/' }];
  
  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    const route = getRouteByPath(currentPath);
    if (route) {
      breadcrumbs.push({
        label: route.title.replace(' - YouthGovTrack', ''),
        path: currentPath,
      });
    }
  });
  
  return breadcrumbs;
};

export default routes;
