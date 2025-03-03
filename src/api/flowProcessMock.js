import requestUtils from './http/request';

export function save(param) {
    return requestUtils.post({
        url: '/flow/chain/saveFlowChain',
        data: param
    })
}

export function getFlowChainList(param) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                    data: {
                        current: 1,
                        optimizeCountSql: true,
                        orders: [],
                        pages: 1,
                        records: [{
                            allNodeInfo: "{\"7429e1db4ff5\":{\"id\":\"7429e1db-4ff5-468b-9459-0e4e124e63fd\",\"name\":\"秒杀流程开始节点\",\"className\":\"SecKillStartNode\",\"type\":\"START\",\"dynamicParams\":[]},\"83d9d693303f\":{\"id\":\"83d9d693-303f-4606-b85d-f0a99e6aedd0\",\"name\":\"秒杀流程结束节点\",\"className\":\"SecKillEndNode\",\"type\":\"END\",\"dynamicParams\":[]},\"2a8416a15145\":{\"id\":\"2a8416a1-5145-401c-824d-f1ff4413cbda\",\"name\":\"日志节点\",\"className\":\"LogNode\",\"type\":\"COMMON\",\"dynamicParams\":[]},\"4af1636af42c\":{\"id\":\"4af1636a-f42c-4f19-afcb-81230d63ad91\",\"name\":\"商品限量节点\",\"className\":\"ProductLimitNode\",\"type\":\"COMMON\",\"dynamicParams\":[]},\"d3d819297ec4\":{\"id\":\"d3d81929-7ec4-4ead-8afd-0a93e702ec70\",\"name\":\"秒杀节点\",\"className\":\"SecKillNode\",\"type\":\"COMMON\",\"dynamicParams\":[{\"paramName\":\"limit\",\"paramValue\":\"2\"}]},\"66fe41518728\":{\"id\":\"66fe4151-8728-4efb-b750-5e866ec1fd5e\",\"name\":\"商品限量节点\",\"className\":\"ProductLimitNode\",\"type\":\"COMMON\",\"dynamicParams\":[{\"paramName\":\"stock\",\"paramValue\":\"1\"}]},\"c5710d49ce62\":{\"id\":\"c5710d49-ce62-4daf-bc44-b44924d91f9a\",\"name\":\"日志节点\",\"className\":\"LogNode\",\"type\":\"COMMON\",\"dynamicParams\":[{\"paramName\":\"limit\",\"paramValue\":\"222\"}]}}",
                            applicationName: "stock-lock",
                            chainDesc: "秒杀",
                            chainName: "PreLockStockFlow",
                            createTime: 1740938180000,
                            elData: "THEN(node(\"SecKillStartNode\"),node(\"SecKillNode\"),node(\"ProductLimitNode\"),node(\"LogNode\"),node(\"SecKillEndNode\"));",
                            enable: 1,
                            id: 1894723586,
                            jsonData: "{\"nodes\":[{\"id\":\"7429e1db-4ff5-468b-9459-0e4e124e63fd\",\"type\":\"circle\",\"x\":400,\"y\":480,\"properties\":{\"name\":\"SecKillStartNode\",\"type\":\"START\"},\"text\":{\"x\":400,\"y\":480,\"value\":\"秒杀流程开始节点\"}},{\"id\":\"83d9d693-303f-4606-b85d-f0a99e6aedd0\",\"type\":\"circle\",\"x\":520,\"y\":80,\"properties\":{\"name\":\"SecKillEndNode\",\"type\":\"END\"},\"text\":{\"x\":520,\"y\":80,\"value\":\"秒杀流程结束节点\"}},{\"id\":\"d3d81929-7ec4-4ead-8afd-0a93e702ec70\",\"type\":\"rect\",\"x\":440,\"y\":340,\"properties\":{\"name\":\"SecKillNode\",\"type\":\"COMMON\"},\"text\":{\"x\":440,\"y\":340,\"value\":\"秒杀节点\"}},{\"id\":\"66fe4151-8728-4efb-b750-5e866ec1fd5e\",\"type\":\"rect\",\"x\":340,\"y\":220,\"properties\":{\"name\":\"ProductLimitNode\",\"type\":\"COMMON\"},\"text\":{\"x\":340,\"y\":220,\"value\":\"商品限量节点\"}},{\"id\":\"c5710d49-ce62-4daf-bc44-b44924d91f9a\",\"type\":\"rect\",\"x\":660,\"y\":240,\"properties\":{\"name\":\"LogNode\",\"type\":\"COMMON\"},\"text\":{\"x\":660,\"y\":240,\"value\":\"日志节点\"}}],\"edges\":[{\"id\":\"ab1d5d61-bbd3-43d1-aaba-5decbb9c116b\",\"type\":\"line\",\"sourceNodeId\":\"7429e1db-4ff5-468b-9459-0e4e124e63fd\",\"targetNodeId\":\"d3d81929-7ec4-4ead-8afd-0a93e702ec70\",\"startPoint\":{\"x\":400,\"y\":430},\"endPoint\":{\"x\":440,\"y\":380},\"properties\":{}},{\"id\":\"e7aff918-b2c9-46bb-bec9-c42d37674249\",\"type\":\"line\",\"sourceNodeId\":\"d3d81929-7ec4-4ead-8afd-0a93e702ec70\",\"targetNodeId\":\"66fe4151-8728-4efb-b750-5e866ec1fd5e\",\"startPoint\":{\"x\":440,\"y\":300},\"endPoint\":{\"x\":340,\"y\":260},\"properties\":{}},{\"id\":\"5edebd53-38c3-4b8d-9d8e-d15de7a97377\",\"type\":\"line\",\"sourceNodeId\":\"66fe4151-8728-4efb-b750-5e866ec1fd5e\",\"targetNodeId\":\"c5710d49-ce62-4daf-bc44-b44924d91f9a\",\"startPoint\":{\"x\":390,\"y\":220},\"endPoint\":{\"x\":610,\"y\":240},\"properties\":{}},{\"id\":\"ed780e9d-4465-4284-8356-544a8124f708\",\"type\":\"line\",\"sourceNodeId\":\"c5710d49-ce62-4daf-bc44-b44924d91f9a\",\"targetNodeId\":\"83d9d693-303f-4606-b85d-f0a99e6aedd0\",\"startPoint\":{\"x\":660,\"y\":200},\"endPoint\":{\"x\":520,\"y\":130},\"properties\":{}}]}",
                            nodeDynamicParamsMap: "{\"LogNode\":{\"limit\":\"222\"},\"ProductLimitNode\":{\"stock\":\"1\"},\"SecKillNode\":{\"limit\":\"2\"}}",
                            updateTime: 1740958360000
                        }], searchCount: true, "size": 10, "total": 1
                    }
                }
            );
        }, 500);
    });
}

