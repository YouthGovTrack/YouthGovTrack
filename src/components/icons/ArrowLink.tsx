import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-feather';

interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  iconClass?: string;
  isLink?: boolean;
  to?: string;
}

const ArrowLink: React.FC<ArrowLinkProps> = ({
  children,
  className = '',
  iconClass = '',
  isLink = true,
  to = '',
  ...props
}) => {
  const content = () => (
    <a
      {...props}
      className={`
        inline-flex items-center justify-center group relative
        px-6 py-2.5 font-medium text-base rounded-lg
        transition-all duration-300 ease-in-out
        hover:shadow-md active:shadow-sm
        ${className}`}
    >
      <span className="relative z-10 flex items-center">
        {children}
        <span
          className={`transition-all duration-300 ml-2 transform group-hover:translate-x-1
            ${iconClass || 'text-current'}`}
        >
          <ArrowRight className="w-5 h-5 group-hover:hidden" />
          <svg
            className="w-5 h-5 hidden group-hover:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </span>
      <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>
  );

  return isLink ? (
    <Link to={to} className="no-underline">
      {content()}
    </Link>
  ) : (
    content()
  );
};

export default ArrowLink;
