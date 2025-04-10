import { useEffect } from 'react';

/**
 * Hook that handles clicks outside of a specified element
 * @param {React.RefObject} ref - Reference to the element to monitor for outside clicks
 * @param {Function} handler - Callback function to execute when a click outside occurs
 */
const useClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

export default useClickOutside;
