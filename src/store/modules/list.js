import { querySubjectList, queryObjectList } from '@/api/template'

const list = {
  state: {
    subjectList: [],
    objectList: []
  },
  mutations: {
    SET_SUBJECT_LIST: (state, subjectList) => {
      state.subjectList = subjectList
    },
    SET_OBJECT_LIST: (state, objectList) => {
      state.objectList = objectList
    }
  },
  actions: {
    UpdateSubjectList({ commit }) {
      return new Promise((resolve, reject) => {
        querySubjectList().then(response => {
          var subjectList = response.result.records
          commit('SET_SUBJECT_LIST', subjectList)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateObjectList({ commit }) {
      return new Promise((resolve, reject) => {
        queryObjectList().then(response => {
          var objectList = response.result.records
          commit('SET_OBJECT_LIST', objectList)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default list