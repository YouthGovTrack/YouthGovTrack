import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-feather';

interface ArrowLinkProps {
  children: React.ReactNode;
  className?: string;
  iconClass?: string;
  isLink?: boolean;
  to?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
}

const ArrowLink: React.FC<ArrowLinkProps> = ({
  children,
  className = '',
  iconClass = '',
  isLink = true,
  to = '',
  disabled = false,
  type = 'button',
  onClick,
  href,
  target,
  rel,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center group relative
    px-6 py-2.5 font-medium text-base rounded-lg
    transition-all duration-300 ease-in-out
    hover:shadow-md active:shadow-sm
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}`;

  const content = () => (
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
  );

  const hoverEffect = (
    <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  );

  if (isLink && to) {
    return (
      <Link to={to} className="no-underline">
        <span className={baseClasses}>
          {content()}
          {hoverEffect}
        </span>
      </Link>
    );
  }

  if (isLink && href) {
    return (
      <a 
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        onClick={disabled ? undefined : onClick}
      >
        {content()}
        {hoverEffect}
      </a>
    );
  }

  // For button functionality
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
    >
      {content()}
      {hoverEffect}
    </button>
  );
};

export default ArrowLink;
