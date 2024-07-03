'use client';

import Spline from '@splinetool/react-spline';
import useResizeObserver from 'use-resize-observer';

export default function Home() {
    const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
    return (
        <div className="absolute bottom-0 left-0 right-0 top-0" ref={ref}>
            <Spline scene="/assets/spline/robot.splinecode" style={{ height }} />
        </div>
    );
}
