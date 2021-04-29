import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";
// 定义了Vue的构造函数
function Vue(options) {
  // 设置警告Vue函数必须使用new关键字跳跃
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  // 调用_init方法
  this._init(options);
}
// 注册Vue的init方法，初始化vm
initMixin(Vue);
// 注册vm的$data/$props/$delete/$watch
stateMixin(Vue);
// 初始化事件相关的方法$on/$once/$off/$emit
eventsMixin(Vue);
// 初始化生命周期相关的混入方法：$_update/$forceUpdate/$destroy
lifecycleMixin(Vue);
// 混入render: $nextTick _render
renderMixin(Vue);

export default Vue;
