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
  `data-modal-load` 地址
  `data-modal-title` 标题
  `data-modal-stxt` 确认按钮文本，默认为保存
  `data-modal-ctxt` 取消按钮文本，默认为取消
  `data-modal-bind` 默认为true，在内容加载完之后，若有表单，自动绑定表单校验，并在数据发送到后台成功后，关闭对话框
  `data-nocache` 是否要缓存页面，默认为缓存，需要禁用，改为true即可
- 事件
  `loaded.modalremote` 内容加载完后
  `ok.modalremote` 点击确定按钮后


## 表单校验与提交
表单校验一般把校验规则写在html标签属性中，如
`<input required="true" data-msg-required="字段非空">`

校验规则
+ required 非空，且不能全为空格
+ email 邮箱
+ number 整数小数
+ digits 纯数字
+ equalTo 与某个表单控件的值相等
+ any 指定名字的表单控件至少有一个有值
+ mobile 手机
+ tel 电话
+ remote 远程校验
+ url
+ date
+ dateISO
+ minlength
+ maxlength
+ rangelength
+ min
+ max
+ range
+ step

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
  + `dataFormat(form)` 默认使用`form2json`格式化表单数据，可通过此方法重写
  + `onSubmitSuccess(data)` 后台返回成功的处理
  + `onSubmiteError(error)` 后台返回失败的处理


## 数据渲染
使用mustache模板标签进行渲染

> 文档见 <https://github.com/hoisie/mustache>

`render(data)` 在页面只有一个标签时候，可使用这个方法进行渲染

`render(ele, data)` 使用指定元素标签进行渲染

- `ele`
  + `:number` 指定第几个
  + `:string` 指定选择器
  + `:Element` 指定dom元素
  + `:jQuery` 指定jQuery对象
- `data` 渲染的数据

## 左右选来选去的插件
```js
var om = new OptionManager(options)
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
引入 `webUploader`

使用方式
```js
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