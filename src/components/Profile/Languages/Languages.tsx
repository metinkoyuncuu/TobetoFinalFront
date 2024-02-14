import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { CreateStudentLanguageLevelRequest } from "../../../models/requests/StudentLanguageLevelRequests";
import languagesService from "../../../services/StudentProfileSettingsServices/languagesService";
import studentService from "../../../services/studentService";
import LanguageCard from "./LanguageCard/LanguageCard";
import "./Languages.css";

function Languages() {
  const [languages, setLanguages] = useState([] as any);
  const [selectLanguage, setSelectLanguage] = useState([] as any);
  const [languageOptions, setLanguageOptions] = useState([] as any);
  const [languageLevels, setLanguageLevels] = useState([] as any);

  const validationSchema = Yup.object({
    languageLevelId: Yup.string().required("Lutfen secim yapiniz"),
  });

  const getLanguages = async () => {
    const data = await languagesService.getAll();
    setLanguageOptions(data);
  };

  const getLanguagesLevels = async () => {
    const data = (await languagesService.getLanguagesLevels()).data?.items;
    setLanguageLevels(data);
  };

  const getStudentLanguages = async () => {
    const data = (await languagesService.getForLoggedStudent()).data?.items;
    setLanguages(data);
  };

  const addStudentLanguage = async (
    data: CreateStudentLanguageLevelRequest
  ) => {
    await studentService.addStudentLanguages(data);
    const newData = (await languagesService.getForLoggedStudent()).data?.items;
    setLanguages(newData);
  };

  useEffect(() => {
    getStudentLanguages();
    getLanguages();
    getLanguagesLevels();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          languageLevelId: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(updatedValues: any) => {
          addStudentLanguage(updatedValues);
        }}
      >
        <Form>
          <div className="student-languages">
            <div className="row mb-4">
              <div className="profile-input col-6">
                <select
                  onChange={(e: any) => setSelectLanguage(e.target.value)}
                >
                  <option>Seciniz</option>
                  {languageOptions.map((lang: any) => (
                    <option value={lang.id}>{lang.name}</option>
                  ))}
                </select>
              </div>
              <div className="profile-input col-6">
                <Field as="select" name="languageLevelId">
                  <option>Seciniz</option>
                  {languageLevels.map(
                    (langlevel: any) =>
                      langlevel.languageId == selectLanguage && (
                        <option value={langlevel.id}>{langlevel.name}</option>
                      )
                  )}
                </Field>
              </div>
            </div>
            <button className="save-button mb-5" type="submit">
              Kaydet
            </button>
            {languages !== null && (
              <div className="anim-fadein languages-list row gap-3">
                {languages.map((language: any) => {
                  return (
                    <LanguageCard
                      language={language}
                      setLanguages={setLanguages}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Languages;
