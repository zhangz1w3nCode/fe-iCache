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
<!--      <a-input v-model:value="this.beObjectUpdate.applicationName" placeholder="请输入流程挂载的服务名称"/>-->
<!--      <br>-->
      <br>
      <a-input v-model:value="this.beObjectUpdate.chainName" placeholder="请输入流程名称"/>
      <br>
      <br>
      <a-textarea v-model:value="this.beObjectUpdate.chainDesc" placeholder="请输入流程描述" :rows="4"/>
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
                  :rules="{required: false,message: 'Missing param name',}"
              >
                <a-input v-model:value="param.paramName" placeholder="Param Name"/>
              </a-form-item>
              :
              <a-form-item
                  :name="['dynamicParams', index, 'paramValue']"
                  :rules="{required: false,message: 'Missing param value',}"
              >
                <a-input v-model:value="param.paramValue" placeholder="Param Value"/>
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
import {getBizServiceList, getProcessNodeList, updateFlowChain} from "../../../api/flowProcess.js";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
  components: {PlusOutlined, MinusCircleOutlined},

  //初次加载时候 挂载
  mounted() {
    this.loadData().then(() => {
      this.init(false);
    });
  },

  methods: {
    //加载业务节点
    async loadData() {
      try {
        const businessNodeList = await getProcessNodeList();
        this.businessNodeList = businessNodeList.data;

        const bizServiceList = await getBizServiceList();
        if(bizServiceList.data!==null){
          bizServiceList.data.forEach(item => {
            this.bizServiceList.push({
              value: item,
              label: item
            });
          });
        }
        console.log('获取流程节点列表成功')
        console.log('已经注册的服务列表', this.bizServiceList)
      } catch (error) {
        console.error('Error fetching node list:', error);
      }
    },

    init(isReload) {
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
      this.settingGraphData(isReload)
      this.currentService = this.rowData.applicationName;
      this.loadFLowChainUpdateInfo()
    },
    //渲染图数据
    settingGraphData(isReload) {
      if (this.$route.params.record) {
        this.rowData = JSON.parse(this.$route.params.record);
        //渲染加载
        if (this.rowData.jsonData !== null && this.rowData.jsonData !== '') {
          const graphData = JSON.parse(this.rowData.jsonData);
          this.lf.render(graphData);
          this.lf.translateCenter();
          console.log('渲染流程图成功')
        }
        console.log(this.allNodeInfo)
        if(isReload){
          return
        }
        if (this.rowData.allNodeInfo !== null && this.rowData.allNodeInfo !== '') {
            this.allNodeInfo = JSON.parse(this.rowData.allNodeInfo);
        }
      }
    },
    loadFLowChainUpdateInfo() {
      this.beObjectUpdate.id = this.rowData.id;
      this.beObjectUpdate.chainName = this.rowData.chainName;
      this.beObjectUpdate.chainDesc = this.rowData.chainDesc;
      this.beObjectUpdate.enable = this.rowData.enable;
    },
    //修改流程方法
    updateFlow() {
      this.gridData = this.lf.getGraphData();
      try {
        // console.log(this.gridData)
        // if(this.gridData.nodes.length === 0 && this.gridData.edges.length === 0){
        //   alert("流程图不能为空")
        //   this.init(true)
        //   return
        // }
        //将前端的流程图的边和结点json对象转为后端的语法树对象
        this.transformFeToBe(this.gridData)
        console.log("transToBeObjectUpdate")
        console.log(this.beObjectUpdate)

        //构建updateFlowChain方法需要的参数
        this.beObjectUpdate.applicationName = this.currentService
        this.beObjectUpdate.jsonData = JSON.stringify(this.gridData);
        this.beObjectUpdate.allNodeInfo = JSON.stringify(this.allNodeInfo);
        console.log(this.beObjectUpdate)

        //清空画布
        this.lf.clearData()
        //调用修改流程方法
        updateFlowChain(this.beObjectUpdate).then(resp => {
          if (resp != null && resp.data !== null) {
            console.log('修改流程成功')
            console.log(resp.data)
            const graphData = JSON.parse(resp.data.jsonData);
            console.log(graphData)
            //回显数据
            this.lf.render(graphData);
            this.lf.translateCenter();
            this.beObjectUpdate.id = resp.data.id;
            this.beObjectUpdate.applicationName = resp.data.applicationName;
            this.beObjectUpdate.chainName = resp.data.chainName;
            this.beObjectUpdate.chainDesc = resp.data.chainDesc;
            if (resp.data.allNodeInfo !== null && resp.data.allNodeInfo !== '') {
              this.allNodeInfo = JSON.parse(resp.data.allNodeInfo);
              this.beObjectUpdate.allNodeInfo = JSON.parse(resp.data.allNodeInfo);
            }
          }
        })
        //清空对象
        // this.beObjectUpdate = {
        //   nodeEntities: [],
        //   nodeEdges: [],
        //   jsonData: '',
        // };
        this.beObjectUpdate.nodeEntities = [];
        this.beObjectUpdate.nodeEdges = [];
        this.beObjectUpdate.jsonData = '';
        this.currentNodeInfo = {};

        console.log('after:',this.allNodeInfo)
      } catch (error) {
        console.error("请求失败，请检查网络或服务器状态", error);
      }
    },
    //对象转换方法


    transformFeToBe(feObject) {
      // 转换nodes到nodeEntities
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
          this.beObjectUpdate.nodeEntities.push({
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
          this.beObjectUpdate.nodeEdges.push({
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
      console.log(`selected ${value}`);
    },
     handleBlur(){
      console.log('blur');
    },
     handleFocus (){
      console.log('focus');
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
      rowData: {},
      beObjectUpdate: {
        nodeEntities: [],
        nodeEdges: [],
        jsonData: '',
        allNodeInfo: '',
        id: 0,
        chainName: '',
        applicationName: '',
        chainDesc: '',
        elData: '',
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