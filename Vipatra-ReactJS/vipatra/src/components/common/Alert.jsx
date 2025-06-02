// src/components/common/Alert.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Define standard icons for different alert types (using Heroicons for example)
const icons = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 101.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

const Alert = ({ type = 'info', message, showIcon = true, onClose, children }) => {
  const { t } = useTranslation(); // If message needs to be a t-key

  // Define color schemes based on type
  const typeStyles = {
    success: {
      bg: 'bg-success-light', // e.g., bg-green-100
      border: 'border-success-DEFAULT', // e.g., border-green-500
      text: 'text-success-dark', // e.g., text-green-700
      iconColor: 'text-success-DEFAULT' // e.g., text-green-500 for icon
    },
    error: {
      bg: 'bg-danger-light',
      border: 'border-danger-DEFAULT',
      text: 'text-danger-dark',
      iconColor: 'text-danger-DEFAULT'
    },
    warning: {
      bg: 'bg-warning-light',
      border: 'border-warning-DEFAULT',
      text: 'text-warning-dark',
      iconColor: 'text-warning-DEFAULT'
    },
    info: {
      bg: 'bg-info-light',
      border: 'border-info-DEFAULT',
      text: 'text-info-dark',
      iconColor: 'text-info-DEFAULT'
    },
    // Add more types like 'neutral' or a default blue
    default: {
        bg: 'bg-blue-100', // Fallback if type is not matched
        border: 'border-blue-500',
        text: 'text-blue-700',
        iconColor: 'text-blue-500'
    }
  };

  const currentStyle = typeStyles[type] || typeStyles.default;
  const IconComponent = showIcon ? icons[type] || icons.info : null;


  if (!message && !children) {
    return null; // Don't render if no message or children
  }

  return (
    <div
      role="alert"
      className={`p-4 border-l-4 border-solid rounded-md flex items-start ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text}`}
    >
      {showIcon && IconComponent && (
        <span className={`mr-3 ${currentStyle.iconColor}`}>{IconComponent}</span>
      )}
      <div className="flex-1">
        {message ? <p>{typeof message === 'function' ? message(t) : message}</p> : children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 inline-flex h-8 w-8 ${currentStyle.bg} ${currentStyle.text} hover:bg-opacity-80 focus:ring-offset-2`}
          aria-label={t('common.close', 'Close')}
        >
          <span className="sr-only">{t('common.close', 'Close')}</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'default']),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.func]), // Can be string or function that takes t
  showIcon: PropTypes.bool,
  onClose: PropTypes.func, // Optional function to handle close action
  children: PropTypes.node, // For more complex alert content
};

export default Alert;