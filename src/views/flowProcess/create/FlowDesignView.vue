<template>
  <div class="drawArea">
    <div class="container" ref="container">
    </div>
    <div class="operateArea">
      <h1>输入流程信息</h1>
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
      <a-input v-model:value="this.beObject.chainName" placeholder="请输入流程名称"/>
      <br>
      <br>
      <a-textarea v-model:value="this.beObject.chainDesc" placeholder="请输入流程描述" :rows="4"/>
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
          <a-input v-model:value="this.currentNodeInfo.name"/>
        </a-form-item>

        <a-form-item
            label="节点类名:"
            name="NodeClassName"
        >
          <a-input v-model:value="this.currentNodeInfo.className"/>
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

              <MinusCircleOutlined @click="removeUser(param)"/>
            </a-space>
            <a-form-item>
              <a-button type="dashed" block @click="addParam">
                <PlusOutlined/>
                添加参数
              </a-button>
            </a-form-item>
            <a-button type="primary" @click="saveFlow" ghost>保存流程</a-button>
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
import {PlusOutlined, MinusCircleOutlined,} from '@ant-design/icons-vue';


//插件组件
import LogicFlow from "@logicflow/core";
import {
  Highlight,
  DndPanel,
  Menu,
  Control,
  MiniMap,
  SelectionSelect,
  InsertNodeInPolyline,
  Snapshot
} from '@logicflow/extension';

//方法
import {getOnlineBizNameList, getProcessNodeList, save} from '../../../api/flowProcess.js';

export default {

  //注册组件
  components: {
    PlusOutlined,MinusCircleOutlined
  },

  //初次加载时候 挂载
  mounted() {
    this.loadData().then(() => {
      this.init();
    });
  },

  methods: {
    async loadData() {
      try {
        const businessNodeList = await getProcessNodeList();
        this.businessNodeList = businessNodeList.data;
        const bizServiceList = await getOnlineBizNameList();
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

    init() {
      //初始化
      this.lf = new LogicFlow({
        //插件注册 方式2
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
      //渲染加载
      this.lf.render();
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
      //节点被单击
      this.lf.on("node:click", (data) => {
        this.currentNodeInfo =this.getNodeInfoByNodeId(data.data.id)
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
    },

    //保存节点信息
    saveFlow() {
      this.gridData = this.lf.getGraphData();
      try {
        //this.transformFeToBe(this.gridData)
        //console.log(this.beObject)
         //清空画布
         //this.lf.clearData()
        //调用后端
        this.beObject.applicationName = this.currentService
        save(this.beObject).then(resp => {
          console.log(resp)
          if (resp != null && resp.success &&resp.data !== null) {
            console.log("流程创建成功")
            //const graphData = JSON.parse(resp.data.jsonData);
            //回显数据
            // this.lf.render(graphData);
            // this.lf.translateCenter();
            this.currentService = resp.data.applicationName;
            this.beObject.chainName = resp.data.chainName;
            this.beObject.chainDesc = resp.data.chainDesc;
          }else{
            console.log("流程创建成功")
          }
        })
        this.beObject = {
          nodeEntities: [],
          nodeEdges: [],
          jsonData: ''
        };
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

          if (this.allNodeInfo[this.getTinyNodeId(node.id)]) {
            const currentNodeInfo = this.allNodeInfo[this.getTinyNodeId(node.id)]
            const dynamicParamsArray =currentNodeInfo.dynamicParams
            if (dynamicParamsArray && dynamicParamsArray.length > 0) {
              dynamicParamsArray.forEach(param => {
                dynamicParams[param.paramName] = param.paramValue;
              })
            }
          }

          this.beObject.nodeEntities.push({
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
          this.beObject.nodeEdges.push({
            source: edge.sourceNodeId,
            target: edge.targetNodeId,
            ifNodeFlag: ifNodeFlag, // 假设没有特殊需求
            tag: tag // 可以根据需要设置
          });
        });
      }

      this.beObject.jsonData = JSON.stringify(feObject);
      this.beObject.allNodeInfo = JSON.stringify(this.allNodeInfo);
    },
    removeUser(item) {
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
        dynamicParams:[],
      };
    },
    putToAllNodeInfo(nodeInfo){
      const nodeId = this.getTinyNodeId(nodeInfo.id)
      this.allNodeInfo[nodeId] = nodeInfo
    },
    removeNodeByNode(nodeInfo){
      const nodeId = this.getTinyNodeId(nodeInfo.data.id)
      delete this.allNodeInfo[nodeId]
    },
    getNodeInfoByNodeId(nodeIdOrigin){
      const nodeId = this.getTinyNodeId(nodeIdOrigin)
      return this.allNodeInfo[nodeId]
    },
    getTinyNodeId(nodeId){
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
      lf: null,
      businessNodeList: [],
      beObject: {
        nodeEntities: [],
        nodeEdges: [],
        jsonData: '',
        allNodeInfo: '',
        chainName: '',
        applicationName: '',
        chainDesc: '',
        enable: 0
      },
      allNodeInfo:{},
      currentNodeInfo: {},
      currentService:undefined,
      bizServiceList: [],
    };
  },
};


</script>

<style scoped>
.drawArea {
  width: 100%;
  height: 95%;
  margin-top: 2%;
  border: #333333 solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 65%;
  height: 100%;
  border: #333333 solid 1px;
}

.operateArea {
  width: 35%;
  height: 100%;
  border: #333333 solid 1px;
}
</style>