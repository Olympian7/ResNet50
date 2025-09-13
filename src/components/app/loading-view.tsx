import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const LoadingView = () => {
  const { t } = useLanguage();
  return (
    <div className="flex h-96 flex-col items-center justify-center gap-6 text-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <div>
        <h2 className="font-headline text-3xl font-semibold">{t('analyzingMessage')}</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('analyzingSubMessage')}
        </p>
      </div>
    </div>
  );
};

export default LoadingView;
