<template>
  <div class="drawAreaUpdate">
    <div class="containerUpdate" ref="container"></div>
    <div class="operateAreaUpdate">
      <h1>流程详情信息</h1>
      <a-select
          v-model:value="currentService"
          show-search
          placeholder="选择流程挂载的服务名称"
          style="width: 100%"
          :options="bizServiceList"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
      ></a-select>
      <br>
      <br>
      <a-input v-model:value="this.currentRowData.chainName" placeholder="请输入流程名称"/>
      <br>
      <br>
      <a-textarea v-model:value="this.currentRowData.chainDesc" placeholder="请输入流程描述" :rows="4"/>
      <br>
      <br>
      <h1>当前节点信息</h1>
      <br>
      <a-form
          :model="this.currentNodeInfo"
          name="basic"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 17 }"
          autocomplete="off"
      >
        <a-form-item
            label="节点名称:"
            name="NodeName"
        >
          <a-input disabled v-model:value="this.currentNodeInfo.name"/>
        </a-form-item>

        <a-form-item
            label="节点类名:"
            name="NodeClassName"
        >
          <a-input disabled v-model:value="this.currentNodeInfo.className"/>
        </a-form-item>
        <a-form-item label="节点类型:" name="NodeType">
          <a-input disabled v-model:value="this.currentNodeInfo.type"/>
        </a-form-item>

        <a-form-item
            label="节点参数:"
            name="NodeParam"
        >
          <a-form
              ref="formRef"
              name="dynamic_form_nest_item"
              :model="this.currentNodeInfo"
          >
            <a-space
                v-for="(param, index) in this.currentNodeInfo.dynamicParams"
                style="display: flex; margin-bottom: 5px"
                align="baseline"
            >
              <a-form-item
                  :name="['dynamicParams', index, 'paramName']"
                  :rules="{required: true,message: '请输入字段名称',}"
              >
                <a-input v-model:value="param.paramName" placeholder="参数字段名称"/>
              </a-form-item>
              :
              <a-form-item
                  :name="['dynamicParams', index, 'paramValue']"
                  :rules="{required: true,message: '请输入字段值',}"
              >
                <a-input v-model:value="param.paramValue" placeholder="参数字段值"/>
              </a-form-item>

              <MinusCircleOutlined @click="removeParam(param)"/>
            </a-space>
            <a-form-item>
              <a-button type="dashed" block @click="addParam">
                <PlusOutlined/>
                添加参数
              </a-button>
            </a-form-item>
            <a-button type="primary" @click="updateFlow" ghost>修改流程</a-button>
          </a-form>
        </a-form-item>
      </a-form>

    </div>
  </div>
