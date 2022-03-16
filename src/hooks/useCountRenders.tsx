import { useRef } from 'react';

export function useCountRenders(): void {
    const renders = useRef(0);
    console.log('🚀 renders :', renders.current++);
}
