"use client";

import { useState, useRef, type DragEvent } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSubmit: (photoDataUri: string) => void;
  isLoading: boolean;
}

const ImageUploader = ({ onImageSubmit, isLoading }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload an image file (e.g., JPG, PNG).",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const photoDataUri = e.target?.result as string;
      if (photoDataUri) {
        onImageSubmit(photoDataUri);
      } else {
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: "Could not read the selected file.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "w-full max-w-2xl cursor-pointer rounded-xl border-2 border-dashed border-primary/50 bg-card p-12 text-center shadow-sm transition-all duration-300 hover:border-primary hover:bg-secondary",
        isDragging && "scale-105 border-primary bg-secondary shadow-lg",
        isLoading && "pointer-events-none opacity-50"
      )}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        disabled={isLoading}
      />
      <div className="flex flex-col items-center gap-4">
        <UploadCloud className="h-16 w-16 text-primary" />
        <h2 className="font-headline text-2xl font-semibold">Upload Your Crop Image</h2>
        <p className="text-muted-foreground">
          Drag and drop an image here, or click to select a file.
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
