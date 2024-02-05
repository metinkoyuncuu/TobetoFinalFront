import FormikInput from "../../FormikInput/FormikInput";
import "./PersonalInformations.css";
import * as Yup from "yup";
import "yup-phone-lite";
import { Form, Formik } from "formik";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStudent, setStudent } from "../../../store/slices/studentSlice";
import studentService from "../../../services/studentService";
import { ToastContainer, toast } from "react-toastify";
import ExceptionService from "../../../utils/exceptionService";
import exceptionService from "../../../utils/exceptionService";

function PersonalInformations() {
  const dispatch = useDispatch();
  const student = useSelector(selectStudent);

  const initialValues = {
    firstName: student.firstName || null,
    lastName: student.lastName || null,
    phone: student.phone || null,
    birthDate: student.birthDate?.substring(0, 10) || null,
    nationalIdentity: student.nationalIdentity || null,
    email: student.email || null,
    country: student.country || null,
    addressDetail: student.adrressDetail || null,
    description: student.description || null,
    profilePhotoPath: null,
    profilePhotoPathTemp: null,
  };

  const validationSchema = Yup.object({
    // name: Yup.string().required("Doldurulması zorunlu alan*"),
    // surname: Yup.string().required("Doldurulması zorunlu alan*"),
    // birthDate: Yup.string().required("Doldurulması zorunlu alan*"),
    // country: Yup.string().required("Doldurulması zorunlu alan*"),
    // city: Yup.string().required("Doldurulması zorunlu alan*"),
    // district: Yup.string().required("Doldurulması zorunlu alan*"),
    // email: Yup.string()
    //   .email("Lutfen Gecerli Bir E-Posta Adresi Giriniz")
    //   .required("Doldurulması zorunlu alan*"),
    // phone: Yup.string()
    //   .phone("TR", "Lutfen Gecerli Bir Telefon Numarasi Giriniz")
    //   .required("Doldurulması zorunlu alan*"),
    // nationalIdentity: Yup.string()
    //   .required("*Aboneliklerde fatura için doldurulması zorunlu alan")
    //   .typeError("*Aboneliklerde fatura için doldurulması zorunlu alan")
    //   .matches(/^[0-9]{11}$/, "Lütfen Geçerli Bir TC Kimlik Numarası Giriniz"),
  });

  const fileDelete = async () => {
    try {
      const updatedInitialValues: any = {
        ...initialValues,
        profilePhotoPath: null,
      };
      await studentService.update(updatedInitialValues);
      const newStudent = await studentService.getByToken();
      dispatch(setStudent(newStudent));
      toast.success("Degisikler Kaydedildi!");
    } catch (error) {
      console.log(error);
    }
  };

  const fileUpload = async (file: any) => {
    try {
      const targetFile = new FormData();
      targetFile.append("ProfilePhotoPathTemp", file.target.files[0]);

      const updatedInitialValues: any = {
        ...initialValues,
        profilePhotoPathTemp: file.target.files[0],
      };
      await studentService.update(updatedInitialValues);
      const newStudent = await studentService.getByToken();
      dispatch(setStudent(newStudent));
      toast.success("Degisikler Kaydedildi!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudent = async (updatedInitialValues: any) => {
    try {
      await studentService.update(updatedInitialValues);
      const newStudent = await studentService.getByToken();
      dispatch(setStudent(newStudent));
      toast.success("Degisikler Kaydedildi!");
    } catch (error: any) {
      console.log(error);
      toast.error(
        exceptionService.errorSelector(JSON.stringify(error.response.data))
      );
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(initialValues) => {
          updateStudent(initialValues);
        }}
      >
        <Form>
          <div className="personal-informations row">
            <div className="col-12 mb-5 text-center">
              <div className="profile-photo">
                <img
                  src={
                    student.profilePhotoPath
                      ? student.profilePhotoPath
                      : "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
                  }
                ></img>
                <div
                  className="profile-photo-remove"
                  onClick={fileDelete}
                ></div>
                <label id="file-upload" className="profile-photo-edit">
                  <input
                    name="profilePhotoPathTemp"
                    id="file-upload"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    style={{ visibility: "hidden" }}
                    onChange={fileUpload}
                  />
                </label>
              </div>
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <label>Adınız*</label>
              <FormikInput name="firstName" label="Adiniz*" />
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <label>Soyadınız*</label>
              <FormikInput name="lastName" />
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <label>Telefon Numaranız*</label>
              <FormikInput name="phone" />
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <label>Doğum Tarihiniz*</label>
              <FormikInput name="birthDate" type="date" />
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <label>TC Kimlik No*</label>
              <FormikInput name="nationalIdentity" />
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <label>E-Posta*</label>
              <FormikInput name="email" />
            </div>
            <div className="profile-input col-12 mb-4">
              <label>Ülke*</label>
              <FormikInput name="country" />
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <label>İl*</label>
              <FormikInput name="city" />
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <label>İlçe*</label>
              <FormikInput name="district" />
            </div>
            <div className="big-profile-input col-12 mb-4">
              <label>Mahalle / Sokak</label>
              <FormikInput name="addressDetail" as="textarea" rows={4} />
            </div>
            <div className="big-profile-input col-12 mb-4">
              <label>Hakkkımda</label>
              <FormikInput name="description" as="textarea" rows={4} />
            </div>
          </div>
          <button className="save-button" type="submit">
            Kaydet
          </button>
        </Form>
      </Formik>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default PersonalInformations;
