'use client';

import useResizeObserver from 'use-resize-observer';
import Spline, { type SplineProps } from '@splinetool/react-spline';

const SplineContainer = (props: SplineProps) => {
    const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
    return (
        <div className="absolute bottom-0 left-0 right-0 top-0" ref={ref}>
            <Spline {...props} style={{ width, height }} />
        </div>
    );
};

export default SplineContainer;
