// src/directives/scale.ts
interface ScaleDirectiveElement extends HTMLElement {
  _cleanScale?: () => void;
}

export const scaleDirective = {
  mounted(el: ScaleDirectiveElement) {
    const designWidth = 1440;
    const designHeight = 900;

    // 初始化样式
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.overflow = "hidden";
    el.style.transformOrigin = "top left";

    // 防抖函数
    const debounce = (fn: any, delay: number) => {
      let timerId: number;
      return (...args: any[]) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
      };
    };

    // 更新缩放比例
    const updateScale = () => {
      const windowRatio = window.innerWidth / window.innerHeight;
      const designRatio = designWidth / designHeight;

      const scale =
        windowRatio > designRatio
          ? window.innerHeight / designHeight
          : window.innerWidth / designWidth;

      el.style.transform = `scale(${scale})`;
      el.style.width = `${designWidth}px`;
      el.style.height = `${designHeight}px`;

      // 确保全局无滚动
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    // 创建防抖版本 (300ms延迟)
    const debouncedUpdate = debounce(updateScale, 300);

    // 初始执行
    updateScale();

    // 添加事件监听
    window.addEventListener("resize", debouncedUpdate);

    // 保存清理函数
    el._cleanScale = () => {
      window.removeEventListener("resize", debouncedUpdate);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  },

  unmounted(el: ScaleDirectiveElement) {
    el._cleanScale?.();
  },
};
