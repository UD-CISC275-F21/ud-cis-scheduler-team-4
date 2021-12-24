import { ReportHandler } from "web-vitals";

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import(
            /* webpackChunkName: "web-vitals" */
            "web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        })
            .catch(err => err as string);
    }
};

export default reportWebVitals;
