import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import certificateService from "../../../services/StudentProfileSettingsServices/certificateService";
import studentService from "../../../services/studentService";
import { setStudent } from "../../../store/slices/studentSlice";
import CertificateCard from "./CertificateCard/CertificateCard";
import "./Certificates.css";

function Certificates() {
  const dispatch = useDispatch()
  const [certificates, setCertificates] = useState([] as any);

  const updatedValues = {
    certificateUrl: null,
    certificateUrlTemp: null,
  } as any;

  const getCertificates = async () => {
    const data = (await certificateService.getForLoggedStudent()).data?.items;
    setCertificates(data);
  };

  const addCertificates = async (file: any) => {
    updatedValues.certificateUrlTemp = file.target.files[0];
    await certificateService.add(updatedValues);
    const newStudent = await studentService.getByToken();
    dispatch(setStudent(newStudent));
    getCertificates();
  };

  useEffect(() => {
    getCertificates();
  }, []);

  return (
    <div className="d-flex flex-column">
      <div className="certificates">
        <div className="row">
          <div className="col-12 mb-6">
            <h5>Sertifikalarim</h5>
            <div className="upload-area d-flex  flex-column align-items-center justify-content-center gap-3">
              <label id="file-upload" className="upload-img">
                <img src="icons/cloud_upload_FILL0.svg"></img>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={addCertificates}
                />
              </label>
              <span>Dosya Yukle</span>
            </div>
          </div>
        </div>
      </div>
      {certificates !== null && (
        <div className="anim-fadein col-12 mt-5 pb-3">
          {certificates.map((certificate: any) => {
            return (
              <CertificateCard
                certificate={certificate}
                setCertificates={setCertificates}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Certificates;