export function getFlowChainById(param) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                    data: {
                        allNodeInfo: "{\"7429e1db4ff5\":{\"id\":\"7429e1db-4ff5-468b-9459-0e4e124e63fd\",\"name\":\"秒杀流程开始节点\",\"className\":\"SecKillStartNode\",\"type\":\"START\",\"dynamicParams\":[]},\"83d9d693303f\":{\"id\":\"83d9d693-303f-4606-b85d-f0a99e6aedd0\",\"name\":\"秒杀流程结束节点\",\"className\":\"SecKillEndNode\",\"type\":\"END\",\"dynamicParams\":[]},\"2a8416a15145\":{\"id\":\"2a8416a1-5145-401c-824d-f1ff4413cbda\",\"name\":\"日志节点\",\"className\":\"LogNode\",\"type\":\"COMMON\",\"dynamicParams\":[]},\"4af1636af42c\":{\"id\":\"4af1636a-f42c-4f19-afcb-81230d63ad91\",\"name\":\"商品限量节点\",\"className\":\"ProductLimitNode\",\"type\":\"COMMON\",\"dynamicParams\":[]},\"d3d819297ec4\":{\"id\":\"d3d81929-7ec4-4ead-8afd-0a93e702ec70\",\"name\":\"秒杀节点\",\"className\":\"SecKillNode\",\"type\":\"COMMON\",\"dynamicParams\":[{\"paramName\":\"limit\",\"paramValue\":\"2\"}]},\"66fe41518728\":{\"id\":\"66fe4151-8728-4efb-b750-5e866ec1fd5e\",\"name\":\"商品限量节点\",\"className\":\"ProductLimitNode\",\"type\":\"COMMON\",\"dynamicParams\":[{\"paramName\":\"stock\",\"paramValue\":\"1\"}]},\"c5710d49ce62\":{\"id\":\"c5710d49-ce62-4daf-bc44-b44924d91f9a\",\"name\":\"日志节点\",\"className\":\"LogNode\",\"type\":\"COMMON\",\"dynamicParams\":[{\"paramName\":\"limit\",\"paramValue\":\"222\"}]}}",
                        applicationName: "stock-lock",
                        chainDesc: "秒杀",
                        chainName: "PreLockStockFlow",
                        createTime: 1740938180000,
                        elData: "THEN(node(\"SecKillStartNode\"),node(\"SecKillNode\"),node(\"ProductLimitNode\"),node(\"LogNode\"),node(\"SecKillEndNode\"));",
                        enable: 1,
                        id: 1894723586,
                        jsonData: "{\"nodes\":[{\"id\":\"7429e1db-4ff5-468b-9459-0e4e124e63fd\",\"type\":\"circle\",\"x\":400,\"y\":480,\"properties\":{\"name\":\"SecKillStartNode\",\"type\":\"START\"},\"text\":{\"x\":400,\"y\":480,\"value\":\"秒杀流程开始节点\"}},{\"id\":\"83d9d693-303f-4606-b85d-f0a99e6aedd0\",\"type\":\"circle\",\"x\":520,\"y\":80,\"properties\":{\"name\":\"SecKillEndNode\",\"type\":\"END\"},\"text\":{\"x\":520,\"y\":80,\"value\":\"秒杀流程结束节点\"}},{\"id\":\"d3d81929-7ec4-4ead-8afd-0a93e702ec70\",\"type\":\"rect\",\"x\":440,\"y\":340,\"properties\":{\"name\":\"SecKillNode\",\"type\":\"COMMON\"},\"text\":{\"x\":440,\"y\":340,\"value\":\"秒杀节点\"}},{\"id\":\"66fe4151-8728-4efb-b750-5e866ec1fd5e\",\"type\":\"rect\",\"x\":340,\"y\":220,\"properties\":{\"name\":\"ProductLimitNode\",\"type\":\"COMMON\"},\"text\":{\"x\":340,\"y\":220,\"value\":\"商品限量节点\"}},{\"id\":\"c5710d49-ce62-4daf-bc44-b44924d91f9a\",\"type\":\"rect\",\"x\":660,\"y\":240,\"properties\":{\"name\":\"LogNode\",\"type\":\"COMMON\"},\"text\":{\"x\":660,\"y\":240,\"value\":\"日志节点\"}}],\"edges\":[{\"id\":\"ab1d5d61-bbd3-43d1-aaba-5decbb9c116b\",\"type\":\"line\",\"sourceNodeId\":\"7429e1db-4ff5-468b-9459-0e4e124e63fd\",\"targetNodeId\":\"d3d81929-7ec4-4ead-8afd-0a93e702ec70\",\"startPoint\":{\"x\":400,\"y\":430},\"endPoint\":{\"x\":440,\"y\":380},\"properties\":{}},{\"id\":\"e7aff918-b2c9-46bb-bec9-c42d37674249\",\"type\":\"line\",\"sourceNodeId\":\"d3d81929-7ec4-4ead-8afd-0a93e702ec70\",\"targetNodeId\":\"66fe4151-8728-4efb-b750-5e866ec1fd5e\",\"startPoint\":{\"x\":440,\"y\":300},\"endPoint\":{\"x\":340,\"y\":260},\"properties\":{}},{\"id\":\"5edebd53-38c3-4b8d-9d8e-d15de7a97377\",\"type\":\"line\",\"sourceNodeId\":\"66fe4151-8728-4efb-b750-5e866ec1fd5e\",\"targetNodeId\":\"c5710d49-ce62-4daf-bc44-b44924d91f9a\",\"startPoint\":{\"x\":390,\"y\":220},\"endPoint\":{\"x\":610,\"y\":240},\"properties\":{}},{\"id\":\"ed780e9d-4465-4284-8356-544a8124f708\",\"type\":\"line\",\"sourceNodeId\":\"c5710d49-ce62-4daf-bc44-b44924d91f9a\",\"targetNodeId\":\"83d9d693-303f-4606-b85d-f0a99e6aedd0\",\"startPoint\":{\"x\":660,\"y\":200},\"endPoint\":{\"x\":520,\"y\":130},\"properties\":{}}]}",
                        updateTime: 1740958360000
                    }
                }
            );
        }, 500);
    });
}

