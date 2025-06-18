import React from 'react';

/**
 * A reusable, full-bleed, sticky page header.
 * THIS COMPONENT MUST BE A DIRECT CHILD OF THE MAIN SCROLLING CONTAINER.
 * The content that scrolls should be its sibling.
 * 
 * @param {string} title - The main title to display on the left.
 * @param {React.ReactNode} children - Optional buttons or controls for the right side.
 */
const PageHeader = ({ title, children }) => {
  return (
    // This div is sticky and has its OWN padding because its parent should have none.
    // NOTE: `top-16` assumes your main app header is 4rem/64px tall (h-16).
    // Adjust this if your header is a different height.
    <div className="sticky top-16 z-20 bg-background px-6 sm:px-8 py-4 border-b border-borderLight shadow-sm">
      <div className="flex justify-between items-center">
        
        {/* Title on the left */}
        <h2 className="text-3xl font-heading text-primary">
          {title}
        </h2>
        
        {/* Children (buttons, etc.) on the right */}
        {children && (
          <div className="flex items-center space-x-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;