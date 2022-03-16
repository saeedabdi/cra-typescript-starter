import cn from 'classnames';
import React, { Children, FunctionComponent, ReactNode, useState } from 'react';

interface TabsProps {
    children?: ReactNode;
    tabNames: string[];
    defaultIndex?: number;
    onChange?: (activeIndex: number) => void;
    activeTabClassName?: string;

    tabClassName?: string;
    tabsClassName?: string;
    childrenWrpClassName?: string;
}

const Tabs: FunctionComponent<TabsProps> = ({
    children,
    tabNames = [],
    activeTabClassName,
    defaultIndex = 0,
    tabClassName,
    onChange,
    tabsClassName,
    childrenWrpClassName,
}) => {
    const [openTab, setOpenTab] = useState<number>(defaultIndex);
    return (
        <div>
            <div className={cn(tabsClassName)}>
                {tabNames.map((name, key) => {
                    return (
                        <div
                            key={name}
                            onClick={() => {
                                setOpenTab(key);
                                onChange?.(key);
                            }}
                            className={cn(key === openTab ? activeTabClassName : tabClassName)}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>

            <div className={cn(childrenWrpClassName)}>
                {Children.map(children, (Child, key) => {
                    if (openTab === key) return <>{Child}</>;
                })}
            </div>
        </div>
    );
};
export default Tabs;
