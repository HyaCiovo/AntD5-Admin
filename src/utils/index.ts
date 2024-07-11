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

/**
 * 根据对象属性值查找对应的属性键。
 * 
 * 该函数遍历给定对象的属性，寻找第一个其指定属性值与给定值相等的属性键。
 * 如果找到匹配的属性键，函数返回该键；如果没有找到匹配项，函数返回空字符串。
 * 
 * @param object 一个键值对对象，其中值可以是任何类型。
 * @param propertyKey 要检查的属性名。
 * @param propertyValue 要匹配的属性值。
 * @returns 返回找到的属性键，如果没有找到则返回空字符串。
 */
export const findMapKeyByPropertyValue = (object: Record<string, any>, propertyKey: string, propertyValue: any): string => {
  // 遍历对象的每个属性
  for (const [key, value] of Object.entries(object)) {
    // 检查当前属性值的指定属性是否与给定值相等
    if (value[`${propertyKey}`] === propertyValue) {
      // 如果相等，返回当前属性键
      return key;
    }
  }
  // 如果遍历完所有属性都没有找到匹配项，返回空字符串
  return "";
};