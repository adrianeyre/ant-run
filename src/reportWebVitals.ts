import type { Metric } from 'web-vitals';

/**
 * web-vitals v6 replaced the `getX(cb)` getters with `onX(cb)` listeners, and
 * dropped FID entirely in favour of INP — FID was retired as a Core Web Vital
 * in 2024, so there is no getter left to call.
 */
const reportWebVitals = (onPerfEntry?: (metric: Metric) => void): void => {
	if (!onPerfEntry || typeof onPerfEntry !== 'function') return;

	void import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
		onCLS(onPerfEntry);
		onINP(onPerfEntry);
		onFCP(onPerfEntry);
		onLCP(onPerfEntry);
		onTTFB(onPerfEntry);
	});
};

export default reportWebVitals;
