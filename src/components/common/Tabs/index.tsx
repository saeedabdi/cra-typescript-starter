import cn from 'classnames';
import React, { Children, FC, ReactNode, useState } from 'react';

interface TabsProps {
    children?: ReactNode;
    tabsNames: string[];
    defaultIndex?: number;
    activeTabClassName?: string;
    tabClassName?: string;
    tabsClassName?: string;
    childrenParentClassName?: string;
}

const Tabs: FC<TabsProps> = ({
    children,
    tabsNames = [],
    activeTabClassName,
    defaultIndex = 0,
    tabClassName,
    tabsClassName,
    childrenParentClassName,
}) => {
    const [openTab, setOpenTab] = useState<number>(defaultIndex);
    return (
        <div className=" w-full">
            <div className={cn('flex', tabsClassName)}>
                {tabsNames.map((name, key) => {
                    return (
                        <div key={key} className={cn('flex ')}>
                            <div
                                key={key}
                                onClick={() => setOpenTab(key)}
                                className={cn(
                                    key === openTab ? activeTabClassName : tabClassName,
                                    'cursor-pointer ',
                                )}
                            >
                                {name}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={cn('w-full', childrenParentClassName)}>
                {Children.map(children, (Child, key) => {
                    if (openTab === key) return <>{Child}</>;
                })}
            </div>
        </div>
    );
};
export default Tabs;
