import React from 'react';
import { Button, Space } from 'antd';
import DrawerWrapContext from './DrawerWrapContext';
import type { DrawerWrapContextProps } from './DrawerWrapContext';

export interface FooterProps {
  clearBtn?: boolean;
  onClose?: (context: DrawerWrapContextProps) => void;
  onClear?: (context: DrawerWrapContextProps) => void;
  onFinish?: (context: DrawerWrapContextProps) => void;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { clearBtn = true, onClear, onClose, onFinish } = props;

  const handleClear = (context: DrawerWrapContextProps) => {
    if (onClear) {
      onClear(context);
    }
  };
  const hanleClose = (context: DrawerWrapContextProps) => {
    if (onClose) {
      onClose(context);
    } else {
      context.setVisible!(false);
    }
  };
  const handleFinish = (context: DrawerWrapContextProps) => {
    if (onFinish) {
      onFinish(context);
    } else {
      context.setVisible!(false);
    }
  };

  return (
    <DrawerWrapContext.Consumer>
      {(context) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            {clearBtn && (
              <span onClick={() => handleClear(context)} style={{ cursor: 'pointer' }}>
                清空筛选
              </span>
            )}
          </div>
          <Space>
            <Button onClick={() => hanleClose(context)}>取消</Button>
            <Button type="primary" onClick={() => handleFinish(context)}>
              {clearBtn ? '确定' : '保存'}
            </Button>
          </Space>
        </div>
      )}
    </DrawerWrapContext.Consumer>
  );
};

export default Footer;
