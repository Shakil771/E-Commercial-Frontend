import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, id, className = '', ...rest }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label-text">
          {label}
        </label>
      )}
      <input id={id} ref={ref} className={`input-field ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`} {...rest} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
