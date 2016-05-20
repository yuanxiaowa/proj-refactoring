module.exports = {
  index: {
    main: {
      menus: [{
        name: '首页',
        icon: 'home',
        link: 'home.html'
      }, {
        name: '项目管理',
        icon: 'cogs',
        children: [{
          link: '',
          text: '项目基本信息'
        }, {
          link: '',
          text: '项目成员'
        }, {
          link: '',
          text: '项目合同'
        }, {
          link: '',
          text: '项目进度'
        }, {
          link: '',
          text: '材料总量计划'
        }]
      }, {
        name: '采购管理',
        icon: 'shopping-cart',
        children: [{
          link: '',
          text: '材料采购计划'
        }, {
          link: '',
          text: '采购单'
        }, {
          link: '',
          text: '比价'
        }, {
          link: '',
          text: '订单列表、订单详情页'
        }, {
          link: '',
          text: '订单变更'
        }]
      }, {
        name: '仓储管理',
        icon: 'barcode',
        children: [{
          link: '',
          text: '待收货'
        }, {
          link: '',
          text: '收货单'
        }, {
          link: '',
          text: '退货单'
        }, {
          link: '',
          text: '仓储库存'
        }, {
          link: '',
          text: '出库管理'
        }, {
          link: '',
          text: '资产处置'
        }, {
          link: '',
          text: '库存盘点'
        }]
      }, {
        name: '付款管理',
        icon: 'money',
        children: [{
          link: '',
          text: '未结清'
        }, {
          link: '',
          text: '结算申请'
        }, {
          link: '',
          text: '付款申请'
        }, {
          link: '',
          text: '订单统计'
        }, {
          link: '',
          text: '付款记录'
        }, {
          link: '',
          text: '预警功能'
        }]
      }, {
        name: '采购报表',
        icon: 'file-alt',
        children: [{
          link: '',
          text: '分公司供应商'
        }, {
          link: '',
          text: '往来供应商'
        }, {
          link: '',
          text: '供应商交易信息'
        }, {
          link: '',
          text: '集团供应商'
        }, {
          link: '',
          text: '供应商行为记录'
        }]
      }, {
        name: '供应商管理',
        icon: 'user-md',
        children: [{
          link: '',
          text: '个人配置'
        }, {
          link: '',
          text: '角色管理'
        }, {
          link: '',
          text: '页面配置'
        }, {
          link: '',
          text: '组织及人员'
        }]
      }, {
        name: '工作流配置',
        icon: 'sitemap',
        link: ''
      }]
    }
  },
  permission: {
    index: {
      items: [
        [{
          name: '编号',
          value: '0101'
        }, {
          name: '创建人',
          value: '李起光'
        }],
        [{
          name: '禁用',
          value: '是'
        }, {
          name: '上级权限',
          value: '项目管理'
        }, {
          name: '备注',
          value: '查看项目基本信息'
        }],
        [{
          name: '编辑日期',
          value: '2016-5-5'
        }, {
          name: '创建日期',
          value: '2016-5-5'
        }]
      ]
    }
  }
}
