import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Drawer } from 'antd';
import type { DrawerProps } from 'antd/lib/drawer';

import DrawerWrapContext from './DrawerWrapContext';
import Footer from './Footer';
import type { FooterProps } from './Footer';

interface ActionsDrawerProps extends Omit<DrawerProps, 'visible' | 'onClose'> {
  content?: ReactNode | null;
  children?: ReactNode;
  clearBtn?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onFooterClear?: FooterProps['onClear'];
  onFooterFinish?: FooterProps['onFinish'];
}

const DrawerWrap: React.FC<ActionsDrawerProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const {
    children,
    content,
    width = 500,
    clearBtn,
    footer,
    onOpen,
    onClose,
    onFooterClear,
    onFooterFinish,
    ...resDrawerProps
  } = props;

  useEffect(() => {
    if (visible === true && onOpen) {
      onOpen();
    }
  }, [visible]);

  const getContext = () => {
    return {
      setVisible,
    };
  };

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }
    setVisible(false);
  };

  const footerRender = () => {
    if (footer === undefined) {
      return (
        <Footer
          onClose={handleOnClose}
          onFinish={onFooterFinish}
          onClear={onFooterClear}
          clearBtn={clearBtn}
        />
      );
    }
    return footer;
  };

  return (
    <DrawerWrapContext.Provider value={getContext()}>
      <>
        <section
          onClick={() => {
            setVisible(true);
          }}
        >
          {children}
        </section>
        <Drawer
          {...resDrawerProps}
          width={width}
          onClose={handleOnClose}
          visible={visible}
          footer={footerRender()}
        >
          {visible && content}
        </Drawer>
      </>
    </DrawerWrapContext.Provider>
  );
};

export default DrawerWrap;
