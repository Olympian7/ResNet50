const AppFooter = () => {
  return (
    <footer className="w-full py-6 text-center text-sm text-muted-foreground">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} AgriAssist. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AppFooter;
