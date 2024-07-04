import { name } from 'src/config';
import type { Metadata } from 'next';
import SplineContainer from 'src/components/spline-container';

export const metadata: Metadata = {
    title: name
};

export default async function Home() {
    return <SplineContainer scene="/assets/spline/robot.splinecode" />;
}
