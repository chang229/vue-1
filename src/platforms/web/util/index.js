/* @flow */

import { warn } from "core/util/index";

export * from "./attrs";
export * from "./class";
export * from "./element";

/**
 * Query an element selector if it's not an element already.
 */
export function query(el: string | Element): Element {
  //判断传入的el是不是字符串
  if (typeof el === "string") {
    // 获取el元素
    const selected = document.querySelector(el);
    if (!selected) {
      // 页面上没有el元素，开发环境下报错
      process.env.NODE_ENV !== "production" &&
        warn("Cannot find element: " + el);
      // 生产环境下创建一个div元素并返回
      return document.createElement("div");
    }
    // 页面上有el元素直接返回
    return selected;
  } else {
    // el不是字符串直接返回
    return el;
  }
}
