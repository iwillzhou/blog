'use client';

import Spline from '@splinetool/react-spline';
import useResizeObserver from 'use-resize-observer';

export default function Home() {
    const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
    return (
        <div className="w-full" ref={ref}>
            <Spline scene="/assets/spline/robot.splinecode" style={{ height }} />
        </div>
    );
}
