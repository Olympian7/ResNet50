"use client";

import { useState } from "react";
import type { AnalyzeCropImageOutput } from "@/ai/flows/analyze-crop-image";
import { useToast } from "@/hooks/use-toast";
import { handleImageAnalysis } from "@/lib/actions";

import ImageUploader from "@/components/app/image-uploader";
import AnalysisResult from "@/components/app/analysis-result";
import LoadingView from "@/components/app/loading-view";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCropImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageSubmit = async (photoDataUri: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setImagePreview(photoDataUri);

    const result = await handleImageAnalysis(photoDataUri);

    if (result.error) {
      setError(result.error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: result.error,
      });
      setIsLoading(false);
      // Don't reset image preview so user can see what they uploaded
    } else if (result.data) {
      setAnalysisResult(result.data);
    }
    
    setIsLoading(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <LoadingView />
        ) : analysisResult && imagePreview ? (
          <AnalysisResult 
            result={analysisResult} 
            imagePreview={imagePreview}
            onReset={handleReset} 
          />
        ) : (
          <ImageUploader onImageSubmit={handleImageSubmit} isLoading={isLoading} />
        )}

        {error && !isLoading && (
           <div className="mt-4 text-center text-destructive">
             <p>{error}</p>
             <button onClick={handleReset} className="mt-2 text-primary underline">Try again</button>
           </div>
        )}
      </div>
    </div>
  );
}
