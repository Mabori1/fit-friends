import { Document, Page, pdfjs } from 'react-pdf';
import 'dotenv';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type CertificateItemProps = {
  certificateItem: string;
};

function CertificateItem({
  certificateItem,
}: CertificateItemProps): JSX.Element {
  return (
    <div className="certificate-card__image" data-testid="certificate-item">
      <picture>
        {certificateItem.match(/.+.pdf/) ? (
          <Document
            file={`${import.meta.env.VITE_SERVER_URL_FILES}${certificateItem}`}
          >
            <Page
              renderAnnotationLayer={false}
              height={360}
              pageNumber={1}
              renderTextLayer={false}
            />
          </Document>
        ) : (
          <>
            <source
              type="image/webp"
              srcSet={`${import.meta.env.VITE_SERVER_URL}/${certificateItem}`}
            />
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${certificateItem}`}
              srcSet={`${
                import.meta.env.VITE_SERVER_URL
              }/${certificateItem} 2x`}
              width="294"
              height="360"
              alt="Сертификат"
            />
          </>
        )}
      </picture>
    </div>
  );
}

export default CertificateItem;
