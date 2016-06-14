import 'bootstrapTable';
import 'modalRemote';
import 'orgLeft';
import render from 'render';
import OptionManager from 'optionManager';

render({
  num: 'sdfsdfsd',
  isfb: '是',
  mobile: '1599658754',
  email: '12585@sina.com',
  tel: '0512-647879',
  addr: '苏州市吴中区里湖镇',
  det: '江建集团   一分公司  一区 大区经理", "江建集团   一分公司  一区 项目经理 兼职',
  remark: 'mark'
});

new OptionManager({
  $btn: $('#role-edit'),
  title: '编辑角色成员',
  placeholder: '搜索用户',
  rightTitle: '被选中用户',
  url: 'data/detail-roles',
  onSubmited() {
    console.log('hello');
  }
});