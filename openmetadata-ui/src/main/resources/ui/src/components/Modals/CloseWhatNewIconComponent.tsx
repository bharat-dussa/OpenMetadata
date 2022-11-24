import React from 'react';

const CloseWhatNewIconComponent = ({
  handleCancel,
}: {
  handleCancel: () => void;
}) => {
  return (
    <svg
      className="w-6 h-6 m-l-xss cursor-pointer"
      data-testid="closeWhatsNew"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleCancel}>
      <path
        d="M6 18L18 6M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CloseWhatNewIconComponent;
