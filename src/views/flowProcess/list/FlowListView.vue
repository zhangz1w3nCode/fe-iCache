<template>
  <div class="flowList">
    <a-button type="primary" @click="handleCreate" style="margin-bottom: 16px">新建流程</a-button>
    <a-modal
      v-model:visible="modalVisible"
      title="新建流程"
      @ok="handleSubmit"
    >
      <a-form layout="vertical">
        <a-form-item label="挂载服务">
          <a-select
            v-model:value="flowData.applicationName"
            show-search
            placeholder="请选择服务"
            :options="bizServiceList"
          />
        </a-form-item>
        <a-form-item label="流程名称">
          <a-input v-model:value="flowData.chainName" />
        </a-form-item>
        <a-form-item label="流程描述">
          <a-textarea v-model:value="flowData.chainDesc" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table 
      size="large" :columns="columns" :data-source="dataSource" bordered
             :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'title'">
        <span>
          {{ column.id }}
        </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'chainName'">
          {{ record.chainName }}
        </template>
        <template v-else-if="column.key === 'enable'">
        <span>
           <a-space direction="vertical">
            <a-switch :checked="record.enable===1" @change="handleEnableChange(record, $event)"/>
            </a-space>
        </span>
        </template>
        <template v-else-if="column.key === 'operators'">
          <a-tag v-for="op in operator"
                 :key="op"
                 :color=" op==='查看流程'?'blue':'green'"
                 @click="clickRow(record,op)">
           <span v-if="op === '查看流程'">
              <SearchOutlined/>
           </span>
            <span v-if="op === '编辑流程'">
              <SettingOutlined/>
           </span>
            {{ op }}
          </a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
//样式
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
import {getFlowChainList, getBizServiceList, updateFlowChainStatus,save} from '../../../api/flowProcess.js';
import {SmileOutlined, DownOutlined, SettingOutlined, SearchOutlined} from '@ant-design/icons-vue';

export default {
  //注册组件
  components: {
    SmileOutlined, DownOutlined, SettingOutlined, SearchOutlined
  },

  //初始化
  mounted() {
    this.loadData().then(() => {
    });
  },
  //全局参数
  data() {
    return {
      flowChainListRequest: {
        currentPage: 1,
        pageSize: 10
      },
      flowChainListResponse: {},
      columns: [
        {
          title: '流程ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '流程名称',
          dataIndex: 'chainName',
          key: 'chainName',
        },
        {
          title: '绑定业务',
          dataIndex: 'applicationName',
          key: 'applicationName',
        },
        {
          title: '流程状态',
          key: 'enable',
          dataIndex: 'enable',
        },
        {
          title: '其他操作',
          key: 'operators',
        },
      ],
      dataSource: [],
      bizServiceList: [],
      flowData: {
        applicationName: '',
        chainName: '',
        chainDesc: ''
      },
      modalVisible: false,
      operator: ['查看流程', '编辑流程'],
      modalQueryOpen: false,
      selectedQueryRecord: {},
      lf: {},
      allNodeInfo: {},
      nodeEntities: [],
    };
  },

  //方法列表
  methods: {
    async loadData() {
      try {
        const resp = await getFlowChainList(this.flowChainListRequest);
        this.flowChainListResponse = resp.data;
        console.log('获取流程列表成功')
        this.dataSource = resp.data.records;

        const bizServiceListResp = await getBizServiceList();
        this.bizServiceList = bizServiceListResp.data.map(item => ({ value: item, label: item }));
      } catch (error) {
        console.error('获取流程列表失败:', error);
      }
    },

    handleCreate() {
      this.modalVisible = true;
    },

    async handleSubmit() {
      try {
        await save(this.flowData);
        alert("添加成功")
        this.modalVisible = false;
        window.location.reload();
      } catch (error) {
        console.error('创建流程失败:', error);
      }
    },

    handleEnableChange(record, checked) {
      this.allNodeInfo =JSON.parse(record.allNodeInfo);
      this.getNodeEntities(record.jsonData)
      const param = {
        id: record.id,
        enable: checked ? 1 : 0,
        nodeEntities: this.nodeEntities,
      };
      updateFlowChainStatus(param).then(resp => {
        if (resp != null && resp.data !== null) {
          record.enable = resp.data.enable;
        }
      })

    },
    getNodeEntities(json){
      const feObject = JSON.parse(json);
      if (feObject.nodes) {
        feObject.nodes.forEach(node => {
          const dynamicParams = {};
          console.log('this.allNodeInfo', this.allNodeInfo)
          if (this.allNodeInfo[this.getTinyNodeId(node.id)]) {
            const currentNodeInfo = this.allNodeInfo[this.getTinyNodeId(node.id)]
            const dynamicParamsArray =currentNodeInfo.dynamicParams
            if (dynamicParamsArray && dynamicParamsArray.length > 0) {
              dynamicParamsArray.forEach(param => {
                dynamicParams[param.paramName] = param.paramValue;
              })
            }
          }
          this.nodeEntities.push({
            id: node.id,
            name: node.properties.name,
            label: node.text.value,
            nodeType: node.properties.type,
            dynamicParams: dynamicParams,
            x: node.x,
            y: node.y,
          });
        });
      }
    },
    clickRow(record, operatorType) {
      if (operatorType === '查看流程') {
        this.$router.push({
          name: 'flowQueryDetail',
          params: { record: JSON.stringify(record) }
        });
      }else if (operatorType === '编辑流程') {
        this.$router.push({
          name: 'flowGraphDetail',
          params: { id: record.id }
        });
      }
    },
    getTinyNodeId(nodeId){
      const parts = nodeId.split('-'); // 按-分割成数组
      return parts.slice(0, 2).join(''); // 取前两个部分并用-连接
    },
  },
};


</script>

<style scoped>
.flowList {
  width: 100%;
  height: 100%;
  margin-top: 2%;
}

[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>