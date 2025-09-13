
"use client";
import { useLanguage } from '@/hooks/use-language';

const AppFooter = () => {
  const { t } = useLanguage();
  return (
    <footer className="w-full py-6 text-center text-sm text-muted-foreground">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} {t('footerCopyright')}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AppFooter;
