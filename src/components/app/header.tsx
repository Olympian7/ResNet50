"use client";

import { Leaf, Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';

const AppHeader = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ml' : 'en');
  };

  return (
    <header className="container relative py-8 text-center">
       <div className="absolute top-4 right-4">
        <Button variant="outline" size="icon" onClick={toggleLanguage}>
          <Languages className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </div>
      <div className="inline-flex items-center gap-3">
        <Leaf className="h-10 w-10 text-primary" />
        <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground">
          {t('appName')}
        </h1>
      </div>
      <p className="mt-2 text-lg text-muted-foreground">
        {t('appDescription')}
      </p>
    </header>
  );
};

export default AppHeader;
