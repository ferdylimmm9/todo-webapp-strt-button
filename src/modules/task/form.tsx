import { Button, Checkbox, Flex, Textarea, TextInput } from "@mantine/core";
import {
  CreateTaskRequest,
  TaskModel,
  UpdateTaskRequest,
} from "../../api-hooks/task/task.model";
import React from "react";
import { FloppyDisk, Pen, X } from "@phosphor-icons/react";

interface TaskFormProps {
  type: "create" | "update";
  isLoading?: boolean;
  onSubmit: (values: UpdateTaskRequest & CreateTaskRequest) => Promise<void>;
}

interface CreateTaskFormProps extends TaskFormProps {
  type: "create";
}

interface UpdateTaskFormProps extends TaskFormProps {
  type: "update";
  task: TaskModel;
}

export default function TaskForm(
  props: CreateTaskFormProps | UpdateTaskFormProps,
) {
  const firstTime = React.useRef(false);
  const isCreate = props.type === "create";
  const [request, setRequest] = React.useState({
    name: "",
    description: "",
    is_complete: false,
  });
  const label = isCreate ? "Create Task" : "Update Task";
  const [formStateDisabled, setFormStateDisabled] = React.useState(
    props.type === "update",
  );

  const reset = React.useCallback(() => {
    if (props.type === "update") {
      setRequest({
        name: props.task.name,
        description: props.task.description,
        is_complete: props.task.is_complete,
      });
    } else {
      setRequest({
        name: "",
        description: "",
        is_complete: false,
      });
    }
  }, [props]);

  React.useEffect(() => {
    if (props.type === "create") return;
    if (firstTime.current) return;
    reset();
    firstTime.current = true;
  }, [reset]);

  return (
    <>
      <Flex direction="column" gap={16}>
        <TextInput
          label="Name"
          placeholder="Name"
          value={request.name}
          onChange={(e) => {
            setRequest({ ...request, name: e.target.value });
          }}
          required
          disabled={formStateDisabled}
        />
        <Textarea
          label="Description"
          placeholder="Description"
          value={request.description}
          onChange={(e) => {
            setRequest({ ...request, description: e.target.value });
          }}
          required
          disabled={formStateDisabled}
        />
        {!isCreate && (
          <Checkbox
            label="Completed"
            checked={(request as UpdateTaskRequest).is_complete}
            onChange={(e) => {
              const checked = e.currentTarget.checked;
              setRequest({
                ...request,
                is_complete: checked,
              } as UpdateTaskRequest);
            }}
            disabled={formStateDisabled}
          />
        )}

        {formStateDisabled ? (
          <Button
            fullWidth
            leftSection={<Pen />}
            onClick={() => {
              setFormStateDisabled(false);
            }}
            variant="secondary"
          >
            Edit
          </Button>
        ) : (
          <Flex direction="row" gap={16}>
            {props.type === "update" && (
              <Button
                fullWidth
                leftSection={<X />}
                color="red"
                onClick={() => {
                  setFormStateDisabled(true);
                  reset();
                }}
                flex={1}
              >
                Cancel
              </Button>
            )}
            <Button
              fullWidth
              leftSection={<FloppyDisk />}
              loading={props.isLoading}
              onClick={() => {
                props.onSubmit(request);
              }}
              flex={1}
            >
              {label}
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
}
