import React from "react";
import { TaskModel } from "../../api-hooks/task/task.model";
import { useDeleteTask } from "../../api-hooks/task/task.mutation";
import WarningDialog, {
  WarningDialogRef,
} from "../../components/warning-dialog";
import { ActionIcon, Card, Flex, Text } from "@mantine/core";
import { Check, Pen, Trash, X } from "@phosphor-icons/react";
import { formatDateString } from "../../utils/date";
import { notifications } from "@mantine/notifications";
import queryClient from "../../utils/client/query-client";
import { TaskModalRef } from "./modal";

interface TaskItemProps {
  task: TaskModel;
  taskModalRef: React.RefObject<TaskModalRef>;
}

export default function TaskItem(props: TaskItemProps) {
  const { task, taskModalRef } = props;
  const deleteTaskMutate = useDeleteTask();
  const warningDialogRef = React.useRef<WarningDialogRef>(null);
  const onDelete = async (id: number) => {
    try {
      await deleteTaskMutate.mutateAsync(id);
      notifications.show({
        title: "Task Deleted",
        message: "Task has been deleted",
        color: "green",
      });
      queryClient.invalidateQueries();
    } catch (e: any) {
      console.error(e);
      notifications.show({
        title: "Task Deletion Failed",
        message: e.message,
      });
    }
  };
  return (
    <Card withBorder shadow="xs" pos="relative">
      <Text fw={600}>{task.name}</Text>
      <Text lineClamp={3}>{task.description}</Text>
      {task.is_complete && (
        <Flex direction="row" align="center" gap={8}>
          <Check color="green" />
          <Text color="green">Completed</Text>
        </Flex>
      )}
      {!task.is_complete && (
        <Flex direction="row" align="center" gap={8}>
          <X color="red" />
          <Text color="red">Incomplete</Text>
        </Flex>
      )}
      <Text fz={11} fw={300} pos="absolute" top={8} right={8}>
        {formatDateString(task.created_at)}
      </Text>
      <Flex
        direction="row"
        gap={16}
        align="center"
        pos="absolute"
        right={8}
        bottom={8}
      >
        <ActionIcon
          variant="subtle"
          onClick={() => {
            taskModalRef.current?.setTask(task);
            taskModalRef.current?.setIsOpen(true);
          }}
        >
          <Pen />
        </ActionIcon>
        <ActionIcon
          color="red"
          loading={deleteTaskMutate.isPending}
          onClick={() => {
            warningDialogRef.current?.setIsOpen(true);
          }}
        >
          <Trash />
        </ActionIcon>
      </Flex>
      <WarningDialog
        ref={warningDialogRef}
        title="Delete Task"
        message={`Are you sure for delete task \"${task.name}\" ?`}
        onConfirm={async () => {
          await onDelete(task.id);
          warningDialogRef.current?.setIsOpen(false);
        }}
        confirmText="Delete"
      />
    </Card>
  );
}
