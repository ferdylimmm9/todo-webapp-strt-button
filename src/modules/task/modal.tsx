import React from "react";
import {
  useCreateTask,
  useUpdateTask,
} from "../../api-hooks/task/task.mutation";
import {
  TaskModel,
  CreateTaskRequest,
  UpdateTaskRequest,
} from "../../api-hooks/task/task.model";
import { notifications } from "@mantine/notifications";
import { Modal, Text } from "@mantine/core";
import TaskForm from "./form";
import queryClient from "../../utils/client/query-client";

export interface TaskModalRef {
  task: TaskModel | null;
  setTask: React.Dispatch<React.SetStateAction<TaskModel | null>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TaskModalProps {}

const TaskModal = React.forwardRef<TaskModalRef, TaskModalProps>(
  (_, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [task, setTask] = React.useState<TaskModel | null>(null);
    const id = task?.id as number;
    const createTaskMutate = useCreateTask();
    const updateTaskMutate = useUpdateTask(id);

    const onSubmit = async (values: CreateTaskRequest & UpdateTaskRequest) => {
      const isUpdate = !!task;
      try {
        isUpdate
          ? await updateTaskMutate.mutateAsync(values)
          : await createTaskMutate.mutateAsync(values);
        setIsOpen(false);
        notifications.show({
          title: isUpdate ? "Task Updated" : "Task Created",
          message: isUpdate ? "Task has been updated" : "Task has been created",
          color: "green",
        });
        queryClient.invalidateQueries();
      } catch (e: any) {
        console.error(e);
        notifications.show({
          title: isUpdate ? "Task Update Failed" : "Task Creation Failed",
          message: e.message,
        });
      }
    };

    React.useImperativeHandle(ref, () => {
      return {
        task,
        setTask,
        isOpen,
        setIsOpen,
      };
    });

    return (
      <Modal
        centered
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          <Text fz={16} fw={600}>
            {task ? "Update Task" : "Create Task"}
          </Text>
        }
        closeOnClickOutside={false}
      >
        {task ? (
          <TaskForm
            task={task}
            type="update"
            onSubmit={onSubmit}
            isLoading={updateTaskMutate.isPending}
          />
        ) : (
          <TaskForm
            type="create"
            onSubmit={onSubmit}
            isLoading={createTaskMutate.isPending}
          />
        )}
      </Modal>
    );
  },
);

export default TaskModal;
