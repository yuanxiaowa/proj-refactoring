# 插件文档

> 带?的参数代表可选参数

> 后台返回的json格式一般为
```json
{
  "success": Boolean,
  "msg": String,
  "data": Object
}
```
> 以下涉及到数据格式说明的一般数据只写data里面的


## 弹框

### 提示框 `$.alert(msg).then(onOk?)`
+ `msg`: 提示信息
+ `onOk?:function`: 点击确定按钮操作，返回 `false` 不关闭对话框

### 确认框 `$.confirm(msg, title?).then(onOk?,onCancel?)`
+ `msg`
+ `title?`: 标题
+ `onOk?:function`
+ `onCancel?:function`: 点击取消按钮操作

### 对话框 `new Dialog(options)`
- 选项 `options`
  + `title`
  + `content` 内容
  - `size:(enum|String)` 模态对话框大小，可为以下值
    + `Dialog.SIZENORMAL` 正常，默认
    + `Dialog.SIZELG` 大
    + `Dialog.SIZESM` 小
  - `btns:enum` 按钮类型，只能为以下类型
    + `Dialog.BTNOK` 确定，为默认
    + `Dialog.BTNCANCEL` 取消
    + `Dialog.BTNOKCANCEL` 确定取消
    + `false` 没有页脚
  - `btnsTxt:object` 按钮文本
    + `stxt` 确定按钮文本 默认为 保存
    + `ctxt` 取消按钮文本 默认为 取消
  + `remote` 远程地址
  + `backdrop` 遮罩是否显示
  + `onOk`
  + `onCancel`
- 事件
  + `inited.dialog` 对话框初始化后
  + `loaded.dialog` 对话框加载数据后
  + `shown.dialog` 对话框显示后
- 方法
  + `show()` 显示对话框
  + `hide()` 隐藏对话框
  + `load(url)` 加载内容
  + `setTitle` 设置对话框标题
  + `setContent(data)` 设置对话框内容
  + `getBody()` 获取对话框主体，为jQuery对象

### 点击按钮自动加载对话框
`<a data-modal-load="url">加载</a>`
> 通过 `$ele.data('dialog')` 获取到dialog对象。
> 点击确定，若对话框内有表单，会自动进行表单提交

- 属性
  - `data-modal-load` 地址
  - `data-modal-title` 标题
  - `data-modal-stxt` 确认按钮文本，默认为保存
  - `data-modal-ctxt` 取消按钮文本，默认为取消
  - `data-modal-bind` 默认为true，在内容加载完之后，若有表单，自动绑定表单校验，并在数据发送到后台成功后，关闭对话框
  - `data-modal-size:(enum|String)` 模态框大小，可为以下值(忽略大小写)或自定义
    - `normal`
    - `lg`
    - `sm`
  - `data-nocache` 是否要缓存页面，默认为缓存，需要禁用，改为true即可
- 事件
  - `loaded.modalremote` 内容加载完后
  - `ok.modalremote` 点击确定按钮后


## 表单校验与提交
表单校验一般把校验规则写在html标签属性中，如
`<input required="true" data-msg-required="字段非空">`

校验规则
* required 非空，且不能全为空格
* email 邮箱
* number 整数小数
* digits 纯数字
* equalTo 与某个表单控件的值相等
* any 指定名字的表单控件至少有一个有值
* mobile 手机
* tel 电话
* remote 远程校验
* url
* date
* dateISO
* minlength
* maxlength
* rangelength
* min
* max
* range
* step

使用 `formValidation($form,options)` 校验指定表单
> 表单使用异步方式进行提交，
> 地址为form标签上的action，
> 提交方式为form标签上的method，
> 请求头自动加上
```
Accept: application/json
Content-Type: application/json
```

+ $form 表单元素
- options 在标签验证不能满足要求时候，可以包含额外的校验规则，另外提供如下字段
  * `dataFormat(form)` 默认使用`form2json`格式化表单数据，可通过此方法重写
  * `onSubmitSuccess(data)` 后台返回成功的处理
  * `onSubmitError(error)` 后台返回失败的处理


## 数据渲染
使用mustache模板标签进行渲染

> 文档见 <https://github.com/janl/mustache.js>

`render(options)` 在页面只有一个标签时候，可使用这个方法进行渲染

`render(ele, options)` 使用指定元素标签进行渲染

- `ele`
  * `:number` 指定第几个
  * `:string` 指定选择器
  * `:Element` 指定dom元素
  * `:jQuery` 指定jQuery对象
- `options` 与 `$.ajax(options)` 的参数类似
  * `url` 数据地址
  * `type` 请求方式，默认为get
  * ...

## 左右选来选去的插件
引入 optionManager

```js
import OptionManager from 'optionManager';
var om = new OptionManager(options);
```
- `options`
  + `$btn:jQuery` 按钮
  + `title` 对话框标题
  + `rightTitle` 右边标题
  + `placeholder` 搜索框水印文本
  + `url` 数据获取地址，get请求，数据格式为
    ```
    {
      "left": [
        {
          "text": String,
          "value": Number
        },...
      ],
      "right": [
        {
          "text": String,
          "value": Number
        },...
      ]
    }
    ```
  + `urlSubmit` 数据提交地址，采用post方式提交，若无，则与`url`相同
  + `onSubmited:function` 提交成功后的操作
