import { useSelector } from "react-redux";
import { selectContent } from "../../../store/slices/contentSlice";
import VideoPlayer from "../../VideoPlayer/VideoPlayer";
import "./LectureVideo.css";

function LectureVideo({ setShowDetail }: any) {
  const content = useSelector(selectContent);

  return (
    <div className="lecture-video align-content-center">
      <div className="video-player">
        <VideoPlayer/>
      </div>
      <div className="lecture-video-detail d-flex align-items-center">
        <div
          className="col-lg-9 col-md-8 col-sm-9 col-xs-12"
          style={{ flex: "1" }}
        >
          <div className="video-title">
            <strong>{content.name}</strong>
          </div>
          <div className="d-flex justify-content-between">
            <text style={{ color: "grey" }}>Video - {content.duration} dk</text>
          </div>
        </div>
        <div>
          <button className="detail-button" onClick={() => setShowDetail(true)}>
            <strong>DETAY</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LectureVideo;
