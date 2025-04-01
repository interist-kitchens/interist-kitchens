'use client';

import React from 'react';
import { Typography } from 'antd';
import type { TextProps } from 'antd/es/typography/Text';
import type { LinkProps } from 'antd/es/typography/Link';

const { Text: DefaultText, Link: DefaultLink } = Typography;

export const Text = ({ children, ...restProps }: TextProps) => (
    <DefaultText {...restProps}>{children}</DefaultText>
);

export const Link = ({ children, ...restProps }: LinkProps) => (
    <DefaultLink {...restProps}>{children}</DefaultLink>
);
