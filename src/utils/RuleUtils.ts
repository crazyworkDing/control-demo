/**
 * 根据每行最大字节数切分字符串
 * @param text
 * @param maxBytePreRow
 */
function splitByMaxBytePreRow(text: string, maxBytePreRow: number): string[] {
  let rt = [];
  let countPerCount = 0;
  let strPreRow = "";
  for (let i=0; i<text.length; i++) {
    let len = (text.charCodeAt(i) > 127 || text.charCodeAt(i)===94) ? 2 : 1;
    if(countPerCount + len > maxBytePreRow) {
      rt.push(strPreRow);
      strPreRow = "";
      countPerCount = 0;
    }
    strPreRow += text[i];
    countPerCount += len;
  }
  if(strPreRow) {
    rt.push(strPreRow);
  }
  return rt;
}

/**
 * 创建规则编辑器节点使用的label内容，标题固定占2行，操作符1行，值和单位1行
 * @param title
 * @param operation
 * @param value
 * @param unit
 */
export function getLabelTextForNode(title: string, operation?: string, value?: any, unit?: string) {
  let titleWithRow = splitByMaxBytePreRow(title, 22);
  // 指标标题占2行
  let rt = [];
  if(titleWithRow.length >= 2) {
    rt = titleWithRow.slice(0, 2);
  } else {
    rt = [titleWithRow[0], ''];
  }
  return rt.concat([operation || "运算符", value === undefined || value === null ? "值" : value + (unit || '')]);
}

/**
 * 填充一个对象，保持对象本身的引用
 * @param fillObj
 * @param data
 */
export function fillObject(fillObj: any, data: any) {
  for(let key in data) {
    fillObj[key] = data[key];
  }
}
type QuotaFilterStruct = {
  objectId?: string,
  valueType?: string,
  operation?: string,
  value?: string|number,
  unit?: string,
  connector: boolean,   // true: and false: or
}
type QuotaVariableStruct = {
  subjectIds: string[],
  windowWidth?: number,
  windowWidthUnit?: string,
  objectId?: string,
  funcName?: string,
  funcParam?: string,
  operator?: string,        // 名单专用
  value?: any,
  filters?: {
    desc: string,
    exp: string,
    list: QuotaFilterStruct[]
  },
  connector?: string,
}
export function quotaCheck(variables: QuotaVariableStruct[], templateCode: number) {
  // 自定义函数模板，直接忽略
  if(templateCode === 13) {return true}
  // 名单模板，特殊处理
  if(templateCode === 7) {
    if(variables.length !== 1) {
      return "名单模板变量数量错误";
    }
    let variable = variables[0];
    if(!variable.objectId) {
      return "变量1中的对象不可为空";
    }
    if(variable.funcName !== "current") {
      return "变量1中的函数必须为【当前】";
    }
    if(!variable.operator) {
      return "变量1中的操作符不可为空";
    }
    if(!variable.value) {
      return "变量1中的名单不可为空";
    }
    return true
  }
  // 其他模板校验
  for(let index = 0; index < variables.length; index++) {
    let variable = variables[index];
    let varName = `变量${index + 1}`;
    if(!variable.objectId) {
      return `${varName}中的对象不可为空`;
    }
    if(!variable.funcName) {
      return `${varName}中的函数不可为空`;
    }
    // 校验第二个变量必须有连接运算符
    if(index > 0 && !variable.connector) {
      return `${varName}前的操作符不可为空`;
    }
    // 窗口函数不是current或history时，要求必须填写窗口宽度和单位
    if(!(variable.funcName === "current" || variable.funcName === "history")) {
      if(!variable.windowWidth || variable.windowWidth < 0) {
        return `${varName}必须填写时间，并且时间大于0`;
      }
      if(!variable.windowWidthUnit) {
        return `${varName}必须选择一个时间单位`;
      }
    }
    if(variable.filters && variable.filters.list.length) {
      for(let j = 0; j < variable.filters.list.length; j++) {
        let filter = variable.filters.list[j];
        let index = j + 1;
        // 全空通过
        if(!filter.objectId && !filter.operation && !filter.value) {
          continue;
        }
        if(!filter.objectId) {
          return `${varName}中第${index}个过滤条件必须选择一个对象`;
        }
        if(!filter.operation) {
          return `${varName}中第${index}个过滤条件必须选择一个运算符`;
        }
        if(!filter.value && (filter.value !== 0)) {
          return `${varName}中第${index}个过滤条件必须填写值`;
        }
      }
    }
  }
  return true;
}