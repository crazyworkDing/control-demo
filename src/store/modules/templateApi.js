// import templateList from "@/views/rule/template/even-template-data/template-list-6.json";
import { message } from 'ant-design-vue'
import { queryQuota, deleteQuota, addQuota, editQuota } from '@/api/template.js'

export default {
  namespaced: true,
  state: {
    templateList: [],
    loading: false,
    currentItem: null,
    submitNow: Date.now()
  },
  mutations: {
    queryTemplateList(state, list) {
      state.templateList = list
    },
    changeLoadingStatus(state, value) {
      state.loading = value;
    },

    setCurrentItem(state, item) {
      state.currentItem = item
    },
    changeSubmitNow(state) {
      state.submitNow = Date.now();
    }
  },
  actions: {
    queryTemplateList({ commit }, index) {
      return new Promise((resolve, reject) => {
        commit('changeLoadingStatus', true);
        queryQuota({ templateCode: index }).then(response => {
          if (response.success) {
            commit('queryTemplateList', response.result);
            commit('changeLoadingStatus', false);
            resolve()
          } else {
            message.error(response.message);
            const errorMessage = Error(response.message);
            reject(errorMessage)
          }

        }).catch(error => {
          reject(error)
        })
      })
    },


    addItem({ dispatch }, item) {
      return new Promise((resolve, reject) => {
        addQuota(item).then(response => {
          if (response.success) {
            message.success(response.message);
            dispatch('queryTemplateList', item.indicator.templateCode)
            resolve()
          } else {
            message.error(response.message);
            const errorMessage = Error(response.message);
            reject(errorMessage)
          }

        }).catch(error => {
          reject(error)
        })
      })
    },


    editItem({ dispatch }, item) {
      return new Promise((resolve, reject) => {
        editQuota(item).then(response => {
          if (response.success) {
            message.success(response.message);
            dispatch('queryTemplateList', item.indicator.templateCode)
            resolve()
          } else {
            message.error(response.message);
            const errorMessage = Error(response.message);
            reject(errorMessage)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },


    removeItem({ dispatch }, item) {
      return new Promise((resolve, reject) => {
        deleteQuota({ id: item.id }).then(response => {
          if (response.success) {
            message.success(response.message);
            dispatch('queryTemplateList', item.indicator.templateCode)
            resolve()
          } else {
            message.error(response.message);
            const errorMessage = Error(response.message);
            reject(errorMessage)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },


    setCurrentItem({ commit }, item) {
      commit('setCurrentItem', item)
    },
    changeSubmitNow({ commit }) {
      commit('changeSubmitNow')
    },

    initItem({ commit }, index) {
      let indicator = {
        name: '',
        number: '',
        business: {
          key: '',
          name: ''
        },
        remark: '',
        type: '1',
        templateCode: index
      };
      let templateMap = {
        '2': {
          new: true,
          entity: {
            id: null,
            name: null
          },
          entityFilters: [],

          timeLength: 1,
          timeUnit: {
            id: null,
            name: null
          },
          target: "累计数量",
          targetFilters: []
        },
        '4': {
          key: null,
          new: true,
          entity: {
            id: null,
            name: null
          },
          entityFilters: [],

          timeLength: 1,
          timeUnit: {
            id: null,
            name: null
          },
          target: {
            id: null,
            name: ''
          },
          targetFilters: []
        },
        '6': {
          new: true,
          entity: {
            id: null,
            name: ''
          },
          time1: {
            id: null,
            name: ''
          },
          target1: {
            id: null,
            name: ''
          },
          operator: {
            id: null,
            name: ''
          },
          time2: {
            id: null,
            name: ''
          },
          target2: {
            id: null,
            name: ''
          }
        },
        '8': {
          new: true,
          entity: {
            id: null,
            name: ''
          },
          time1: {
            id: null,
            name: ''
          },
          target1: {
            id: null,
            name: ''
          },
          operator: {
            id: null,
            name: ''
          },
          time2: {
            id: null,
            name: ''
          },
          target2: {
            id: null,
            name: ''
          }
        },
        '10': {
          new: true,
          entity: {
            id: null,
            name: ''
          },
          time1: {
            id: null,
            name: ''
          },
          target1: {
            id: null,
            name: ''
          },
          operator: {
            id: null,
            name: ''
          },
          time2: {
            id: null,
            name: ''
          },
          target2: {
            id: null,
            name: ''
          }
        },
        '12': {
          new: true,
          entity: {
            id: null,
            name: ''
          },
          timeLength: '',
          timeUnit: {
            id: null,
            name: ''
          },
          target: {
            id: null,
            name: ''
          },
          func: {
            id: null,
            name: ''
          }
        }
      }

      let template = templateMap[index]

      commit('setCurrentItem', { indicator, template })
    }
  }
}