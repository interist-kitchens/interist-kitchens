import { atom } from '@/shared/factory/atom';
import {createEffect, createEvent, sample} from 'effector';
import { message } from 'antd';
import { type ArgsProps} from "antd/es/message/interface";

export const messageModel = atom(() => {
    const open = createEvent<ArgsProps>()

    const openMessageFx = createEffect<ArgsProps, void>(async (args) => {
        await message.open(args)
    })

    sample({
        clock: open,
        filter: Boolean,
        target: openMessageFx
    })

    return { open };
});
