/**
 * 过滤掉对象中值为undefined或null的属性。
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
