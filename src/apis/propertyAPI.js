import axios from "axios";
import qs from "qs";

// 전체 매물 리스트
const getPropertyList = (pageNo, size) => {
  //GET: http://localhost/board/list?pageNo=1

  return axios.get("/Property", { params: { pageNo, size } });
};

// 유저 매물 리스트
const getUserPropertyList = () => {
  return axios.get("/Mypage/ManageMyProperty");
};

// 매물 썸네일 사진 다운로드
const propertyAttachDownload = (pnumber) => 
  //PathVariable로 데이터 전송
  axios.get("/pattach/" + pnumber, { responseType: "blob" });


// 매물 디테일 사진 다운로드
const detailPropertyAttachDownload = (ppnumber) => 
  axios.get("/detailPattach/" + ppnumber, { responseType: "blob" });


// 매물 삭제
const deleteProperty = (pnumber) => {
  return axios.delete("/deleteProperty/" + pnumber);
}

// 인기 매물 리스트
const getPopularPropertyList = () => {
  return axios.get("/popularProperty");
}

// 매물 데이터
const getPropertyData = (pnumber) => {
  return axios.get("/Property/" + pnumber);
};

// 댓글 삭제
const deletePropertyComment = (pnumber, ucnumber) => {
  return axios.delete(`/Property/${pnumber}/${ucnumber}`);
};

// 매물 신고
const postReportProperty = (report) => {
  console.log("report : " + report.rcontent);
    console.log("report : " + report.rPnumber);
  return axios.post("/createPropertyReport/" + report.rPnumber, qs.stringify(report));
}

// 매물 신고 리스트
const getReportList = () => {
  return axios.get("/Mypage/ReportFalseListing");
};


export default {
  getPropertyList,
  getUserPropertyList,
  propertyAttachDownload,
  deleteProperty,
  getPopularPropertyList,
  detailPropertyAttachDownload,
  getPropertyData,
  postReportProperty,
  getReportList
};
