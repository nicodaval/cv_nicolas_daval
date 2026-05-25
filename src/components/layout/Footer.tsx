export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
        <p>&copy; {year} Nicolas DAVAL</p>
        <a
          href="https://linkedin.com/in/nicolasdaval"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
