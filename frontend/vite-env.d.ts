/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT : string;
    readonly VITE_NODE_ENV : string;
    readonly VITE_MONGODB_CONNECTION_URI : string;
    readonly VITE_BASE_URL : string
    
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}