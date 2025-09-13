import { Leaf } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="py-8 text-center">
      <div className="inline-flex items-center gap-3">
        <Leaf className="h-10 w-10 text-primary" />
        <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground">
          AgriAssist
        </h1>
      </div>
      <p className="mt-2 text-lg text-muted-foreground">
        Your AI-powered guide for healthier crops.
      </p>
    </header>
  );
};

export default AppHeader;
