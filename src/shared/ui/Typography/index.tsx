'use client';

import React from 'react';
import { Typography } from 'antd';
import type { TextProps } from 'antd/es/typography/Text';
import type { LinkProps } from 'antd/es/typography/Link';
import type { TitleProps } from 'antd/es/typography/Title';

const {
    Text: DefaultText,
    Link: DefaultLink,
    Title: DefaultTitle,
} = Typography;

export const Text = ({ children, ...restProps }: TextProps) => (
    <DefaultText {...restProps}>{children}</DefaultText>
);

export const Link = ({ children, ...restProps }: LinkProps) => (
    <DefaultLink {...restProps}>{children}</DefaultLink>
);

export const Title = ({ children, ...restProps }: TitleProps) => (
    <DefaultTitle {...restProps}>{children}</DefaultTitle>
);
