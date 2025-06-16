import { usePDF } from 'react-to-pdf';

// 1. First, extend the Options type to include the callbacks
type PDFOptions = Parameters<typeof usePDF>[0] & {
  onBeforeGetContent?: () => Promise<void> | void;
  onBeforeSave?: () => Promise<void> | void;
  onAfterSave?: () => Promise<void> | void;
  onError?: (error: Error) => void;
};

// 2. Create a custom hook with proper typing
export const useCustomPDF = (options: PDFOptions) => {
  const { toPDF, targetRef } = usePDF(options);
  
  return {
    toPDF: async () => {
      try {
        await options.onBeforeGetContent?.();
        await toPDF();
        options.onAfterSave?.();
      } catch (error) {
        options.onError?.(error as Error);
      }
    },
    targetRef
  };
};