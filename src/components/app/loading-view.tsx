import { Loader2 } from 'lucide-react';

const LoadingView = () => {
  return (
    <div className="flex h-96 flex-col items-center justify-center gap-6 text-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <div>
        <h2 className="font-headline text-3xl font-semibold">Analyzing your crop...</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Our AI is hard at work. This may take a moment.
        </p>
      </div>
    </div>
  );
};

export default LoadingView;
