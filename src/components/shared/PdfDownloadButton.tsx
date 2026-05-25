import { Lang } from '@/lib/types';
import { getLabels } from '@/lib/i18n';
import Link from 'next/link';

interface PdfDownloadButtonProps {
  lang: Lang;
}

export default function PdfDownloadButton({ lang }: PdfDownloadButtonProps) {
  const labels = getLabels(lang);

  return (
    <Link
      href={`/pdf/cv-nicolas-daval-${lang}.pdf`}
      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark underline underline-offset-2 transition-colors"
      download
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {labels.downloadPdf}
    </Link>
  );
}
