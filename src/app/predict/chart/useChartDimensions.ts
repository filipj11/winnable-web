import { useState, useRef, useEffect} from "react";
import { ChartDimensions } from "./LineChart";
// import ResizeObserver from '@juggle/resize-observer';

const useChartDimensions = (passedSettings: ChartDimensions): [React.RefObject<HTMLDivElement>, ChartDimensions] => {
    const ref = useRef<HTMLDivElement>(null);
    const dimensions = combineChartDimensions(
        passedSettings
    );

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (dimensions.width && dimensions.height)
            return;

        const element = ref.current;

        if (!element)
            return;

        const resizeObserver = new ResizeObserver(
            entries => {
                if (!Array.isArray(entries)) return;
                if (!entries.length) return;

                console.log(width, height);
                const entry = entries[0];

                if (width != entry.contentRect.width)
                    setWidth(entry.contentRect.width);
                if (height != entry.contentRect.height)
                    setHeight(entry.contentRect.height);
            }
        )

        resizeObserver.observe(element);

        return () => {
            resizeObserver.unobserve(element);
        }
    }, [dimensions]);

    const newSettings = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height,
    });

    return [ref, newSettings];
};


const combineChartDimensions = (dimensions: ChartDimensions) => {
    const parsedDimensions = {
        ...dimensions,
        marginTop: dimensions.marginTop || 10,
        marginRight: dimensions.marginRight || 10,
        marginBottom: dimensions.marginBottom || 40,
        marginLeft: dimensions.marginLeft || 75,
    }

    return {
        ...parsedDimensions,
        boundedHeight: Math.max(
            parsedDimensions.height ?? 0
            - parsedDimensions.marginTop
            - parsedDimensions.marginBottom,
            0,
        ),
        boundedWidth: Math.max(
            parsedDimensions.width ?? 0
            - parsedDimensions.marginLeft
            - parsedDimensions.marginRight,
            0,
        ),
    }
}

export default useChartDimensions;