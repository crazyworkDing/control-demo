import { getAction, postAction, putAction, deleteAction } from "./manage";
// 注册接口
const registerUser = (data) => postAction('/sys/user/register', data)
const loginUser = (data) => postAction('/sys/login', data)
const getRouter = (data) => getAction('/sys/permission/list', data)
const saveToDraft = (data) => postAction('/sys/user/draft', data);
const findDraft = (data) => postAction('/sys/draft', data);
const getDepart = (data) => getAction('/sys/organ/list', data);
const changeUser = (data) => putAction('/sys/user/frozenBatch', data);
const auditData = (data) => putAction('/sys/process/editForjb',data);
const editOrgan = (data) => putAction('/sys/organ/edit', data);
const getTasks = (data) => getAction('/sys/process/processlistForMe', data);
//获取城市接口：
const getCity = (data) => getAction('/province/zxProvince/rootList', data);
//删除文件名称
const removeFile = (data) => deleteAction('/zx/common/fileDelete', data);
export {
  registerUser,
  loginUser,
  getRouter,
  saveToDraft,
  findDraft,
  getDepart,
  changeUser,
  getCity,
  editOrgan,
  auditData,
  getTasks,
  removeFile
}