import React from 'react';

/**
 * @desc single component to show loading status
 * @constructor
 */
const SpinnerComponent = () => {
	return (
		<div className={'loadingSpinnerContainer'}>
			<div className={'loadingSpinner'} />
		</div>
	);
};

export default SpinnerComponent;
