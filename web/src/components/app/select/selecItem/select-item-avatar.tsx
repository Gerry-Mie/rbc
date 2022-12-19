import { ComponentPropsWithoutRef, forwardRef } from 'react';
import {Avatar, Group, Text} from '@mantine/core';

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
}

const SelectItemAvatar = forwardRef<HTMLDivElement, ItemProps>(
    ({image, label, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar radius='xl' src={image}/>
                <Text size="sm">{label}</Text>
            </Group>
        </div>
    )
);

export default SelectItemAvatar;