</template>
<script>
//样式
import "@logicflow/core/dist/style/index.css";
import '@logicflow/extension/lib/style/index.css'
import LogicFlow from "@logicflow/core";
import {
  Control,
  DndPanel,
  Highlight,
  InsertNodeInPolyline,
  Menu,
  MiniMap,
  SelectionSelect,
  Snapshot
} from "@logicflow/extension";
import {getBizServiceList, getProcessNodeList, updateFlowChain,getFlowChainById} from "../../../api/flowProcess.js";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
  components: {PlusOutlined, MinusCircleOutlined},

  //初次加载时候 挂载
  mounted() {
    this.loadData().then(() => {
      this.init();
    });
  },

  methods: {
    //加载业务节点
    async loadData() {
      try {
        if (this.$route.params.id) {
          this.rowId = this.$route.params.id;
        }
        //获取流程节点
        const businessNodeList = await getProcessNodeList();
        this.businessNodeList = businessNodeList.data;

        //获取已经注册的服务
        const bizServiceList = await getBizServiceList();
        if(bizServiceList.data!==null){
          bizServiceList.data.forEach(item => {
            this.bizServiceList.push({
              value: item,
              label: item
            });
          });
        }
        //获取指定id的流程信息
        const flowChainResp = await getFlowChainById(this.rowId);
        this.currentRowData = flowChainResp.data;

        //初始化当前业务服务值
        this.currentService = this.currentRowData.applicationName;
      } catch (error) {
        console.error('Error fetching node list:', error);
      }
    },

    init() {
      //初始化
      this.lf = new LogicFlow({
        //插件注册
        plugins: [Highlight, DndPanel, Menu, Control, MiniMap, SelectionSelect, InsertNodeInPolyline, Snapshot],
        container: this.$refs.container,
        //是否显示网格
        grid: true,
        stopMoveGraph: true,
        //开启快捷键
        keyboard: {
          enabled: true,
        },
        //边类型 'line' | 'polyline' | 'bezier'
        edgeType: 'line',
        //对齐线 只有网格属性打开才能显示对齐线
        snapline: true,
      });
      //自定义对齐线样式
      this.lf.setTheme({
        snapline: {
          stroke: '#1E90FF', // 对齐线颜色
          strokeWidth: 1, // 对齐线宽度
        },
      })
      this.lf.extension.selectionSelect.openSelectionSelect();
      this.lf.extension.selectionSelect.setSelectionSense(false, false);
      this.lf.extension.dndPanel.setPatternItems(this.businessNodeList);
      this.lf.render();
      //节点被单击
      this.lf.on("node:click", (data) => {
        this.currentNodeInfo = this.getNodeInfoByNodeId(data.data.id)
      });

      //节点被添加
      this.lf.on("node:dnd-add", (data) => {
        const nodeInfo = this.createNodeInfo(data);
        this.putToAllNodeInfo(nodeInfo)
      });
      // 节点被删除
      this.lf.on("node:delete", (data) => {
        this.removeNodeByNode(data)
      });
      //初始化图数据
      this.loadGraphData();
      //渲染反序列化加载所有节点信息
      this.loadAllNodeData();
    },
    //渲染图数据
    loadGraphData() {
        if (this.currentRowData.jsonData !== null && this.currentRowData.jsonData !== '') {
          const graphData = JSON.parse(this.currentRowData.jsonData);
          this.lf.render(graphData);
          this.lf.translateCenter();
        }
    },
    //渲染反序列化加载所有节点信息
    loadAllNodeData() {
        if (this.currentRowData.allNodeInfo !== null && this.currentRowData.allNodeInfo !== '') {
            this.allNodeInfo = JSON.parse(this.currentRowData.allNodeInfo);
        }
    },
    //修改流程方法
    updateFlow() {
      try {
        this.gridData = this.lf.getGraphData();

        //如果流程图为空则提示用户 并刷新当前页面
        if(this.gridData.nodes.length === 0 && this.gridData.edges.length === 0){
          alert("流程图不能为空")
          //刷新当前页面
          window.location.reload();
          return
        }
        //构建updateFlowChain方法需要的参数
        //将前端的流程图的边和结点json对象转为后端的语法树对象
        this.transformFeToBe(this.gridData)
        this.updateFlowChainRequest.id = this.currentRowData.id
        this.updateFlowChainRequest.chainName = this.currentRowData.chainName
        this.updateFlowChainRequest.chainDesc = this.currentRowData.chainDesc
        this.updateFlowChainRequest.enable = this.currentRowData.enable
        this.updateFlowChainRequest.applicationName = this.currentService
        this.updateFlowChainRequest.jsonData = JSON.stringify(this.gridData);
        this.updateFlowChainRequest.allNodeInfo = JSON.stringify(this.allNodeInfo);

        //清空画布
        this.lf.clearData()

        //调用修改流程方法
        updateFlowChain(this.updateFlowChainRequest).then(resp => {
          if (resp != null &&resp.success) {
            alert("更新成功")
            //刷新当前页面
            window.location.reload();
          }
        })
      } catch (error) {
        console.error("请求失败，请检查网络或服务器状态", error);
      }
    },
    //将前端图json转为后的对象方法
    transformFeToBe(feObject) {
      // 转换nodes到nodeEntities
      if (feObject.nodes) {
        feObject.nodes.forEach(node => {
          const dynamicParams = {};
          if (this.allNodeInfo[this.getTinyNodeId(node.id)]) {
            const currentNodeInfo = this.allNodeInfo[this.getTinyNodeId(node.id)]
            const dynamicParamsArray =currentNodeInfo.dynamicParams
            if (dynamicParamsArray && dynamicParamsArray.length > 0) {
              dynamicParamsArray.forEach(param => {
                if(param.paramName !== null && param.paramName !== ''&&
                    param.paramValue !== null && param.paramValue !== ''){
                  dynamicParams[param.paramName] = param.paramValue;
                }else{
                  //把当前参数在当前节点的dynamicParams中删除
                  dynamicParamsArray.splice(dynamicParamsArray.findIndex(item => item.paramName === param.paramName), 1);
                }
              })
            }
          }
          this.updateFlowChainRequest.nodeEntities.push({
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

      // 转换edges到nodeEdges
      if (feObject.edges) {
        feObject.edges.forEach(edge => {
          let ifNodeFlag = false;
          let tag = '';
          if (edge.text !== undefined && edge.text !== null && edge.text.value !== "") {
            if (edge.text.value !== "true" && edge.text.value !== "false") {
              //switch 语句 设置 tag 才能判断
              tag = edge.text.value;
            } else {
              //if 节点 需要设置 ifNodeFlag判断符号
              ifNodeFlag = edge.text.value === "true";
            }
          }
          this.updateFlowChainRequest.nodeEdges.push({
            source: edge.sourceNodeId,
            target: edge.targetNodeId,
            ifNodeFlag: ifNodeFlag, // 假设没有特殊需求
            tag: tag // 可以根据需要设置
          });
        });
      }
    },
    removeParam(item) {
      const index = this.currentNodeInfo.dynamicParams.indexOf(item);
      if (index !== -1) {
        this.currentNodeInfo.dynamicParams.splice(index, 1);
      }
    },
    addParam() {
      this.currentNodeInfo.dynamicParams.push({
        paramName: '',
        paramValue: '',
      });
    },
    createNodeInfo(data) {
      return {
        id: data.data.id,
        name: data.data.text.value,
        className: data.data.properties.name,
        type: data.data.properties.type,
        dynamicParams: [],
      };
    },
    putToAllNodeInfo(nodeInfo) {
      const nodeId = this.getTinyNodeId(nodeInfo.id)
      this.allNodeInfo[nodeId] = nodeInfo
    },
    removeNodeByNode(nodeInfo) {
      const nodeId = this.getTinyNodeId(nodeInfo.data.id)
      delete this.allNodeInfo[nodeId]
    },
    getNodeInfoByNodeId(nodeIdOrigin) {
      const nodeId = this.getTinyNodeId(nodeIdOrigin)
      return this.allNodeInfo[nodeId]
    },
    getTinyNodeId(nodeId) {
      const parts = nodeId.split('-'); // 按-分割成数组
      return parts.slice(0, 2).join(''); // 取前两个部分并用-连接
    },

     handleChange (value) {
    },
     handleBlur(){
    },
     handleFocus (){
    },
     filterOption (option,input) {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
  },
  data() {
    return {
      gridData: {},
      businessNodeList: [],
      bizServiceList: [],
      lf: null,
      rowId: undefined,
      currentRowData: {},
      //后端需要的请求参数
      updateFlowChainRequest: {
        nodeEntities: [],
        nodeEdges: [],
        jsonData: '',
        allNodeInfo: '',
        id: 0,
        chainName: '',
        applicationName: '',
        chainDesc: '',
        enable: 0
      },
      allNodeInfo: {},
      currentNodeInfo: {},
      currentService:undefined
    }
  }
}
</script>
<style scoped>
.drawAreaUpdate {
  width: 100%;
  height: 95%;
  margin-top: 2%;
  border: #333333 solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.containerUpdate {
  width: 70%;
  height: 100%;
  border: #333333 solid 1px;
}

.operateAreaUpdate {
  width: 30%;
  height: 100%;
  border: #333333 solid 1px;
}
</style>