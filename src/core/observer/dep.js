/* @flow */

import type Watcher from "./watcher";
import { remove } from "../util/index";
import config from "../config";

let uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  //静态属性：watcher对象
  static target: ?Watcher;
  //dep实例ID
  id: number;
  //dep实例对应的watcher 对象/订阅者数组
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  //添加新的订阅者watcher对象
  addSub(sub: Watcher) {
    this.subs.push(sub);
  }
  //移除订阅者
  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }
  //将观察者对象和watcher建立依赖
  depend() {
    if (Dep.target) {
      //如果target存在，把dep对象添加到watcher的依赖中
      Dep.target.addDep(this);
    }
  }
  //发布通知
  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    if (process.env.NODE_ENV !== "production" && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      //根据subs的id属性，对subs进行从小到大的排序
      subs.sort((a, b) => a.id - b.id);
    }
    //调用每个订阅者的update方法实现更新
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// dep.target用来存储目前正在使用的watcher
Dep.target = null;
const targetStack = [];
// 入栈并将当前watcher赋值给dep.target
export function pushTarget(target: ?Watcher) {
  targetStack.push(target);
  Dep.target = target;
}

// 出栈操作
export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
