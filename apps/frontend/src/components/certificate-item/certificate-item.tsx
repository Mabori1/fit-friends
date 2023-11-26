import { SERVER_API_URL } from '../../const';
import { Document, Page, pdfjs } from 'react-pdf';

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
          <Document file={`${SERVER_API_URL}/${certificateItem}`}>
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
              srcSet={`${SERVER_API_URL}/${certificateItem}`}
            />
            <img
              src={`${SERVER_API_URL}/${certificateItem}`}
              srcSet={`${SERVER_API_URL}/${certificateItem} 2x`}
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
