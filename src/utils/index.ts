/**
 * 过滤掉对象中值为undefined或null的属性。
 * 
 * 该函数接收一个对象作为参数，返回一个新的对象，新对象中不包含原对象中值为undefined或null的属性。
 * 这对于清理数据或在进一步处理前排除不必要的属性非常有用。
 * 
 * @param obj 要过滤的对象。可以是任何对象，但其属性值不能为undefined或null。
 * @returns 返回一个新的对象，该对象只包含原对象中值不为undefined且不为null的属性。
 */
export const filterObjects = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null
    )
  );
};
