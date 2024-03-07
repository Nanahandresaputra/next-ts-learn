import { NotificationArgsProps, notification } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

export const openNotification = (errMsg: string, description: string, placement: NotificationPlacement) => {
  notification["error"]({
    message: errMsg,
    description,
    placement,
  });
};