export function getProcessNodeList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                    data: [
                        {
                            type: "diamond",
                            text: "汇总节点",
                            label: "汇总节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "SummaryNode",
                                type: "SUMMARY"
                            }
                        },
                        {
                            type: "diamond",
                            text: "选择节点",
                            label: "选择节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "SwitchNode",
                                type: "SWITCH"
                            }
                        },
                        {
                            type: "diamond",
                            text: "并行节点",
                            label: "并行节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "WhenNode",
                                type: "WHEN"
                            }
                        },
                        {
                            type: "diamond",
                            text: "黑名单判断节点",
                            label: "黑名单判断节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "BlackFilterNode",
                                type: "IF"
                            }
                        },
                        {
                            type: "circle",
                            text: "秒杀流程结束节点",
                            label: "秒杀流程结束节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "SecKillEndNode",
                                type: "END"
                            }
                        },
                        {
                            type: "diamond",
                            text: "商品是否存在判断节点",
                            label: "商品是否存在判断节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "ProductExistJudgeNode",
                                type: "IF"
                            }
                        },
                        {
                            type: "rect",
                            text: "日志节点",
                            label: "日志节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "LogNode",
                                type: "COMMON"
                            }
                        },
                        {
                            type: "rect",
                            text: "商品限量节点",
                            label: "商品限量节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "ProductLimitNode",
                                type: "COMMON"
                            }
                        },
                        {
                            type: "rect",
                            text: "秒杀节点",
                            label: "秒杀节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "SecKillNode",
                                type: "COMMON"
                            }
                        },
                        {
                            type: "circle",
                            text: "秒杀流程开始节点",
                            label: "秒杀流程开始节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "SecKillStartNode",
                                type: "START"
                            }
                        },
                        {
                            type: "rect",
                            text: "门店限量节点",
                            label: "门店限量节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "StoreLimitNode",
                                type: "COMMON"
                            }
                        },
                        {
                            type: "rect",
                            text: "用户限量节点",
                            label: "用户限量节点",
                            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
                            properties: {
                                name: "UserLimitNode",
                                type: "COMMON"
                            }
                        },
                    ]
                }
            );
        }, 500);
    });
}


export function updateFlowChain(param) {
    return requestUtils.post({
        url: '/flow/chain/updateFlowChain',
        data: param
    })
}

export function updateFlowChainStatus(param) {
    return requestUtils.post({
        url: '/flow/chain/updateFlowChainStatus',
        data: param
    })
}

//node相关
export function getBizServiceList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                    data: ["stock-lock","trade-order","trade-pay"]
                }
            );
        }, 500);
    });
}
