import { parse } from 'querystring';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// For the official demo site, it is used to turn off features that are not needed in the real development environment
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// 判断对象值是否为空
export const hasEmptyValue = (objCopy: any): boolean => {
  if (!objCopy || typeof objCopy !== 'object') {
    return true;
  }
  return Object.keys(objCopy).some((v) => {
    if (v === 'robotAccount' && objCopy.taskType === 1) {
      return false;
    }
    return (
      objCopy[v] === '' ||
      objCopy[v] === null ||
      objCopy[v] === undefined ||
      objCopy[v].length === 0
    );
  });
};
