declare global {
  interface Window {
    // Facebook Pixel
    fbq: (action: string, ...args: any[]) => void;
    _fbq?: any;
    
    // Google Analytics
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export {};
