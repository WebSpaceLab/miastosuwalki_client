interface ImportMeta {
    readonly hot?: {
        accept: (callback?: () => void) => void;
        // You can add other HMR-related properties and methods as needed
    };
}