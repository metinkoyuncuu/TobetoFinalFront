import { toast } from "react-toastify";
import certificateService from "../../../../services/StudentProfileSettingsServices/certificateService";
import "./CertificateCard.css";
import exceptionService from "../../../../utils/exceptionService";

function CertificateCard({ certificate, setCertificates }: any) {
  const deleteCertificates = async () => {
    try {
      await certificateService.deleteStudentCertificate(certificate.id);
      const data = (await certificateService.getForLoggedStudent()).data.items;
      setCertificates(data);
    } catch (error: any) {
      toast.error(
        exceptionService.errorSelector(JSON.stringify(error.response.data))
      );
    }
  };

  return (
    <div className="certificate-card col-12 d-flex flex-column mt-3">
      <div className="header p-2 d-flex justify-content-between">
        <span>Dosya Adi</span>
        <div className="wid-40 gap-3 d-flex justify-content-between">
          <span>Dosya Turu</span>
          <span>Tarih</span>
          <span>Islem</span>
        </div>
      </div>
      <div className="contents p-3 d-flex justify-content-between">
        <strong className="cursor">
          Yusuf_Ugurlu_-_Software_Developer.pdf
        </strong>
        <div className="wid-35 gap-3 d-flex justify-content-between">
          <img className="pdf-png" src="https://tobeto.com/pdf.png"></img>
          <span>09.02.2024</span>
          <div
            className="certificate-delete-button"
            onClick={deleteCertificates}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
