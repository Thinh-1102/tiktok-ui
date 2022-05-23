import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import styles from './Menu.module.scss';
import Header from './Header';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

const defaultFc = () => {};

function Menu({ children, items = [], onChange = defaultFc }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 1000]}
            render={(attrs, content) => (
                <div className={cx('menuItems')} tabIndex="-1" {...attrs}>
                    <WrapperPopper className={cx('menu-popper')}>
                        {history.length >= 2 && (
                            <Header
                                title="Ngôn ngữ"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </WrapperPopper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
