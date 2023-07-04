import React from 'react';

/**
 * Icon component to display an image with optional interactivity.
 * 
 * @param {string} name - The name of the icon.
 * @param {string} imgUrl - The URL or path to the image file.
 * @param {function} handleClick - Event handler function for icon click.
 * @param {boolean} disabled - Flag indicating whether the icon is disabled.
 * @param {string} isActive - The active state of the icon.
 * @param {string} styles - Additional CSS styles for the icon.
 * @returns {JSX.Element} - The rendered icon component.
 */
const Icon = ({ name, image, handleClick, disabled, isActive, styles }) => (
  <div className={`rounded-[50px] ${isActive && isActive === name && 'bg-[#96b6d78f]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles} transition-all duration-300 ease-in-out`} onClick={handleClick} >
    {!isActive ? (
      <img src={image} alt="fund_logo" className="w-2/2 h-2/2" />
    ) : (
      <img src={image} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
);

export default Icon;