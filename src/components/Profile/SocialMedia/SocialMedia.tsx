import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { CreateStudentSocialMediaRequest } from "../../../models/requests/StudentSocialMediaRequests";
import socialMediaService from "../../../services/StudentProfileSettingsServices/socialMediaService";
import studentService from "../../../services/studentService";
import { setStudent } from "../../../store/slices/studentSlice";
import FormikInput from "../../FormikInput/FormikInput";
import SocialMediaCard from "./SocialMediaCard/SocialMediaCard";

function SocialMedia() {
  const dispatch = useDispatch()
  const [socialMedias, setSocialMedias] = useState([]);
  const [socialMediaOptions, setSocialMediaOptions] = useState([]);

  const initialValues = {
    socialMediaId: null,
    mediaAccountUrl: null,
  };

  const validationSchema = Yup.object({
    socialMediaId: Yup.string().required("Doldurulması zorunlu alan*"),
    mediaAccountUrl: Yup.string().required("Doldurulması zorunlu alan*"),
  });

  const addStudentSocialMedia = async (
    data: CreateStudentSocialMediaRequest
  ) => {
    await studentService.addStudentSocialMedias(data);
    getStudentSocialMedias();
    const newStudent = await studentService.getByToken();
    dispatch(setStudent(newStudent));
  };

  const getSocialMedias = async () => {
    const data = await socialMediaService.getAll();
    setSocialMediaOptions(data);
  };

  const getStudentSocialMedias = async () => {
    const data = (await socialMediaService.getForLoggedStudent()).data?.items;
    setSocialMedias(data);
  };

  useEffect(() => {
    getStudentSocialMedias();
    getSocialMedias();
  }, []);

  return (
    <div className="social-media">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(initialValues: any) => {
          addStudentSocialMedia(initialValues);
        }}
      >
        <Form>
          <div className="row">
            <div className="profile-input col-6">
              <Field as="select" name={"socialMediaId"}>
                <option>Seciniz</option>
                {socialMediaOptions.map((sc: any) => (
                  <option value={sc.id}>{sc.name}</option>
                ))}
              </Field>
            </div>
            <div className="profile-input col-12 col-md-6 mb-4">
              <FormikInput name="mediaAccountUrl" placeholder="https://" />
            </div>
          </div>
          <button className="save-button" type="submit">
            Kaydet
          </button>
          {socialMedias !== null && (
            <div className="anim-fadein col-12 mt-5">
              {socialMedias !== null &&
                socialMedias.map((socialMedia) => (
                  <SocialMediaCard
                    socialMedia={socialMedia}
                    setSocialMedias={setSocialMedias}
                  />
                ))}
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
}

export default SocialMedia;