- 属性
  - `roles`
    + `setData(data)` 设置数据
    + `getResult()` 获取右边结果
- 方法
  + `submitData(data)` 提交数据，data格式如下
    ```
    [Number, ...]
    ```

## 多级联动
引入 linkage
```js
import Linkage from 'linkage';
new Linkage(options);
```
- `options` 选项
  + `$eles` select元素
  + `url` 数据获取地址
  + `id` 若需要初始化第一个下拉框，指明id，若无参数，传true即可
  + `initData:Array` 初始化数据，编辑时候用

get请求，请求格式
```
id=Number
```
返回格式
```json
[
  {
    "id": Number,
    "text": String
  }, ...
]
```

## 日期选择插件
引入 `bootstrapDatetimepicker`

使用方式
```js
$('[date]').datetimepicker()
```

> 文档见 <http://www.malot.fr/bootstrap-datetimepicker/>

## 树形菜单
引入 `zTree`

使用方式
```js
$.fn.zTree.init($ele, settings, zNodes)
```
+ $ele
+ settings
+ zNodes
  ```json
  [
    {
      name: String,
      open: Boolean,
      children: Array
    }, ...
  ]
    ```

> 文档见 <http://www.malot.fr/bootstrap-datetimepicker/>

## 下拉框插件
引入 `select2`

使用方式
```js
$ele.select2();
```

> 文档见 <https://select2.github.io/options.html>

## 文件上传插件
引入 webUploader

使用方式
```js
import WebUploader from 'webUploader';
var uploader = WebUploader.create({
  auto: true,
  swf: '/public/lib/webUploader/0.1.8/Uploader.swf',
  pick: '#ele',
  server: 'url',
  accept: {
    extensions: 'gif,jpg,jpeg,bmp,png',
    mimeTypes: 'image/*'
  }
}
```

> 文档见 <http://fex.baidu.com/webuploader/doc/index.html>


## 表格添加数据插件
引入 `tableEdit`

使用方式
```js
import TableEdit from 'tableEdit';

var te = new TableEdit(options);
```

`options` 选项
  - `$table` 表格
  - `$btnAdd` 添加按钮，jquery对象或者选择器
  - `prefix` name前缀，默认为items
  - `url` 需要对表格进行初始化的url地址
    - 数据格式为
          [
            [
              : String
              或
              {
                text: String|Number,
                value: String|Number
              }, ...
            ]
            {
              name: 
                : String
                或
                {
                  text: String|Number,
                  value: String|Number
                }
            }, ...

          ]
        > 自动生成的不包括
  - `columns:Array`
    - `type:enum`
      - `genNum` 自动生成编号
      - `input` 文本框
      - `select` 下拉框
      - `addon` 右边带有个+号的输入框
      - `delBtn` 删除按钮
    - `editable:Boolean?` 是否可编辑，默认为true
    - `data:(String|Array)` 数据
    - `name` 表单控件的name值
    - `attrs` 添加在表单控件上的属性
    - `hasHidden` 是否有隐藏域
    - `formatter(name, index, value?, row?)` 自定义单元格式
      - `name` name值
      - `index` 当前处于第几列
      - `value` 对象, 简单类型会自动封装成 `{value: value}` 形式
      - `row` 当前行数据

> 最后表单控件的name属性值会拼接为 `prefix[rnum].name`，rnum为行号，name为对应的列的name

事件
- `trAdded($tr)` $tr为新添加行

## 部门树形选择
引入 `department`

使用方式
```js
import Department from 'department'
new Department(options) 
或
$(ele).department(options)
```

`options`
  - `$ele` 文本框，使用jquery插件形式可省略
  - `$hidden` 隐藏域
  - `url` 数据获取地址
  - `canSelectDir` 是否可以选择非叶子节点

> 点击叶子节点，自动将文本设置为对应name，隐藏域设置为对应id

## 联系单位选择/合同选择/项目选择控件/材料合同选择
引入 `choice`

使用方式
```js
var c = new Choice(options)
c.show();
```

`options`
  - `type:enum` 有以下值
    - `Choice.COMPANY` 联系单位选择
    - `Choice.AGREEMENT` 合同选择
    - `Choice.PURCHASE` 项目选择
    - `Choice.MATERIAL` 材料合同选择
  - `url` 数据获取地址
  - `tplUrl` 模板地址
  - `onSelected(datas:Array)` 点击确定后
  - `onInited($form:jQuery)` 对话框初始化后

## 地区选择
引入 areaList
```js
import AreaList from 'areaList';
new AreaList(options);
或
$(ele).areaList(options)
```
- `options` 选项
  + `$ele` 文本框
  + `url` 数据获取地址
  + `id` 若需要初始化第一个下拉框，指明id，若无参数，传true即可
  + `initData:Array` 初始化数据，编辑时候用

方法
- `show` 显示

## 全选和取消 
使用方式
```css
import 'moreSelected'
```
label 父级 div设置class="more-selected"
全选checkbox class="Review_Status_all"
其他选项checkbox class="regul" 

## 富文本编辑器的使用
> 文档见 <http://kindeditor.net/doc.php>